import React, { Component } from 'react';
import Item from '../DraggableItem/index';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

const DEFAULTTEXTPADDING = 20;
export default class Editor extends Component {
  constructor (props) {
    super (props);

    let sidebarWidth = 70,
      infoBodyWidth = 500,
      editorBodyWidth = 400;

    this.state = {
      taskCount: 4,
      sidebarWidth,
      infoBodyWidth,
      editorBodyWidth,
      draggableList: {
        tasks: {
          'task-1': {
            id: 'task-1',
            content: <TextItem maxLineWidth={infoBodyWidth - DEFAULTTEXTPADDING} />
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

  addNewTask = (content) => {
    let { draggableList, taskCount } = this.state,
      newDraggableList;

    newDraggableList = {
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

  print = () => {
    let containerEle = document.createElement('div'),
      infoItems = document.getElementsByClassName('infoitem-default'),
      width,
      height;

    containerEle.setAttribute('style', `position: absolute; top: -16384px; width:${this.state.infoBodyWidth}px; background: #ebeff2;`);

    for (let i = 0; i < infoItems.length; i++) {
      containerEle.appendChild(infoItems[i].cloneNode(true));
    }

    document.body.insertBefore(containerEle, document.body.firstChild);

    height = containerEle.offsetHeight;
    width = containerEle.offsetWidth;

    const pdf = new jsPDF('p', 'mm', [width * 0.2646 * 5, height * 0.2646 * 5])

    html2canvas(containerEle).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save("download.pdf");
    });
  }

  render () {
    let {
      sidebarWidth,
      infoBodyWidth,
      editorBodyWidth,
      draggableList,
      taskCount
    } = this.state;

    return (
      <>
        <div className='mt-3' style={{ width: editorBodyWidth + infoBodyWidth + sidebarWidth }}>
          <div className='toolbar-container d-inline-flex flex-row align-items-center' style={{ marginLeft: sidebarWidth -10 }}>
            <Input className='mr-2 input-cosmetics' bsSize='lg' placeholder='Enter Infographic name'></Input>
            <Button className='btn-cosmetics mr-2'><FontAwesomeIcon icon={faEye} /></Button>
            <Button className='btn-cosmetics mr-2' onClick={this.print}><FontAwesomeIcon icon={faSave} /></Button>
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
        </div>
      </>
    );
  }
}