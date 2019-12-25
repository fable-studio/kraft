import React, { Component } from 'react';
import Item from '../DraggableItem/index';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

export default class Editor extends Component {
  state = {
    sidebarWidth: 80,
    infoBodyWidth: 600,
    editorBodyWidth: 600,
    draggableList: {
      tasks: {
        'task-1': {
          id: 'task-1',
          content: (
            <>
              <Item.Infograph>task-1</Item.Infograph>
              <Item.Editor>task-1</Item.Editor>
            </>
          )
        },
        'task-2': {
          id: 'task-2',
          content: (
            <>
              <Item.Infograph>task-2</Item.Infograph>
              <Item.Editor>task-2</Item.Editor>
            </>
          )
        },
        'task-3': {
          id: 'task-3',
          content: (
            <>
              <Item.Infograph>task-3</Item.Infograph>
              <Item.Editor>task-3</Item.Editor>
            </>
          )
        }
      },
      columns: {
        'column-1': {
          id: 'column-1',
          taskIds: ['task-1', 'task-2', 'task-3']
        }
      },
      columnOrder: ['column-1']
    }
  }

  onDragEnd = result => {
    let { source, destination, draggableId } = result,
      { draggableList } = this.state;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = draggableList.columns[source.droppableId],
      newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newState = {
      ...this.state,
      draggableList: {
        ...draggableList,
        columns: {
          ...draggableList.columns,
          [source.droppableId]: newColumn
        }
      }
    };

    this.setState(newState);
  }

  render () {
    let { sidebarWidth, infoBodyWidth, editorBodyWidth, draggableList } = this.state;

    return (
      <div className='info-editor-body'>
        <div className='sidebar float-left' style={{ width: sidebarWidth, height: 300, background: '#ff0000' }}></div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {draggableList.columnOrder.map(columnId => {
            const column = draggableList.columns[columnId],
              tasks = column.taskIds.map(taskId => draggableList.tasks[taskId]);

            return (
              <Droppable droppableId={columnId} key={columnId}>
                {provided => {
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {tasks.map((task, index) => <Item infoBodyWidth={infoBodyWidth} editorBodyWidth={editorBodyWidth} key={task.id} task={task} index={index} />)}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    );
  }
}