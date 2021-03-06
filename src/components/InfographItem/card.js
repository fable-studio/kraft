import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './card.scss';
const alphabetsCode = 65;

const Card = (props) => {
  const character = props.isNumeric ? String(props.index + 1) : String.fromCharCode(alphabetsCode + (props.index % 26)),
    selectedClasses = 'shadow border-dark ',
    { themeList, curSelected } = props.themes,
    curTheme = themeList[curSelected]['tag-text'],
    orderedEle = props.isLeftAligned
      ? (<div className="row no-gutters">
        <div className="col-2 index" style={{ ...curTheme.orderText }}>
          <h1>{character}</h1>
        </div>
        <div className="col" >
          <div className="card-body">
            <h5 className="card-title" style={{ ...curTheme.title }}>{props.title}</h5>
            <p className="card-text" style={{ ...curTheme.content }}>{props.content}</p>
          </div>
        </div>
        <div style={{ ...curTheme.orderText }}>
          &nbsp;
        </div>
      </div>)
      : (<div className="row no-gutters">
        <div style={{ ...curTheme.orderText }}>
          &nbsp;
        </div>
        <div className="col" >
          <div className="card-body">
            <h5 className="card-title" style={{ ...curTheme.title }}>{props.title}</h5>
            <p className="card-text" style={{ ...curTheme.content }}>{props.content}</p>
          </div>
        </div>
        <div className="col-2 index" style={{ ...curTheme.orderText }}>
          <h1>{character}</h1>
        </div>
      </div>);
  return (<div style={{ ...curTheme.background }} className={'card card-view ' + (props.selected && !props.preview ? selectedClasses : 'border-0 ') + props.textAlign} onClick={() => props.clicked(props.index)}>
    {
      orderedEle
    }
    <div style={{ display: props.preview ? 'none' : '' }} className='position-absolute rounded-circle card-delete-button' onClick={(e) => props.deleteCard(props.index, e)}>
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
    <div style={{ display: props.preview ? 'none' : '' }} className='position-absolute rounded-circle card-add-button' onClick={(e) => props.addCard(props.index, e)}>
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <FontAwesomeIcon icon={faPlus} />
      </span>
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

const mapStateToPropsCard = state => {
  return {
    preview: state.preview.preview,
    themes: state.themes
  };
};

const CardHOC = connect(mapStateToPropsCard)(Card);

export default CardHOC;
