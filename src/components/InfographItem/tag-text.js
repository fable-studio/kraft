import React, { Component } from 'react';
import Item from '../DraggableItem';
import BaseItemIcon from './base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream } from '@fortawesome/free-solid-svg-icons';
import Card from './card';

class TagText extends Component {
 state = {
   cards: [{
     id: 'card-1',
     index: '1',
     title: 'Lorem ipsum',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no, posse copiosae contentiones pro no. His viris consul constituam no. Sea mutat feugiat eu, has te ludus placerat disputando, alia quot omnis vel eu.'
   },
   {
     id: 'card-2',
     index: '2',
     title: 'Lorem ipsum',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no, posse copiosae contentiones pro no. His viris consul constituam no. Sea mutat feugiat eu, has te ludus placerat disputando, alia quot omnis vel eu.'
   },
   {
     id: 'card-3',
     index: '3',
     title: 'Lorem ipsum',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no, posse copiosae contentiones pro no. His viris consul constituam no. Sea mutat feugiat eu, has te ludus placerat disputando, alia quot omnis vel eu.'
   }]
 }

 render () {
   return (
     <>
       <Item.Infograph>
         {
           this.state.cards.map(({ id, index, title, content }) => <Card key={id} index={index} title={title} content={content}></Card>)
         }
       </Item.Infograph>
       <Item.Editor>
       </Item.Editor>
     </>
   );
 }
}

class TagTextIcon extends Component {
  render () {
    const { type, onClickFn, count } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <TagText type={type} />
      }
    };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faStream} />
      </BaseItemIcon>
    );
  }
}

export {
  TagText,
  TagTextIcon
};
