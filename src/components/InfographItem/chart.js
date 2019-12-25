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

ReactFc.fcRoot(FusionCharts, Charts, FusionTheme);
FusionCharts.options.creditLabel = 0;

const dataSource = {
  chart: {
    caption: 'Countries With Most Oil Reserves [2017-18]',
    subCaption: 'In MMbbl = One Million barrels',
    xAxisName: 'Country',
    bgColor: 'ebeff2',
    canvasbgcolor: '#ffffff',
    yAxisName: 'Reserves (MMbbl)',
    numberSuffix: 'K',
    theme: 'fusion'
  },
  data: [
    { label: 'Venezuela', value: '290' },
    { label: 'Saudi', value: '260' },
    { label: 'Canada', value: '180' },
    { label: 'Iran', value: '140' },
    { label: 'Russia', value: '115' },
    { label: 'UAE', value: '100' },
    { label: 'US', value: '30' },
    { label: 'China', value: '30' }
  ]
};
class ChartItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      chartConfig: {
        type: props.type || 'line',
        width: '100%',
        height: 400,
        dataFormat: 'json',
        dataSource: dataSource
      }
    }
  }
  render () {
    let { chartConfig } = this.state;
    return (
      <>
        <Item.Infograph>
          <div className='mx-1'>
            <ReactFc {...chartConfig} />
          </div>
        </Item.Infograph>
        <Item.Editor>
          <div></div>
        </Item.Editor>
      </>
    );
  }
}

ChartItem.defaultProps = {
  type: 'line'
}


class ChartIcon extends Component {
  render () {
    let { type, content, onClickFn, count } = this.props,
      retContent;

    retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <ChartItem type={type} content={content} />
      }
    }

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
}

export {
  ChartIcon,
  ChartItem
}