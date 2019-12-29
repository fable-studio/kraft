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
import { connect } from 'react-redux';
import ColorPicker from '../ColorPicker';

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

class ColorRange extends Component {
  constructor (props) {
    super(props);

    this.state = {
      range: props.range.map(range => { return { min: range.min, max: range.max }; })
    };
  }
  onColorChange = (index) => {
    return (color) => {
      this.props.updatePalette(color, index);
    };
  }

  onValueChange = (index, type) => {
    return e => {
      let range = this.props.range,
        newRange;

      // console.log(e.target.value);
      newRange = range.map((range, i) => {
        if (i === index) {
          return {
            ...range,
            [type]: e.target.value
          };
        }
        return {
          ...range
        };
      });
      // console.log(newRange);
      this.setState({
        range: newRange
      });
      this.props.onChange(this.getUpdatedData(newRange));
    };
  }

  addRange = () => {
    const newRange = [...this.state.range, { min: 0, max: 0 }];
    this.setState({
      range: newRange
    });

    this.props.onChange(this.getUpdatedData(newRange));
  }

  removeRange = () => {
    const newRange = Array.from(this.state.range);

    newRange.pop();
    this.setState({
      range: newRange
    });

    this.props.onChange(this.getUpdatedData(newRange));
  }

  getRows = () => {
    let { range } = this.state,
      { themes } = this.props,
      { themeList, curSelected } = themes,
      curTheme = themeList[curSelected],
      palette = curTheme.map.generic.palette,
      i,
      rows = [];

    for (i = 0; i < range.length; i++) {
      rows.push(
        <div className='d-flex flex-row py-1 px-1' key={i} style={{  }}>
          <span className='mr-2'>
            <span>Min Value</span>
            <Input type={'number'} value={range[i].min} onChange={this.onValueChange(i, 'min')} />
          </span>
          <span className='mr-2'>
            <span>Max Value</span>
            <Input type={'number'} value={range[i].max} onChange={this.onValueChange(i, 'max')} />
          </span>
          <span className='ml-2'>
            <span>Color</span>
            <ColorPicker color={palette[i]} onColorChange={this.onColorChange(i)} height={26} />
            {/* <div style={{ width: 40, height: 30, backgroundColor: palette[i] }}></div> */}
          </span>
        </div>
      );
    }

    return rows;
  }

  getUpdatedData = (range) => {
    let newColorRange = [],
      i;

    for (i = 0; i < range.length; i++) {
      newColorRange.push({
        minvalue: range[i].min,
        maxvalue: range[i].max
      });
    }

    return newColorRange;
  }

  render () {
    return (
      <div className='w-100 d-flex flex-column'>
        <div className='d-flex flex-row justify-content-between' style={{ }}>
          <span className='font-weight-bold' style={{ fontSize: 18}}>Color Range</span>
          <span>
            <Button className='add-remove-btn' onClick={this.addRange}>+</Button>
            <Button className='add-remove-btn' onClick={this.removeRange}>-</Button>
          </span>
        </div>
        {this.getRows()}
      </div>
    );
  }
}

ColorRange.defaultProps = {
  onChange: () => {}
};

const mapStateToPropsCM = state => {
  return {
    themes: state.themes
  };
};

const mapDispatchToPropsCM = dispatch => {
  return {
    updatePalette: (color, index) => {
      dispatch({
        type: 'update_map_palette',
        prop: 'map/generic/palette',
        newValue: color,
        index
      });
    }
  };
};

const ColorRangeHOC = connect(mapStateToPropsCM, mapDispatchToPropsCM)(ColorRange);

class MapItem extends Component {
  constructor (props) {
    super(props);;

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
      range: [
        { minvalue: '0', maxvalue: '1.0' },
        { minvalue: '1.0', maxvalue: '2.0' },
        { minvalue: '2.0', maxvalue: '3.0' }
      ],
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

  rangeChangeHandler = range => {
    this.setState({
      range
    });
  }

  render () {
    const { chartAttr, type, height, csv, caption, subCaption, range } = this.state,
      { themes } = this.props,
      { themeList, curSelected } = themes,
      curTheme = themeList[curSelected];

    const newChartAttr = Object.assign({}, chartAttr);

    newChartAttr.bgcolor = curTheme.infograph.background;
    const chartConfig = {
      type: type,
      width: '100%',
      height: height,
      dataFormat: 'json',
      dataSource: {
        chart: {
          ...newChartAttr,
          caption,
          subCaption
        },
        colorRange: {
          gradient: 0,
          color: range.map((range, index) => {
            return {
              minvalue: range.minvalue,
              maxvalue: range.maxvalue,
              color: curTheme.map.generic.palette[index]
            };
          })
        },
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
              <span className='font-weight-bold'>Title:</span>
              <Input className='d-inline-block' onChange={this.titleChangeHandler} value={caption} />
            </div>
            <div className='mt-2'>
              <span className='font-weight-bold'>Subtitle:</span>
              <Input className='d-inline-block' onChange={this.subtitleChangeHandler} value={subCaption} />
            </div>
            <hr />
            <div className='mt-2'>
              <ColorRangeHOC
                range={range.map(range => { return { min: range.minvalue, max: range.maxvalue }; })}
                onChange={this.rangeChangeHandler}
              />
            </div>
            <hr />
            <div className='d-flex flex-row map-height-range'>
              <span className='mr-1'>Chart Height</span>
              <input style={{ marginLeft: 'auto' }} type='range' min={300} max={800} value={height} onChange={this.changeMapHeight} />
              <span className='ml-2'>{height}px</span>
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

const mapStateToPropsMapItem = state => {
  return {
    themes: state.themes
  };
};

const MapItemHOC = connect(mapStateToPropsMapItem)(MapItem);

class MapIcon extends Component {
  render () {
    const { type, content, onClickFn, count } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <MapItemHOC type={type} content={content} />
      }
    };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn} id='sidebar-map-btn' tooltext='Add map'>
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
  MapItemHOC
};
