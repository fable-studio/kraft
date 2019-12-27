import React, { Component } from 'react';
import Item from '../DraggableItem/index';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

import './index.scss';
import {
  TextIcon,
  ChartIcon,
  MapIcon,
  ImageIcon,
  RatingIcon,
  TextItem,
  ChartItem,
  MapItem,
  ImageItem
} from '../InfographItem';
import { Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faSave, faShare
} from '@fortawesome/free-solid-svg-icons';

export default class Editor extends Component {
  state = {
    sidebarWidth: 70,
    infoBodyWidth: 500,
    editorBodyWidth: 400,
    taskCount: 4,
    draggableList: {
      tasks: {
        'task-1': {
          id: 'task-1',
          content: <TextItem />
        },
        'task-2': {
          id: 'task-2',
          content: <ChartItem />
        },
        'task-3': {
          id: 'task-3',
          content: <ImageItem />
        },
        'task-4': {
          id: 'task-4',
          content: <MapItem />
        }
      },
      columns: {
        'column-1': {
          id: 'column-1',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }
      },
      columnOrder: ['column-1']
    }
  }

  onDragEnd = result => {
    const { source, destination, draggableId } = result;
    const { draggableList } = this.state;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = draggableList.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

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

  addNewTask = (content) => {
    const { draggableList, taskCount } = this.state;
    const newDraggableList = {
      ...draggableList,
      tasks: {
        ...draggableList.tasks,
        [content.task.id]: content.task
      },
      columns: {
        'column-1': {
          id: 'column-1',
          taskIds: [
            ...draggableList.columns['column-1'].taskIds,
            content.task.id
          ]
        }
      }
    };

    this.setState({
      taskCount: taskCount + 1,
      draggableList: newDraggableList
    });
  }

  render () {
    const {
      sidebarWidth,
      infoBodyWidth,
      editorBodyWidth,
      draggableList,
      taskCount
    } = this.state;

    return (
      <>
        <div className='mt-3' style={{ width: editorBodyWidth + infoBodyWidth + sidebarWidth }}>
          <div className='toolbar-container d-inline-flex flex-row align-items-center' style={{ marginLeft: sidebarWidth - 10 }}>
            <Input className='mr-2 input-cosmetics' bsSize='lg' placeholder='Enter Infographic name'></Input>
            <Button className='btn-cosmetics mr-2'><FontAwesomeIcon icon={faEye} /></Button>
            <Button className='btn-cosmetics mr-2'><FontAwesomeIcon icon={faSave} /></Button>
            <Button className='btn-cosmetics mr-2'><FontAwesomeIcon icon={faShare} /></Button>
          </div>
        </div>
        <div className='info-editor-body d-flex flex-row position-relative mt-2'>
          <div className='sidebar d-flex flex-column align-items-center' style={{ width: sidebarWidth }}>
            <TextIcon count={taskCount} onClickFn={this.addNewTask} />
            <ChartIcon count={taskCount} onClickFn={this.addNewTask}/>
            <MapIcon count={taskCount} onClickFn={this.addNewTask}/>
            <ImageIcon count={taskCount} onClickFn={this.addNewTask} />
            <RatingIcon />
          </div>
          <div className='position-relative'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {draggableList.columnOrder.map(columnId => {
                const column = draggableList.columns[columnId];
                const tasks = column.taskIds.map(taskId => draggableList.tasks[taskId]);

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
        </div>
      </>
    );
  }
}
