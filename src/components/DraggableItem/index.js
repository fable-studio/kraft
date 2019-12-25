import React , { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Item extends Component {
  render () {
    let { infoBodyWidth, editorBodyWidth, task, index} = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <div className='d-flex flex-row'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div style={{width: infoBodyWidth, height: 200, background: 'black' }}>{task.content}</div>
            <div style={{width: editorBodyWidth, height: 200, background: 'blue'}}>{task.content}</div>
          </div>
        )}
      </Draggable>
    );
  }
}