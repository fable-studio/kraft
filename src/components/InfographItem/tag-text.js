import React, { Component } from 'react';
import Item from '../DraggableItem';
import BaseItemIcon from './base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Card from './card';
import { Button, Input } from 'reactstrap';

class TagText extends Component {
 state = {
   selectedIndex: 0,
   cardAlignMode: 0,
   cards: [{
     id: 'card-0',
     title: 'Lorem ipsum',
     textAlign: 'left',
     cardAlign: 'left',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   },
   {
     id: 'card-1',
     title: 'Lorem ipsum',
     textAlign: 'left',
     cardAlign: 'left',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   },
   {
     id: 'card-2',
     title: 'Lorem ipsum',
     textAlign: 'left',
     cardAlign: 'left',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   }]
 }

 addCard = () => {
   this.setState(state => {
     const cards = state.cards.slice();
     cards.push({
       id: `card-${cards.length}`,
       title: 'Lorem ipsum',
       textAlign: 'left',
       cardAlign: 'left',
       content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
     });
     return {
       ...state,
       selectedIndex: cards.length - 1,
       cards
     };
   });
 }

 deleteCard = () => {
   this.setState(state => {
     const cards = state.cards.slice();
     let selectedIndex = state.selectedIndex;
     cards.splice(selectedIndex, 1);
     selectedIndex = cards.length ? 0 : null;
     return {
       ...state,
       selectedIndex,
       cards
     };
   });
 }

 updateCardAlignemnt = () => {

 }

 upadetTextAlignemnt = () => {

 }

 updateTitle = (e) => {
   if (this.state.selectedIndex === null) return;
   const value = e.target.value;
   this.setState(state => {
     const cards = state.cards.slice(),
       card = Object.assign({}, cards[state.selectedIndex]);
     card.title = value;
     cards[state.selectedIndex] = card;
     return {
       ...state,
       cards
     };
   });
 }

 updateContent = (e) => {
   if (this.state.selectedIndex === null) return;
   const value = e.target.value;
   this.setState(state => {
     const cards = state.cards.slice(),
       card = Object.assign({}, cards[state.selectedIndex]);
     card.content = value;
     cards[state.selectedIndex] = card;
     return {
       ...state,
       cards
     };
   });
 }

 cardSelected = (index) => {
   this.setState((state) => {
     return {
       ...state,
       selectedIndex: index
     };
   });
 }

 render () {
   const { title, content } = this.state.selectedIndex === null ? {
     title: '',
     content: ''
   } : this.state.cards[this.state.selectedIndex];
   return (
     <>
       <Item.Infograph>
         {
           this.state.cards.map(({ id, title, content, textAlign, cardAlign }, index) =>
             <Card key={id} index={index} title={title} content={content} clicked={this.cardSelected} textAlign={textAlign} cardAlign={cardAlign} ></Card>)
         }
       </Item.Infograph>
       <Item.Editor>
         <div className='mx-3 my-3'>
           <div>
             <Button className='mr-1' onClick={this.addCard}>
               <FontAwesomeIcon icon={faPlus} />
             </Button>
             <Button className='mr-1' onClick={this.deleteCard}>
               <FontAwesomeIcon icon={faTimes} />
             </Button>
           </div>
           <div className='mt-2'>
             <span className='font-weight-bold'>Title:</span>
             <Input className='d-inline-block' onChange={this.updateTitle} value={title} />
           </div>
           <div className='mt-2'>
             <span className='font-weight-bold'>Content:</span>
             <textarea className='w-100' style={{ height: '100px' }} onChange={this.updateContent} value={content} />
           </div>
         </div>
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
