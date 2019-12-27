import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFc from 'react-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';
import SpreadSheet from '../SpreadSheet/index.js';
import PropTypes from 'prop-types';
import changeIcon from '../../assets/images/change.png';
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
    this.state = {
      chartConfig: {
        type: props.type,
        width: '100%',
        height: 400,
        dataSource: createJson(csv, isSingleSeries)
      },
      csv,
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

  render () {
    const { chartConfig } = this.state;
    return (
      <>
        <Item.Infograph>
          <div className='mx-1'>
            <ReactFc {...chartConfig} />
          </div>
        </Item.Infograph>
        <Item.Editor>
          <div>
            <button type="button" onClick={this.changeChart}><img src={changeIcon}/></button>
          </div>
          <SpreadSheet data={this.state.csv} dataUpdated={this.dataUpdated} fileUpdated={this.fileUpdated} />
        </Item.Editor>
      </>
    );
  }
}

ChartItem.defaultProps = {
  type: chartTypes[0]
};

class ChartIcon extends Component {
  render () {
    const { type, onClickFn, count } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <ChartItem type={type} />
      }
    };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
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
  ChartItem
};
