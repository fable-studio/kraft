/* eslint-disable */
import React, { Component } from 'react';

import './index.scss';

export class StarRating extends Component {
  render () {
    let { rating, numberOfStars, starSize, spaceBetweenStars, className, starStyle, starBgStyle } = this.props,
      percentStarsJSX = [],
      bgStarsJSX = [],
      space,
      i;

    for (i = 0, space = 0; i < numberOfStars; i++) {
      if (i > 0) {
        space = spaceBetweenStars
      }
      percentStarsJSX.push(
        <span key={i} className='star star-active' style={{ ...starStyle, marginLeft: space }}>
          ★
        </span>
      );
      bgStarsJSX.push(
        <span key={i} className='star star-bg' style={{ color: starBgStyle.backgroundColor, marginLeft: space }}>
          ★
        </span>
      )
    }
    return (
      <div className={className}>
        <div className='star-rating' style={{ fontSize: starSize }}>
          <div className='star-rating-percentage' style={{ width: (rating + '%') }}>
            {percentStarsJSX}
          </div>
          <div className='star-rating-background'>
            {bgStarsJSX}
          </div>
        </div>
      </div>
    );
  }
};

StarRating.defaultProps = {
  rating: 55,
  numberOfStars: 10,
  spaceBetweenStars: 0,
  starSize: 38,
  starStyle: {
    color: '#ffd83e'
  },
  starBgStyle: {
    backgroundColor: 'white'
  }
}