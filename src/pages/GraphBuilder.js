import React, { Component } from 'react';

import Header from '../components/Header/index';
// import Toolbar from '../components/Toolbar';

import './GraphBuilder.scss';
import Editor from '../components/Editor';
import SettingsPanel from '../components/SettingsPanel';

export default class GraphBuilder extends Component {
  render () {
    return (
      <div className='App-content'>
        <Header />
        <div className='info-editor-container px-4 d-flex flex-column align-items-center'>
          {/* <div style={{ width: 1280}}>
            <Toolbar />
          </div> */}
          <Editor />
        </div>
        <SettingsPanel />
      </div>
    );
  }
}
