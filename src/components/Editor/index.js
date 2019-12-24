import React, { Component } from 'react';
import Item from '../Item/index.js';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

export default class Editor extends Component {
  state = {
    sidebarWidth: 80,
    infoBodyWidth: 600,
    editorBodyWidth: 600,
    list: [{
      name: 'component A',
      index: 0
    }, {
      name: 'component B',
      index: 1
    }]
  }
  onDragEnd = result => {
    let { source, destination } = result;
    if (!destination || source.index === destination.index) {
      return;
    }
    let list = this.state.list.slice();
    list.splice(destination.index, 0, ...list.splice(source.index, 1));
    const newState = {
      ...this.state,
      list
    }
    this.setState(newState);
  }
  render () {
    let { sidebarWidth, infoBodyWidth, editorBodyWidth } = this.state;

    return (
      <div className='info-editor-body'>
        <div className='sidebar float-left' style={{ width: sidebarWidth, height: 300, background: '#ff0000' }}></div>
        <DragDropContext
        onDragEnd={this.onDragEnd}
        >
            <Droppable droppableId='1'>
              {
                provided => (
                  <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  >
                    {this.state.list.map(ele => <Item infoBodyWidth={infoBodyWidth} editorBodyWidth={editorBodyWidth} ele={ele} key={ele.index}/>)}
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
        </DragDropContext>
      </div>
    );
  }
}