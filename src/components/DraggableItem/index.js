import React , { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './index.scss';
class Infograph extends Component {
  render () {
    let { width } = this.props;

    return (
      <div className='infoitem-default' style={{ width }}>
        {this.props.children}
      </div>
    );
  }
}

Infograph.defaultProps = {
  width: 500
}

class InfographEditor extends Component {
  render () {
    let { width } = this.props;
    return (
      <div className='infoeditor-default' style={{ width }}>
        {this.props.children}
      </div>
    );
  }
}

InfographEditor.defaultProps = {
  width: 400
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