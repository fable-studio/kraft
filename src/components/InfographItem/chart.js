import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFc from 'react-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie, faChartArea, faBorderNone
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';
import SpreadSheet from '../SpreadSheet/index.js';
import PropTypes from 'prop-types';
import { Button, Input, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
ReactFc.fcRoot(FusionCharts, Charts, FusionTheme);
FusionCharts.options.creditLabel = 0;

const csv = [
  ['Country', 'Reserves (MMbbl)', '', ''],
  ['Venezuela', '290'],
  ['Saudi', '260'],
  ['Canada', '180'],
  ['Iran', '140'],
  ['Russia', '115'],
  ['UAE', '100'],
  ['US', '30'],
  ['China', '30']
];
const chartTypes = [
  'msbar2d',
  'mscolumn2d',
  'pie2d',
  'msarea',
  'msline',
  'stackedcolumn2d'
];
const isSingleSeriesType = str => !(str.startsWith('ms') || str.startsWith('stacked'));
const createJson = (csv, isSingleSeries, chartAttr) => {
  const json = {
    chart: chartAttr
  };
  if (isSingleSeries) {
    json.data = [];
  } else {
    json.categories = [{
      category: []
    }];
    json.dataset = [];
  }
  csv.forEach((arr, i) => {
    if (isSingleSeries) {
      if (i === 0) {
        json.chart.xAxisName = arr[0];
        json.chart.yAxisName = arr[1];
      } else {
        json.data.push({
          label: arr[0],
          value: arr[1]
        });
      }
    } else {
      if (i === 0) {
        json.chart.xAxisName = arr[0];
        arr.forEach((ele, j) => {
          if (j === 0 || !ele) return;
          json.dataset.push({
            seriesname: ele,
            data: []
          });
        });
      } else {
        json.categories[0].category.push({
          label: arr[0]
        });
        arr.forEach((ele, j) => {
          if (j === 0 || !ele) return;
          else if (!json.dataset[j - 1]) {
            json.dataset[j - 1] = {
              data: []
            };
          }
          json.dataset[j - 1].data.push({
            value: ele
          });
        });
      }
    }
  });
  return json;
};
class ChartItem extends Component {
  constructor (props) {
    super(props);
    const isSingleSeries = isSingleSeriesType(props.type);

    this._defaultCSV = [];
    for (let i = 0; i < csv.length; i++) {
      this._defaultCSV.push(csv[i].slice(0));
    }

    this.textCosmetics = props.themes.themeList[props.themes.curSelected].chart.text;
    this.chartAttr = {
      bgColor: 'ebeff2',
      canvasbgcolor: '#ffffff',
      basefont: 'Oswald',
      legenditemfont: 'Oswald',
      divlinealpha: 100,
      alignCaptionWithCanvas: 0,
      caption: '',
      subcaption: '',
      captionfontcolor: this.textCosmetics.title.color,
      subcaptionfontcolor: this.textCosmetics.subtitle.color,
      theme: 'fusion'
    };

    this.state = {
      chartAttr: this.chartAttr,
      chartConfig: {
        type: props.type,
        width: '100%',
        height: props.height,
        dataSource: createJson(this._defaultCSV, isSingleSeries, this.chartAttr)
      },
      csv: this._defaultCSV,
      isSingleSeries
    };
  }

  dataUpdated = (result) => {
    if (!result) return;
    const { chartConfig, isSingleSeries, chartAttr } = this.state;
    const csv = this.state.csv.slice();
    result.forEach(res => {
      const arr = csv[res[0]].slice();
      arr[res[1]] = res[3];
      csv[res[0]] = arr;
    });
    this.setState({
      chartConfig: {
        ...chartConfig,
        dataSource: createJson(csv, isSingleSeries, chartAttr)
      },
      csv
    });
  };

  fileUpdated = (data) => {
    const { chartConfig, isSingleSeries, chartAttr } = this.state;
    this.setState({
      chartConfig: {
        ...chartConfig,
        dataSource: createJson(data, isSingleSeries, chartAttr)
      },
      csv: data
    });
  }

  changeChart = () => {
    const { chartConfig, csv, chartAttr } = this.state;
    let { isSingleSeries } = this.state;
    let { type, dataSource } = chartConfig;
    type = chartTypes[(chartTypes.indexOf(type) + 1) % chartTypes.length];
    const isSeriesChanged = isSingleSeries !== isSingleSeriesType(type);
    if (isSeriesChanged) {
      isSingleSeries = !isSingleSeries;
      dataSource = createJson(csv, isSingleSeries, chartAttr);
    }
    this.setState(({ chartConfig }) => {
      return {
        chartConfig: {
          ...chartConfig,
          type,
          dataSource
        },
        isSingleSeries
      };
    });
  }

  changeChartHeight = e => {
    const value = e.target.value;

    this.setState(prevState => {
      return {
        chartConfig: {
          ...prevState.chartConfig,
          height: value
        }
      };
    });
  }

  titleChangeHandler = e => {
    const value = e.target.value;

    this.setState(prevState => {
      let chartAttr = prevState.chartConfig.dataSource.chart;

      return {
        chartConfig: {
          ...prevState.chartConfig,
          dataSource: {
            ...prevState.chartConfig.dataSource,
            chart: {
              ...chartAttr,
              caption: value
            }
          }
        }
      };
    });
  }

  subtitleChangeHandler = e => {
    const value = e.target.value;

    this.setState(prevState => {
      let chartAttr = prevState.chartConfig.dataSource.chart;

      return {
        chartConfig: {
          ...prevState.chartConfig,
          dataSource: {
            ...prevState.chartConfig.dataSource,
            chart: {
              ...chartAttr,
              subcaption: value
            }
          }
        }
      };
    });
  }

  changeDivLineAlpha = () => {
    this.setState(prevState => {
      let chartAttr = prevState.chartConfig.dataSource.chart;

      return {
        chartConfig: {
          ...prevState.chartConfig,
          dataSource: {
            ...prevState.chartConfig.dataSource,
            chart: {
              ...chartAttr,
              divlinealpha: (chartAttr.divlinealpha === 100) ? 0 : 100
            }
          }
        }
      };
    });
  }

  getColorBtnHandler = (attribute, index) => {
    const { themes } = this.props,
      { themeList, curSelected } = themes,
      curTheme = themeList[curSelected],
      { palette } = curTheme.chart.text.generic;

    return () => {
      this.setState(prevState => {
        let chartAttr = prevState.chartConfig.dataSource.chart;

        return {
          chartConfig: {
            ...prevState.chartConfig,
            dataSource: {
              ...prevState.chartConfig.dataSource,
              chart: {
                ...chartAttr,
                [attribute]: palette[index]
              }
            }
          }
        };
      });
    };
  }

  componentDidUpdate () {
    const { themes } = this.props,
      curTheme = themes.themeList[themes.curSelected];

    if (JSON.stringify(this.textCosmetics) !== JSON.stringify(curTheme.chart.text)) {
      this.setState(prevState => {
        let chartAttr = prevState.chartConfig.dataSource.chart;

        this.textCosmetics = curTheme.chart.text;
        return {
          chartConfig: {
            ...prevState.chartConfig,
            dataSource: {
              ...prevState.chartConfig.dataSource,
              chart: {
                ...chartAttr,
                captionfontcolor: this.textCosmetics.title.color,
                subcaptionfontcolor: this.textCosmetics.subtitle.color
              }
            }
          }
        };
      });
    }
  }

  render () {
    const { chartConfig } = this.state,
      { themes } = this.props,
      { themeList, curSelected } = themes,
      curTheme = themeList[curSelected],
      chartAttr = chartConfig.dataSource.chart,
      colorPalette = curTheme.chart.text.generic.palette;

    chartAttr.valuefontcolor = curTheme.text.header.color;
    chartAttr.bgColor = curTheme.infograph.background;
    chartAttr.paletteColors = curTheme.chart.generic.palette;

    return (
      <>
        <Item.Infograph>
          <div className='ml-1 mr-2 my-1'>
            <ReactFc {...chartConfig} />
          </div>
        </Item.Infograph>
        <Item.Editor>
          <div className='mx-3 my-3'>
            <div>
              <Button className='mr-1' onClick={this.changeChart}>
                <FontAwesomeIcon icon={faChartArea} />
              </Button>
              <Button className='mr-1' onClick={this.changeDivLineAlpha}>
                <FontAwesomeIcon icon={faBorderNone} />
              </Button>
              <div className='d-inline-block'>
                <div className='d-flex flex-row'>
                  <span className='ml-2 mr-1'>Chart Height</span>
                  <input
                    style={{
                      marginTop: 0
                    }}
                    type='range'
                    min={300}
                    max={800}
                    value={chartConfig.height}
                    onChange={this.changeChartHeight}
                  />
                  <span className='ml-2'>{chartConfig.height}px</span>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <span className='font-weight-bold'>Title:</span>
              <Input className='d-inline-block' onChange={this.titleChangeHandler} value={chartAttr.caption} />
            </div>
            {
              chartAttr.caption &&
                (<div className='mt-2'>
                  <span style={{ marginRight: 22 }}>Title color: </span>
                  <ButtonGroup className='px-1' size='sm'>
                    {colorPalette.map((color, index) => {
                      return (
                        <Button
                          key={index}
                          className='color-btn mr-1'
                          onClick={this.getColorBtnHandler('captionfontcolor', index)}
                          style={{ backgroundColor: color }}
                        ></Button>
                      );
                    })}
                  </ButtonGroup>
                </div>)
            }
            <div className='mt-2'>
              <span className='font-weight-bold'>Subtitle:</span>
              <Input className='d-inline-block' onChange={this.subtitleChangeHandler} value={chartAttr.subCaption} />
            </div>
            {
              chartAttr.subcaption &&
                (<div className='mt-2'>
                  <span>Subtitle color: </span>
                  <ButtonGroup className='px-1' size='sm'>
                    {colorPalette.map((color, index) => {
                      return (
                        <Button
                          key={index}
                          className='color-btn mr-1'
                          onClick={this.getColorBtnHandler('subcaptionfontcolor', index)}
                          style={{ backgroundColor: color }}
                        ></Button>
                      );
                    })}
                  </ButtonGroup>
                </div>)
            }
            <SpreadSheet data={this.state.csv} dataUpdated={this.dataUpdated} fileUpdated={this.fileUpdated} />
          </div>
        </Item.Editor>
      </>
    );
  }
}

ChartItem.defaultProps = {
  type: chartTypes[0],
  height: 400
};

const mapStateToPropsChartItem = state => {
  return {
    themes: state.themes
  };
};

const ChartItemHOC = connect(mapStateToPropsChartItem)(ChartItem);

class ChartIcon extends Component {
  render () {
    const { type, onClickFn, count } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <ChartItemHOC type={type} />
      }
    };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn} id='sidebar-chart-btn' tooltext='Add chart'>
        <FontAwesomeIcon icon={faChartPie} />
      </BaseItemIcon>
    );
  }
}

ChartIcon.defaultProps = {
  type: chartTypes[0],
  onClickFn: () => {}
};
ChartItem.propTypes = {
  type: PropTypes.string
};

ChartIcon.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string,
  onClickFn: PropTypes.func,
  count: PropTypes.number
};

export {
  ChartIcon,
  ChartItemHOC
};
