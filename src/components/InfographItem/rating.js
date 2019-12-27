/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStarHalfAlt, faStar
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';
import { Progress, Button } from 'reactstrap';
import { StarRating } from '../StarRating';


import './rating.scss';

class RatingItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      rating: props.rating
    };
  }

  btnClickHandler = () => {

  }

  render () {
    let { rating } = this.state;

    return (
      <>
        <Item.Infograph height={70}>
          <div className='h-100 d-flex flex-column mx-3 justify-content-center'>
            <div className='d-flex flex-row align-items-center'>
              <Progress striped animated className='h-50 w-100 rating' value={rating} max="100" />
              {/* <StarRating className={'rating-container'} /> */}
              <span style={{ fontSize: 40, marginLeft: 12}}>{`${rating}%`}</span>
            </div>
          </div>
        </Item.Infograph>
        <Item.Editor height={70}>
          <div className='h-100 d-flex flex-column justify-content-center mx-2'>
            <div>
              <Button className='rating-editor-btn' >
                <Progress className='w-100' value='3' max='5' />
              </Button>
              <Button className='rating-editor-btn' >
                <Progress striped className='w-100' value='3' max='5' />
              </Button>
              <Button className='rating-editor-btn' >
                <Progress striped animated className='w-100' value='3' max='5' />
              </Button>
              <Button className='rating-editor-btn rating-editor-star-btn' >
                <FontAwesomeIcon className='abc' icon={faStar} />
                {/* <Progress striped className='w-100' value='3' max='5' /> */}
              </Button>
            </div>
          </div>
        </Item.Editor>
      </>
    );
  }
}

RatingItem.defaultProps = {
  rating: 55
}

class RatingIcon extends Component {
  render () {
    const { content, onClickFn, maxLineWidth, count } = this.props,
      retContent = {
        task: {
          id: 'task-' + (count + 1),
          content: <RatingItem content={content} maxLineWidth={maxLineWidth} />
        }
      };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faStarHalfAlt} />
      </BaseItemIcon>
    );
  }
}

RatingIcon.defaultProps = {
  content: 'Inset chart here',
  onClickFn: () => {}
};

export {
  RatingIcon,
  RatingItem
};
