import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';
const alphabetsCode = 65;

const Card = (props) => {
  const character = props.isNumeric ? String(props.index + 1) : String.fromCharCode(alphabetsCode + (props.index % 26)),
    curTheme = props.curTheme['tag-text'],
    indexDiv = (<div className="col-2 index" style={{ ...curTheme.orderText }}>
      <h1>{character}</h1>
    </div>),
    textDiv = (<div className="col" >
      <div className="card-body">
        <h5 className="card-title" style={{ ...curTheme.title }}>{props.title}</h5>
        <p className="card-text" style={{ ...curTheme.content }}>{props.content}</p>
      </div>
    </div>),
    styleDiv = (<div style={{ ...curTheme.orderText }}>
      &nbsp;
    </div>),
    order = props.isLeftAligned ? [indexDiv, textDiv, styleDiv] : [styleDiv, textDiv, indexDiv];
  return (<div className={'card card-view ' + (props.selected ? 'border-dark ' : '') + props.textAlign} onClick={() => props.clicked(props.index)}>
    <div className="row no-gutters">
      {
        order
      }
    </div>
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
