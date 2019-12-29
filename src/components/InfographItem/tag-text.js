import React, { Component } from 'react';
import Item from '../DraggableItem';
import BaseItemIcon from './base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faPlus, faTimes, faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import Card from './card';
import { Button, ButtonGroup, Input } from 'reactstrap';

class TagText extends Component {
 state = {
   selectedIndex: 0,
   cardAlignMode: 0,
   cards: [{
     id: 'card-0',
     title: 'Lorem ipsum',
     textAlign: 'text-left',
     cardAlign: 'left',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   },
   {
     id: 'card-1',
     title: 'Lorem ipsum',
     textAlign: 'text-left',
     cardAlign: 'left',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   },
   {
     id: 'card-2',
     title: 'Lorem ipsum',
     textAlign: 'text-left',
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
       textAlign: 'text-left',
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

 upadetTextAlignemnt = (alignment) => {
   if (this.state.selectedIndex === null) return;
   this.setState(state => {
     const cards = state.cards.slice(),
       card = Object.assign({}, cards[state.selectedIndex]);
     card.textAlign = alignment;
     cards[state.selectedIndex] = card;
     return {
       ...state,
       cards
     };
   });
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
   const { selectedIndex, cards } = this.state,
     { title, content } = selectedIndex === null ? {
       title: '',
       content: ''
     } : cards[selectedIndex],
     { textAlign } = cards[selectedIndex];
   return (
     <>
       <Item.Infograph>
         {
           cards.map(({ id, title, content, textAlign, cardAlign }, index) =>
             <Card key={id} index={index} title={title} content={content} clicked={this.cardSelected} textAlign={textAlign} cardAlign={cardAlign} selected={index === selectedIndex} ></Card>)
         }
       </Item.Infograph>
       <Item.Editor>
         <div className='mx-3 my-3'>
           <div>
             <ButtonGroup size='sm'>
               <Button active className='mr-1' onClick={this.addCard}>
                 <FontAwesomeIcon icon={faPlus} />
               </Button>
               <Button active className='mr-1' onClick={this.deleteCard}>
                 <FontAwesomeIcon icon={faTimes} />
               </Button>
             </ButtonGroup>
           </div><div className='info-text-justify'>
             <span className='mr-2'>Alignment:</span>
             <ButtonGroup size='sm'>
               <Button active={textAlign === 'text-left'} className='font-weight-bold text-alignment-btn' onClick={() => { this.upadetTextAlignemnt('text-left'); }}>
                 <FontAwesomeIcon icon={faAlignLeft} />
               </Button>
               <Button active={textAlign === 'text-center'} className='font-weight-bold text-alignment-btn' onClick={() => { this.upadetTextAlignemnt('text-center'); }}>
                 <FontAwesomeIcon icon={faAlignCenter} />
               </Button>
               <Button active={textAlign === 'text-right'} className='font-weight-bold text-alignment-btn' onClick={() => { this.upadetTextAlignemnt('text-right'); }}>
                 <FontAwesomeIcon icon={faAlignRight} />
               </Button>
             </ButtonGroup>
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
