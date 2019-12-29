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
import { Button, Input } from 'reactstrap';
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
  'msline'
];
const isSingleSeriesType = str => !str.startsWith('ms');
const createJson = (csv, isSingleSeries) => {
  const json = {
    chart: {
      bgColor: 'ebeff2',
      canvasbgcolor: '#ffffff',
      baseFont: 'Oswald',
      legenditemfont: 'Oswald',
      divLineAlpha: 100,
      alignCaptionWithCanvas: 0,
      caption: '',
      subcaption: '',
      theme: 'fusion'
    }
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

    this.state = {
      chartConfig: {
        type: props.type,
        width: '100%',
        height: props.height,
        dataSource: createJson(this._defaultCSV, isSingleSeries)
      },
      csv: this._defaultCSV,
      subCaption: '',
      caption: '',
      divLineAlpha: 100,
      isSingleSeries
    };
  }

  dataUpdated = (result) => {
    if (!result) return;
    const { chartConfig, isSingleSeries } = this.state;
    const csv = this.state.csv.slice();
    result.forEach(res => {
      const arr = csv[res[0]].slice();
      arr[res[1]] = res[3];
      csv[res[0]] = arr;
    });
    this.setState({
      chartConfig: {
        ...chartConfig,
        dataSource: createJson(csv, isSingleSeries)
      },
      csv
    });
  };

  fileUpdated = (data) => {
    const { chartConfig, isSingleSeries } = this.state;
    this.setState({
      chartConfig: {
        ...chartConfig,
        dataSource: createJson(data, isSingleSeries)
      },
      csv: data
    });
  }

  changeChart = () => {
    const { chartConfig, csv } = this.state;
    let { isSingleSeries } = this.state;
    let { type, dataSource } = chartConfig;
    type = chartTypes[(chartTypes.indexOf(type) + 1) % chartTypes.length];
    const isSeriesChanged = isSingleSeries !== isSingleSeriesType(type);
    if (isSeriesChanged) {
      isSingleSeries = !isSingleSeries;
      dataSource = createJson(csv, isSingleSeries);
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
    this.setState({
      caption: e.target.value
    });
  }

  subtitleChangeHandler = e => {
    this.setState({
      subCaption: e.target.value
    });
  }

  changeDivLineAlpha = () => {
    this.setState(prevState => {
      return {
        divLineAlpha: (!prevState.divLineAlpha) * 100
      };
    });
  }

  render () {
    const { chartConfig, caption, subCaption, divLineAlpha } = this.state,
      { themes } = this.props,
      { themeList, curSelected } = themes,
      curTheme = themeList[curSelected],
      chartAttr = chartConfig.dataSource.chart;

    chartAttr.caption = caption;
    chartAttr.subCaption = subCaption;
    chartAttr.divLineAlpha = divLineAlpha;
    chartAttr.bgColor = curTheme.infograph.background;
    chartAttr.paletteColors = curTheme.chart.generic.palette;
    chartAttr.captionFontColor = curTheme.chart.title.color;
    chartAttr.subcaptionFontColor = curTheme.chart.subtitle.color;

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
              <span>
                <span>Chart Height</span>
                <input type='range' min={300} max={800} value={chartConfig.height} onChange={this.changeChartHeight} />
                <span>{chartConfig.height}PX</span>
              </span>
            </div>
            <div className='mt-2'>
              <span>Title:</span>
              <Input className='d-inline-block' onChange={this.titleChangeHandler} value={caption} />
            </div>
            <div className='mt-2'>
              <span>Subtitle:</span>
              <Input className='d-inline-block' onChange={this.subtitleChangeHandler} value={subCaption} />
            </div>
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
