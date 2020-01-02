import React, { Component } from 'react';
import Item from '../DraggableItem/index';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

import './index.scss';
import {
  TextIcon,
  ChartIcon,
  MapIcon,
  ImageIcon,
  RatingIcon,
  TextItem,
  ChartItem,
  RatingItem,
  ImageItem,
  MapItem,
  TagTextIcon,
  TagText,
  CreditItem
} from '../InfographItem';
import { Input, Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf, faFileImage
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const DEFAULTTEXTPADDING = 30;
class Editor extends Component {
  constructor (props) {
    super(props);

    const sidebarWidth = 70,
      infoBodyWidth = 500,
      editorBodyWidth = 400;

    const draggableList = {
      tasks: {
        'task-6': {
          id: 'task-6',
          content: <ImageItem maxLineWidth={infoBodyWidth} />
        },
        'task-5': {
          id: 'task-5',
          content: <TextItem maxLineWidth={infoBodyWidth - DEFAULTTEXTPADDING} />
        },
        'task-4': {
          id: 'task-4',
          content: <ChartItem />
        },
        'task-3': {
          id: 'task-3',
          content: <RatingItem />
        },
        'task-2': {
          id: 'task-2',
          content: <TagText />
        },
        'task-1': {
          id: 'task-1',
          content: <MapItem />
        },
        'task-0': {
          id: 'task-0',
          draggable: false,
          content: <CreditItem />
        }
      },
      columns: {
        'column-1': {
          id: 'column-1',
          taskIds: ['task-6', 'task-5', 'task-4', 'task-3', 'task-2', 'task-1', 'task-0']
        }
      },
      columnOrder: ['column-1']
    };

    this.state = {
      taskCount: Object.keys(draggableList.tasks).length,
      sidebarWidth,
      infoBodyWidth,
      editorBodyWidth,
      fileName: 'fable-studio',
      showSpinner: false,
      draggableList
    };
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
            content.task.id,
            ...draggableList.columns['column-1'].taskIds
          ]
        }
      }
    };

    this.setState({
      taskCount: taskCount + 1,
      draggableList: newDraggableList
    });
  }

  deleteTask = id => {
    const { draggableList } = this.state,
      taskIds = draggableList.columns['column-1'].taskIds;

    if (taskIds.length <= 1) return;

    const newDraggableList = {
      ...draggableList,
      tasks: {
        ...draggableList.tasks
      },
      columns: {
        'column-1': {
          id: 'column-1',
          taskIds: taskIds.filter(taskId => taskId !== id)
        }
      }
    };
    delete newDraggableList.tasks[id];

    this.setState({
      draggableList: newDraggableList
    });
  }

  print = (type) => {
    return () => {
      let containerEle = document.createElement('div'),
        infoItems = document.getElementsByClassName('infoitem-default'),
        width,
        height,
        { fileName, infoBodyWidth } = this.state,
        { curSelected, themeList } = this.props.themes;

      this.setState({
        showSpinner: true
      });
      containerEle.setAttribute('style', `position: absolute; top: -16384px; width:${infoBodyWidth}px; background: ${themeList[curSelected].infograph.background};`);

      for (let i = 0; i < infoItems.length; i++) {
        containerEle.appendChild(infoItems[i].cloneNode(true));
      }

      document.body.insertBefore(containerEle, document.body.firstChild);

      height = containerEle.offsetHeight;
      width = containerEle.offsetWidth;

      if (type === 'pdf') {
        const pdf = new JsPDF('p', 'mm', [width * 0.2646 * 5, height * 0.2646 * 5]);

        html2canvas(containerEle).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
          pdf.save(fileName + '.pdf');
          this.setState({
            showSpinner: false
          });
          containerEle.parentNode.removeChild(containerEle);
        });
      } else {
        html2canvas(containerEle).then(canvas => {
          var a = document.createElement('a');
          // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
          a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
          a.download = fileName + '.jpg';
          a.click();
          this.setState({
            showSpinner: false
          });
          containerEle.parentNode.removeChild(containerEle);
        });
      }

    };
  }

  updateFileName = e => {
    this.setState({
      fileName: e.target.value
    });
  }

  render () {
    const {
        sidebarWidth,
        infoBodyWidth,
        editorBodyWidth,
        draggableList,
        taskCount,
        showSpinner
      } = this.state,
      { preview } = this.props;

    return (
      <>
        <div className={preview ? 'd-none' : 'mt-3'} style={{ width: editorBodyWidth + infoBodyWidth + sidebarWidth }}>
          <div className='toolbar-container d-inline-flex flex-row align-items-center' style={{ marginLeft: sidebarWidth - 10 }}>
            <Input className='mr-2 input-cosmetics' bsSize='lg' placeholder='Enter Infographic name' onChange={this.updateFileName}></Input>
            {/* <Button className='btn-cosmetics mr-2' onClick={this.props.togglePreview}><FontAwesomeIcon icon={faEye} /></Button> */}
            <Button className='btn-cosmetics mr-2' onClick={this.print('pdf')}><FontAwesomeIcon icon={faFilePdf} /></Button>
            <Button className='btn-cosmetics mr-2' onClick={this.print('jpg')}><FontAwesomeIcon icon={faFileImage} /></Button>
            {showSpinner && <Spinner color='danger' />}
            {/* <Button className='btn-cosmetics mr-2'><FontAwesomeIcon icon={faShare} /></Button> */}
          </div>
        </div>
        <div className='info-editor-body d-flex flex-row position-relative mt-2'>
          <div className={preview ? 'd-none' : 'sidebar d-flex flex-column align-items-center'} style={{ width: sidebarWidth }}>
            <TextIcon count={taskCount} onClickFn={this.addNewTask} maxLineWidth={infoBodyWidth - DEFAULTTEXTPADDING}/>
            <ChartIcon count={taskCount} onClickFn={this.addNewTask}/>
            <MapIcon count={taskCount} onClickFn={this.addNewTask}/>
            <ImageIcon count={taskCount} onClickFn={this.addNewTask} maxLineWidth={infoBodyWidth} />
            <RatingIcon count={taskCount} onClickFn={this.addNewTask} />
            <TagTextIcon count={taskCount} onClickFn={this.addNewTask} />
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
                          {tasks.map((task, index) => <Item nonInteractive={task.draggable === false} infoBodyWidth={infoBodyWidth} editorBodyWidth={editorBodyWidth} key={task.id} task={task} index={index} deleteTask={this.deleteTask} />)}
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

const mapStateToProps = state => {
  return {
    preview: state.preview.preview,
    themes: state.themes
  };
};

export default connect(mapStateToProps)(Editor);
