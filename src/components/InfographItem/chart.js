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
ReactFc.fcRoot(FusionCharts, Charts, FusionTheme);
FusionCharts.options.creditLabel = 0;

const csv = [
  ['Country', 'Reserves (MMbbl)'],
  ['Venezuela', '290'],
  ['Saudi', '260'],
  ['Canada', '180'],
  ['Iran', '140'],
  ['Russia', '115'],
  ['UAE', '100'],
  ['US', '30'],
  ['China', '30']
];
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
          if (j === 0) return;
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
          if (j === 0) return;
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
    const isSingleSeries = !props.type.startsWith('ms');
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

          </div>
          <SpreadSheet data={this.state.csv} dataUpdated={this.dataUpdated} fileUpdated={this.fileUpdated} />
        </Item.Editor>
      </>
    );
  }
}

ChartItem.defaultProps = {
  type: 'bar2d'
};

class ChartIcon extends Component {
  render () {
    const { type, content, onClickFn, count } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <ChartItem type={type} content={content} />
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
  type: 'column2d',
  content: 'Inset chart here',
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
