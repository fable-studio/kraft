import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFc from 'react-fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';
import WorldWithCountries from 'fusionmaps/maps/fusioncharts.worldwithcountries';
import Africa from 'fusionmaps/maps/fusioncharts.africa';
import NorthAmerica from 'fusionmaps/maps/fusioncharts.northamerica';
import Asia from 'fusionmaps/maps/fusioncharts.asia';
import Europe from 'fusionmaps/maps/fusioncharts.europe';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMap, faGlobe, faGlobeAfrica, faGlobeAmericas, faGlobeAsia, faGlobeEurope, faFlag
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';
import SpreadSheet from '../SpreadSheet';
import { Button, Input } from 'reactstrap';

import './maps.scss';
import defaultCSVdata, { formatCSV } from './maps-data';

ReactFc.fcRoot(FusionCharts, Maps, World, WorldWithCountries, Africa, NorthAmerica, Asia, Europe, FusionTheme);
FusionCharts.options.creditLabel = 0;

const parseCSVToData = csv => {
  if (!csv) return [];

  let cols = csv[0] || [],
    parsedDataAr = [],
    idIndex,
    i,
    valueIndex;

  for (i = 0; i < cols.length; i++) {
    if (cols[i] && (cols[i].toLowerCase() === 'id')) {
      idIndex = i;
    } else if (cols[i] && (cols[i].toLowerCase() === 'value')) {
      valueIndex = i;
    }
  }
  for (i = 1; i < csv.length; i++) {
    parsedDataAr.push({
      id: csv[i][idIndex],
      value: csv[i][valueIndex]
    });
  }

  return parsedDataAr;
};

class MapItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      height: props.height,
      type: props.type,
      caption: '',
      subCaption: '',
      chartAttr: {
        showLegend: 0,
        baseFont: 'Oswald',
        numbersuffix: '%',
        includevalueinlabels: '1',
        labelsepchar: ': ',
        bgcolor: 'ebeff2',
        entityFillHoverColor: '#FFF9C4',
        theme: 'fusion'
      },
      colorRange: {
        minvalue: '0',
        code: '#FFE0B2',
        gradient: '0',
        color: [
          { minvalue: '0.5', maxvalue: '1.0', color: '#FFD74D' },
          { minvalue: '1.0', maxvalue: '2.0', color: '#FB8C00' },
          { minvalue: '2.0', maxvalue: '3.0', color: '#E65100' }
        ]
      },
      csv: defaultCSVdata[props.type]
    };
  }

  dataUpdated = (data) => {
    if (!data) return;
    this.setState(prevState => {
      const { csv } = prevState;

      data.forEach(datum => {
        csv[datum[0]][datum[1]] = datum[3];
      });
      return {
        csv
      };
    });
  }

  fileUpdated = data => {
    this.setState({
      csv: formatCSV[data]
    });
  }

  changeMapType = type => {
    return () => {
      this.setState({
        type,
        csv: defaultCSVdata[type]
      });
    };
  }

  changeMapHeight = e => {
    this.setState({
      height: e.target.value
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

  render () {
    const { chartAttr, type, colorRange, height, csv, caption, subCaption } = this.state;

    const chartConfig = {
      type: type,
      width: '100%',
      height: height,
      dataFormat: 'json',
      dataSource: {
        chart: {
          ...chartAttr,
          caption,
          subCaption
        },
        colorRange: { ...colorRange },
        data: parseCSVToData(csv)
      }
    };

    return (
      <>
        <Item.Infograph>
          <div className=''>
            <ReactFc {...chartConfig} />
          </div>
        </Item.Infograph>
        <Item.Editor>
          <div className='mx-3 my-3'>
            <div className=''>
              <Button className='map-item-icon mr-1' onClick={this.changeMapType('world')}><FontAwesomeIcon icon={faGlobe} /></Button>
              <Button className='map-item-icon mr-1' onClick={this.changeMapType('worldwithcountries')}><FontAwesomeIcon icon={faFlag} /></Button>
              <Button className='map-item-icon mr-1' onClick={this.changeMapType('maps/africa')}><FontAwesomeIcon icon={faGlobeAfrica} /></Button>
              <Button className='map-item-icon mr-1' onClick={this.changeMapType('maps/northamerica')}><FontAwesomeIcon icon={faGlobeAmericas} /></Button>
              <Button className='map-item-icon mr-1' onClick={this.changeMapType('maps/asia')}><FontAwesomeIcon icon={faGlobeAsia} /></Button>
              <Button className='map-item-icon mr-1' onClick={this.changeMapType('maps/europe')}><FontAwesomeIcon icon={faGlobeEurope} /></Button>
            </div>
            <div className='mt-2'>
              <span>Title:</span>
              <Input className='d-inline-block' onChange={this.titleChangeHandler} value={caption} />
            </div>
            <div className='mt-2'>
              <span>Subtitle:</span>
              <Input className='d-inline-block' onChange={this.subtitleChangeHandler} value={subCaption} />
            </div>
            <div>
              <span>Chart Height</span>
              <input type='range' min={300} max={800} value={height} onChange={this.changeMapHeight} />
              <span>{height}PX</span>
            </div>
            <SpreadSheet data={csv} dataUpdated={this.dataUpdated} fileUpdated={this.fileUpdated} />
          </div>
        </Item.Editor>
      </>
    );
  }
}

MapItem.defaultProps = {
  type: 'world',
  height: 400
};

class MapIcon extends Component {
  render () {
    const { type, content, onClickFn, count } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <MapItem type={type} content={content} />
      }
    };

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
};

export {
  MapIcon,
  MapItem
};
