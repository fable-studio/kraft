import React , { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class View extends Component {
    render () {
        let { infoBodyWidth, editorBodyWidth, ele} = this.props;
        return (<Draggable draggableId={String(ele.index)} index={ele.index}>
            {
                provided => (
                <div className='d-flex flex-row'
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    <div style={{width: infoBodyWidth, height: 200, background: 'black' }}>{ele.name}</div>
                    <div style={{width: editorBodyWidth, height: 200, background: 'blue'}}>{ele.name}</div>
                </div>
                )
            }
        
        </Draggable>)
    }
}