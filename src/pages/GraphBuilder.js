import React, { Component } from 'react';

import Header from '../components/Header/index';
import Toolbar from '../components/Toolbar';

import './GraphBuilder.scss';
import Editor from '../components/Editor';

export default class GraphBuilder extends Component {
  state = {
    sidebarWidth: 80,
    infoBodyWidth: 600,
    editorBodyWidth: 600
  }

  render () {
    let { sidebarWidth, infoBodyWidth, editorBodyWidth } = this.state;

    return (
      <div className='App-content'>
        <Header />
        <div className='info-editor-container px-4 d-flex flex-column align-items-center'>
          <div style={{ width: 1280}}>
            <Toolbar />
          </div>
          <div className='info-editor-body'>
            <div className='sidebar float-left' style={{ width: sidebarWidth, height: 300, background: '#ff0000' }}></div>
            <Editor infoBodyWidth={infoBodyWidth} editorBodyWidth={editorBodyWidth} />
          </div>
        </div>
      </div>
    );
  }
}