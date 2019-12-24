import React, { Component } from 'react';

export default class Editor extends Component {
  render () {
    let { infoBodyWidth, editorBodyWidth } = this.props;

    return (
      <div className='d-flex flex-row'>  
        <div className='infograph' style={{ width: infoBodyWidth, height: 1800, background: '#fff000' }}></div>
        <div className='editor' style={{ width: editorBodyWidth, height: 1800, background: '#ffffff' }}></div>
      </div>
    );
  }
}