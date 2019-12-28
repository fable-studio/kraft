import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './index.scss';
import { connect } from 'react-redux';
class Infograph extends Component {
  render () {
    const { width, height } = this.props;

    let styleObj = {
      width
    };

    if (typeof height !== 'undefined') {
      styleObj.minHeight = height;
    }

    return (
      <div className='infoitem-default' style={styleObj}>
        {this.props.children}
      </div>
    );
  }
}

Infograph.defaultProps = {
  width: 500
};

class InfographEditor extends Component {
  render () {
    const { width, height, preview } = this.props;

    let styleObj = {
      width
    };

    if (typeof height !== 'undefined') {
      styleObj.minHeight = height;
    }

    return (
      <div className={preview ? 'd-none' : 'infoeditor-default'} style={styleObj}>
        {this.props.children}
      </div>
    );
  }
}

InfographEditor.defaultProps = {
  width: 400
};

const mapStateToPropsEditor = state => {
  return {
    preview: state.preview.preview
  };
};

const InfographEditorHOC = connect(mapStateToPropsEditor)(InfographEditor);

class Item extends Component {
  static Infograph = Infograph;
  static Editor = InfographEditorHOC;

  render () {
    const { task, index, preview } = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='d-flex flex-row position-relative'>
              <span
                className={preview ? 'd-none' : 'position-absolute font-weight-bold'}
                style={{ right: 7, top: -2, cursor: 'pointer' }}
                onClick={() => this.props.deleteTask(task.id)}
              >
                x
              </span>
              {task.content}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToPropsItem = state => {
  return {
    preview: state.preview.preview
  };
};

export default connect(mapStateToPropsItem)(Item);