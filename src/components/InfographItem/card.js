import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

const Card = (props) => {
  const indexDiv = (<div className="col-2 index">
      <h1>A</h1>
    </div>),
    textDiv = (<div className="col-10" >
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
      </div>
    </div>),
    order = props.isLeftAligned ? [indexDiv, textDiv] : [textDiv, indexDiv];
  return (<div className="card card-view">
    <div className="row no-gutters">
      {
        order
      }
    </div>
    <span
      className={'position-absolute font-weight-bold'}
      style={{ right: 5, top: -5, cursor: 'pointer' }}
      onClick={props.deleteCard()}
    >
    x
    </span>
  </div>);
};

Card.defaultProps = {
  title: 'Tokyo',
  content: 'Tokyo is the capital of Japan',
  isLeftAligned: false,
  deleteCard: () => {}
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isLeftAligned: PropTypes.bool,
  deleteCard: PropTypes.func
};

export default Card;
