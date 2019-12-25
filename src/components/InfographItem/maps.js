import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFc from 'react-fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMap
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';

ReactFc.fcRoot(FusionCharts, Maps, World, FusionTheme);
FusionCharts.options.creditLabel = 0;

const dataSource = {
  chart: {
    caption: 'Average Annual Population Growth',
    subcaption: ' 1955-2015',
    numbersuffix: '%',
    includevalueinlabels: '1',
    labelsepchar: ': ',
    bgcolor: 'ebeff2',
    entityFillHoverColor: '#FFF9C4',
    theme: 'fusion'
  },
  colorrange: {
    minvalue: '0',
    code: '#FFE0B2',
    gradient: '1',
    color: [
      { minvalue: '0.5', maxvalue: '1.0', color: '#FFD74D' },
      { minvalue: '1.0', maxvalue: '2.0', color: '#FB8C00' },
      { minvalue: '2.0', maxvalue: '3.0', color: '#E65100' }
    ]
  },
  data: [
    { id: 'NA', value: '.82', showLabel: '1' },
    { id: 'SA', value: '2.04', showLabel: '1' },
    { id: 'AS', value: '1.78', showLabel: '1' },
    { id: 'EU', value: '.40', showLabel: '1' },
    { id: 'AF', value: '2.58', showLabel: '1' },
    { id: 'AU', value: '1.30', showLabel: '1' }
  ]
};
class MapItem extends Component {
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

MapItem.defaultProps = {
  type: 'world'
}


class MapIcon extends Component {
  render () {
    let { type, content, onClickFn, count } = this.props,
      retContent;

    retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <MapItem type={type} content={content} />
      }
    }

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faMap} />
      </BaseItemIcon>
    );
  }
}

MapIcon.defaultProps = {
  type: 'world',
  content: 'Inset chart here',
  onClickFn: () => {}
}

export {
  MapIcon,
  MapItem
}