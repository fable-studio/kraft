import React , { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

class Infograph extends Component {
  render () {
    let { width, height } = this.props;

    return (
      <div style={{width, height, background: 'black' }}>
        {this.props.children}
      </div>
    );
  }
}

Infograph.defaultProps = {
  width: 600,
  height: 200
}

class InfographEditor extends Component {
  render () {
    let { width, height } = this.props;
    return (
      <div style={{width, height, background: 'blue'}}>
        {this.props.children}
      </div>
    );
  }
}

InfographEditor.defaultProps = {
  width: 600,
  height: 200
}


export default class Item extends Component {

  static Infograph = Infograph;
  static Editor = InfographEditor;

  render () {
    let { task, index } = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <div className='d-flex flex-row'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task.content}
          </div>
        )}
      </Draggable>
    );
  }
}