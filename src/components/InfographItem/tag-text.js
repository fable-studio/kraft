import React, { Component } from 'react';
import Item from '../DraggableItem';
import BaseItemIcon from './base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStream,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faList,
  faListOl
} from '@fortawesome/free-solid-svg-icons';
import Card from './card';
import { Button, ButtonGroup, Input } from 'reactstrap';

const getCardAlignment = (mode, index) => {
    if (mode === 0) return 'left';
    else if (mode === 2) return 'right';
    else return index % 2 === 0 ? 'left' : 'right';
  },
  ACTIVE = {
    backgroundColor: '#4e555b',
    color: 'white'
  },
  NON_ACTIVE = {
    backgroundColor: 'white',
    color: '#4e555b'
  };

class TagText extends Component {
 state = {
   selectedIndex: 0,
   cardStyleMode: 2,
   cardCount: 3,
   numericOrdering: false,
   cards: [{
     id: 'card-0',
     title: 'Lorem ipsum',
     textAlign: 'text-left',
     cardAlign: 'right',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   },
   {
     id: 'card-1',
     title: 'Lorem ipsum',
     textAlign: 'text-left',
     cardAlign: 'right',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   },
   {
     id: 'card-2',
     title: 'Lorem ipsum',
     textAlign: 'text-left',
     cardAlign: 'right',
     content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
   }]
 }

 addCard = (selectedIndex, e) => {
   e.stopPropagation();
   this.setState(state => {
     const cards = state.cards.slice();
     cards.splice(selectedIndex + 1, 0, {
       id: `card-${state.cardCount}`,
       title: 'Lorem ipsum',
       textAlign: 'text-left',
       cardAlign: getCardAlignment(state.cardStyleMode, cards.length),
       content: 'Lorem ipsum dolor sit amet, eu sed liber audiam dolores, probo saepe verterem ius an. Quo lorem definitionem at. Et nulla malorum percipitur ius, possit latine splendide pro no'
     });
     return {
       ...state,
       cardCount: state.cardCount + 1,
       cards
     };
   });
 }

 deleteCard = (index, e) => {
   e.stopPropagation();
   this.setState(state => {
     const cards = state.cards.slice();
     if (cards.length === 1) return null;
     let selectedIndex = state.selectedIndex;
     if (index === selectedIndex) {
       if (selectedIndex === cards.length - 1) {
         selectedIndex = cards.length - 2;
       }
     } else if (index < selectedIndex) {
       selectedIndex--;
     }
     cards.splice(index, 1);
     return {
       ...state,
       selectedIndex,
       cards
     };
   });
 }

 updateCardOrdering = (arg) => {
   this.setState(() => {
     return {
       numericOrdering: arg
     };
   });
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

 upadetCardStyling = (val) => {
   this.setState(state => {
     const cards = state.cards.map((card, i) => {
       return Object.assign({}, card, {
         cardAlign: getCardAlignment(val, i)
       });
     });
     return {
       ...state,
       cards,
       cardStyleMode: val
     };
   });
 }

 render () {
   const { selectedIndex, cards, numericOrdering, cardStyleMode } = this.state,
     { title, content, textAlign } = selectedIndex === null ? {
       title: '',
       content: '',
       textAlign: ''
     } : cards[selectedIndex];
   return (
     <>
       <Item.Infograph>
         {
           cards.map(({ id, title, content, textAlign, cardAlign }, index) =>
             <Card key={id} index={index} title={title}
               content={content} clicked={this.cardSelected}
               textAlign={textAlign} isLeftAligned={cardAlign === 'left'}
               selected={index === selectedIndex}
               addCard={this.addCard}
               deleteCard={this.deleteCard}
               isNumeric={numericOrdering} ></Card>)
         }
       </Item.Infograph>
       <Item.Editor>
         <div className='mx-3 my-3'>
           <div className='info-text-justify mb-2'>
             <span className='mr-2'>Ordering: &nbsp; </span>
             <ButtonGroup size='sm'>
               <Button active={numericOrdering === false} className='mr-1' style={numericOrdering === false ? ACTIVE : NON_ACTIVE} onClick={() => this.updateCardOrdering(false)}>
                 <FontAwesomeIcon icon={faList} />
               </Button>
               <Button active={numericOrdering === true} className='mr-1' style={numericOrdering === false ? NON_ACTIVE : ACTIVE} onClick={() => this.updateCardOrdering(true)}>
                 <FontAwesomeIcon icon={faListOl} />
               </Button>
             </ButtonGroup>
           </div>
           <div className='info-text-justify  mb-2'>
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
           <div className='info-text-justify  mb-2'>
             <span className='mr-2'>Card Style:</span>
             <ButtonGroup size='sm'>
               <Button active={cardStyleMode === 0} className='font-weight-bold text-alignment-btn' onClick={() => { this.upadetCardStyling(0); }}>
                 <FontAwesomeIcon icon={faAlignLeft} />
               </Button>
               <Button active={cardStyleMode === 1} className='font-weight-bold text-alignment-btn' onClick={() => { this.upadetCardStyling(1); }}>
                 <FontAwesomeIcon icon={faStream} />
               </Button>
               <Button active={cardStyleMode === 2} className='font-weight-bold text-alignment-btn' onClick={() => { this.upadetCardStyling(2); }}>
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
      <BaseItemIcon retContent={retContent} passContent={onClickFn} tooltext='Add step tool'>
        <FontAwesomeIcon icon={faStream} />
      </BaseItemIcon>
    );
  }
}

export {
  TagText,
  TagTextIcon
};
