/* eslint-disable */
import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFc from 'react-fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import './index.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit, faCheck
} from '@fortawesome/free-solid-svg-icons'
import { cloneObject } from '../../utils';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ColorPicker from '../ColorPicker/index';

ReactFc.fcRoot(FusionCharts, Widgets, FusionTheme);
FusionCharts.options.creditLabel = 0;

class SettingsPanel extends Component {
  state = {
    showPanel: false,
    modalOpen: null,
    currentHoveredTheme: null
  }

  _curTheme = {};

  togglePanel = () => {
    this.setState(prevState => {
      return {
        showPanel: !prevState.showPanel
      };
    });
  }

  changeTheme = id => {
    return () => {
      this.props.changeTheme(id);
    }
  }

  setVisibleEditor = val => {
    return () => {
      this.setState({
        currentHoveredTheme: val
      });
    }
  }

  toggleModal = (id, open, apply) => {
    return () => {
      this.setState(() => {
        let { themes } = this.props,
          { themeList } = themes;

        if (open) {
          // this._curThemeId = id;
          this._curTheme[id] = this._curTheme[id] || cloneObject(themeList[id]);
        } else {
          apply && this.props.updateFullTheme(this._curTheme[id], id);
          // delete this._curTheme;
          // delete this._curThemeId;
        }

        return {
          modalOpen: open && id,
          currentHoveredTheme: null
        }
      });
    }
  }

  shallowThemeChange = (id, type, index) => {
    return val => {
      switch (type) {
        case 'infograph-background': this._curTheme[id].infograph.background = val; break;
        case 'infograph-text-header': this._curTheme[id].text.header.color = val; break;
        case 'infograph-text-title': this._curTheme[id].text.title.color = val; break;
        case 'infograph-text-quote': this._curTheme[id].text.quote.color = val; break;
        case 'infograph-text-body': this._curTheme[id].text.body.color = val; break;
        case 'infograph-chart-palette': this._curTheme[id].chart.generic.palette[index] = val; break;
        case 'infograph-chart-title': this._curTheme[id].chart.text.title.color = val; break;
        case 'infograph-chart-subtitle': this._curTheme[id].chart.text.subtitle.color = val; break;
        case 'infograph-map-palette': this._curTheme[id].map.generic.palette[index] = val; break;
        case 'infograph-map-title': this._curTheme[id].map.title.color = val; break;
        case 'infograph-map-subtitle': this._curTheme[id].map.subtitle.color = val; break;
        case 'infograph-rating-background': this._curTheme[id].rating.background.backgroundColor = val; break;
        case 'infograph-progress-background': this._curTheme[id].rating.progress.backgroundColor = val; break;
        case 'infograph-progress-striped-background': this._curTheme[id].rating['progress-striped'].backgroundColor = val; break;
        case 'infograph-star-background': this._curTheme[id].rating.star.color = val; break;
      };
    }
  }

  generateDemos = () => {
    let { themes } = this.props,
      { themeList, ids, curSelected } = themes,
      { currentHoveredTheme, modalOpen } = this.state,
      showEditor,
      demos = [],
      defaultChartAttr = {
        theme: 'fusion',
        showTooltip: 0,
        plothovereffect: 0,
        showlegend: 0,
        caption: '',
        subcaption: ''
      },
      chartAttr,
      newChartConfig,
      chartConfig = {
        type: 'sparkcolumn',
        width: '100%',
        height: '50',
        dataFormat: 'json',
        dataSource: {
          dataset: [
            {
              data: [
                {
                  value: '30.5'
                },
                {
                  value: '36.5'
                },
                {
                  value: '32.5'
                },
                {
                  value: '33.5'
                }
              ]
            }
          ]
        }
      },
      showModal,
      curTheme,
      i;

    for (i = 0; i < ids.length; i++) {
      curTheme = themeList[ids[i]];

      if (!Object.keys(curTheme).length) continue;

      chartAttr = Object.assign({}, defaultChartAttr);

      chartAttr.bgColor = curTheme.infograph.background;
      chartAttr.plotFillColor = curTheme.chart.generic.palette[0];
      chartAttr.highColor = curTheme.chart.generic.palette[1];
      chartAttr.lowColor = curTheme.chart.generic.palette[2];

      newChartConfig = {
        ...chartConfig,
        dataSource: {
          ...chartConfig.dataSource,
          chart: chartAttr
        }
      }

      showEditor = (curSelected === ids[i] && i === currentHoveredTheme);
      showModal =  modalOpen === ids[i];

      demos.push(
        <div key={ids[i]} className='theme-container position-relative' /* onMouseOver={this.setVisibleEditor(i)} onMouseOut={this.setVisibleEditor(null)} */>
          {/* <div 
            className={ showEditor ? 'position-absolute rounded-circle' : 'd-none' } 
            style={{ top: -12, right: -10, width: 28, height: 28, backgroundColor: 'white' }}
          >
            <span style={{ paddingLeft: 7, paddingTop: 1 }} onClick={this.toggleModal(ids[i], true)}><FontAwesomeIcon icon={faEdit} /></span>
          </div> */}
          <div 
            className={ curSelected === ids[i] ? 'position-absolute rounded-circle' : 'd-none' } 
            style={{ top: -12, left: -10, width: 28, height: 28, backgroundColor: 'white' }}
          >
            <span style={{ paddingLeft: 7, paddingTop: 1 }} ><FontAwesomeIcon icon={faCheck} /></span>
          </div>
          <div onClick={this.changeTheme(ids[i])} className='theme-demo d-flex flex-column justify-content-start align-items-start px-2 py-2 h-100' style={{ background: curTheme.infograph.background}}>
            <div style={{ fontSize: 32, lineHeight: '55px', ...curTheme.text.header }}>Infographic</div>
            <div style={{ fontSize: 14, lineHeight: '14px', ...curTheme.text.title }}>Lorem ipsum dolor sit amet</div>
            <div className='w-100 demo-progress mt-1 progress' style={{ ...curTheme.rating.background }}>
              <div style={{ ...curTheme.rating.progress, width: '60%' }} className='progress-bar' role='progressbar' aria-valuenow='3' aria-valuemin='0' aria-valuemax='5'></div>
            </div>
            <div className='w-100 mt-1'>
              <ReactFc {...newChartConfig}/>
            </div>
            <div className='w-100 mt-1' style={{fontSize: 10, lineHeight: '10px', ...curTheme.text.body }}>
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </div>
          </div>
          <Modal isOpen={showModal} toggle={this.toggleModal(ids[i], false)}>
            <ModalHeader charCode={'x'} toggle={this.toggleModal(ids[i], false)}>
              Edit theme
            </ModalHeader>
            <ModalBody>
              <div className='w-100 d-flex flex-column justify-content-start align-items-start px-2 py-2' style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
                <div className='w-100'>
                  <div className='separator' style={{ fontSize: 20 }}>Background</div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 44 }}>Background Color </span>
                    <ColorPicker className='d-inline-block' color={curTheme.infograph.background} onColorChange={this.shallowThemeChange(ids[i], 'infograph-background')} />
                  </div>
                </div>
                <div className='w-100'>
                  <div className='separator' style={{ fontSize: 20 }}>Text</div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 80 }}>Header Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.text.header.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-header')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 101 }}>Title Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.text.title.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-title')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 88 }}>Quote Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.text.quote.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-quote')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 96 }}>Body Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.text.body.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-body')} />
                  </div>
                </div>
                <div className='w-100'>
                  <div className='separator' style={{ fontSize: 20 }}>Chart</div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 126 }}>Palette</span>
                    {curTheme.chart.generic.palette.map((color, index) => {
                      return (
                        <ColorPicker key={index} className='d-inline-block' color={color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-chart-palette', index)} />
                      );
                    })}
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 59 }}>Chart title Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.chart.text.title.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-chart-title')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 33 }}>Chart subtitle Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.chart.text.subtitle.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-chart-subtitle')} />
                  </div>
                </div>
                <div className='w-100'>
                  <div className='separator' style={{ fontSize: 20 }}>Map</div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 126 }}>Palette</span>
                    {curTheme.map.generic.palette.map((color, index) => {
                      return (
                        <ColorPicker key={index} className='d-inline-block' color={color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-map-palette', index)} />
                      );
                    })}
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 69 }}>Map title Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.chart.text.title.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-map-title')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 42 }}>Map subtitle Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.chart.text.subtitle.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-map-subtitle')} />
                  </div>
                </div>
                <div className='w-100'>
                  <div className='separator' style={{ fontSize: 20 }}>Rating</div>
                  <div className='d-flex flex-row' >
                    <span style={{ marginRight: 37 }}>Rating background</span>
                    <ColorPicker className='d-inline-block' color={curTheme.rating.background.backgroundColor} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-body')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 69 }}>Progress Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.rating.progress.backgroundColor} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-body')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 18 }}>Striped progess Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.rating['progress-striped'].backgroundColor} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-body')} />
                  </div>
                  <div className='d-flex flex-row'>
                    <span style={{ marginRight: 42 }}>Star progess Color</span>
                    <ColorPicker className='d-inline-block' color={curTheme.rating.star.color} onColorChange={this.shallowThemeChange(ids[i], 'infograph-text-body')} />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleModal(ids[i], false, true)}>Apply</Button>
              <Button onClick={this.toggleModal(ids[i], false)}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    return demos;
  }

  render () {
    const { showPanel } = this.state;

    return (
      <div>
        <div className='settings-btn position-fixed d-flex justify-content-center align-items-center' style={{ right: showPanel ? 200 : 0 }} onClick={this.togglePanel}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
        <div className='settings-panel-container position-fixed' style={{ right: showPanel ? 0 : -200 }}>
          <div
            className='d-flex flex-column justify-content-start align-items-start position-absolute'
            style={{ marginTop: 68, width: 200, minHeight: '100vh', overflowY: 'scroll', right: 0, background: '#5d5d5d', paddingBottom: 15 }}
          >
            {this.generateDemos()}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    themes: state.themes
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeTheme: id => { dispatch({type: 'CHANGE_THEME', currentTheme: id}); },
    updateFullTheme: (theme, id) => { dispatch({ type: 'update_full_theme', theme, id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
