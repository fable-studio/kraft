/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStarHalfAlt, faStar
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';
import { Progress, Button, Input } from 'reactstrap';
import { StarRating } from '../StarRating';

import './rating.scss';
import { connect } from 'react-redux';

const clamp = (num, lower, upper) => Math.max(Math.min(num, upper), lower);
class RatingItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      type: 'progress',
      rating: props.rating
    };
  }

  btnClickHandler = (prop) => {
    return () => {
      this.setState({
        type: prop
      });
    }
  }

  onInputChangeHandler = e => {
    let rating = e.target.value;

    if (rating !== '') {
      rating = clamp(e.target.value, 0, 100)
    }
    this.setState({
      rating
    });
  }

  render () {
    let { rating, type } = this.state,
      { themes } = this.props,
      { themeList, curSelected } = themes,
      curTheme = themeList[curSelected],
      progressJSX;

    if (type === 'progress') {
      // progressJSX = <Progress className='h-50 w-100 rating' value={rating} max="100" />;
      progressJSX = (
        <div className="h-50 w-100 rating progress" style={{ ...curTheme.rating.background, marginTop: 5 }}>
          <div 
            className="progress-bar" 
            role="progressbar" 
            aria-valuenow="55" 
            aria-valuemin="0" 
            aria-valuemax="100" 
            style={{ ...curTheme.rating.progress, width: rating + '%', height: 30 }}
          ></div>
        </div>
      );
    } else if (type === 'progress-striped') {
      // progressJSX = <Progress striped className='h-50 w-100 rating' value={rating} max="100" />
      progressJSX = (
        <div className="h-50 w-100 rating progress" style={{ ...curTheme.rating.background, marginTop: 5 }}>
          <div 
            className="progress-bar progress-bar-striped" 
            role="progressbar" 
            aria-valuenow="55" 
            aria-valuemin="0" 
            aria-valuemax="100" 
            style={{ ...curTheme.rating['progress-striped'], width: rating + '%', height: 30 }}
          ></div>
        </div>
      );
    } else if (type === 'star') {
      progressJSX = (
        <StarRating
          spaceBetweenStars={1} 
          starSize={35} 
          rating={rating || 0} 
          className={'rating-container'} 
          starStyle={{ ...curTheme.rating.star }} 
          starBgStyle={{ ...curTheme.rating.background }} 
        />
      )
    }

    return (
      <>
        <Item.Infograph height={70}>
          <div className='h-100 d-flex flex-column mx-3 justify-content-center'>
            <div className='d-flex flex-row align-items-center' style={{ height: 60 }}>
              {progressJSX}
              <span style={{ fontSize: 40, marginLeft: 12, fontWeight: 'bolder', ...curTheme.text.header }}>{`${rating || 0}%`}</span>
            </div>
          </div>
        </Item.Infograph>
        <Item.Editor height={70}>
          <div className='h-100 d-flex flex-row align-items-center ml-2 mr-3'>
            <Button className='rating-editor-btn' onClick={this.btnClickHandler('progress')} >
              <Progress className='w-100' value='3' max='5' />
            </Button>
            <Button className='rating-editor-btn' onClick={this.btnClickHandler('progress-striped')} >
              <Progress striped className='w-100' value='3' max='5' />
            </Button>
            <Button className='rating-editor-btn rating-editor-star-btn' onClick={this.btnClickHandler('star')} >
              <FontAwesomeIcon className='abc' icon={faStar} />
              {/* <Progress striped className='w-100' value='3' max='5' /> */}
            </Button>
            <div className='ml-auto'>
              <div className='d-inline-block'>
                <span style={{ fontSize: 14 }}>Percentage</span>
                <Input className='rating-editor-input' type='number' value={rating} onChange={this.onInputChangeHandler} max={100} />
              </div>
              <div className='d-inline-block ml-1' style={{ fontSize: 45 }}>%</div>
            </div>
          </div>
        </Item.Editor>
      </>
    );
  }
}

RatingItem.defaultProps = {
  rating: 55
};

const mapStateToPropsRatingItem = state => {
  return {
    themes: state.themes
  };
};

const RatingItemHOC = connect(mapStateToPropsRatingItem)(RatingItem);

class RatingIcon extends Component {
  render () {
    const { content, onClickFn, maxLineWidth, count } = this.props,
      retContent = {
        task: {
          id: 'task-' + (count + 1),
          content: <RatingItemHOC content={content} maxLineWidth={maxLineWidth} />
        }
      };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn} id='sidebar-ratinf-btn' tooltext='Add rating'>
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
  RatingItemHOC
};
