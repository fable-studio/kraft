/* eslint-disable */
import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import ReactFc from 'react-fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import './index.scss';
import { connect } from 'react-redux';

ReactFc.fcRoot(FusionCharts, Widgets, FusionTheme);
FusionCharts.options.creditLabel = 0;

class SettingsPanel extends Component {
  state = {
    showPanel: false
  }

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

  generateDemos = () => {
    let { themes } = this.props,
      { themeList, ids } = themes,
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

      demos.push(
        <div key={ids[i]} className='theme-container' onClick={this.changeTheme(ids[i])}>
          <div className='theme-demo d-flex flex-column justify-content-start align-items-start px-2 py-2 h-100' style={{ background: curTheme.infograph.background}}>
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
        </div>
      );
    }

    return demos;
  }

  render () {
    const { showPanel } = this.state;

    return (
      <div>
        <div className='settings-panel-container position-fixed' style={{ right: showPanel ? 0 : -200 }}>
          <div className='settings-btn position-absolute d-flex justify-content-center align-items-center' onClick={this.togglePanel}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </div>
          <div
            className='d-flex flex-column justify-content-start align-items-start position-absolute'
            style={{ marginTop: 70, width: 200, minHeight: '100vh', overflowY: 'scroll', right: 0, background: '#ebeff2', paddingBottom: 15 }}
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
    changeTheme: id => { dispatch({type: 'CHANGE_THEME', currentTheme: id}); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
