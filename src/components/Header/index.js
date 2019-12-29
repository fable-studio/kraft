import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette, faEye
} from '@fortawesome/free-solid-svg-icons';

import './index.scss';
import { connect } from 'react-redux';

class Header extends Component {
  render () {
    return (
      <div className='info-body-header position-fixed w-100'>
        <Container>
          <Row>
            <Col xl='8' md='8' sm='8'>
              <div className='d-inline-block header-name-container h-100 float-left'>
                <span className='header-icon mx-2'><FontAwesomeIcon icon={faPalette} /></span>
                <span className='header-name'>
                  <span style={{ color: '#dd3b1f', fontFamily: 'Shadows Into Light Two, cursive'  }}>
                    <b>fable</b>
                  </span>
                  <span style={{ color: '#ebeff2', fontFamily: 'Oswald, sans-seriff'}}>Studio</span>
                </span>
              </div>
            </Col>
            <Col xl='4' md='4' sm='4'>
              <div className='d-inline-block float-right header-line-height preview-btn-container' style={{ width: 45, height: 45 }}>
                <Button active={this.props.preview === true} className='rounded-circle mr-2 preview-btn' onClick={this.props.togglePreview}><FontAwesomeIcon icon={faEye} /></Button>
                {/* <Avatar classNames=' float-right header-line-height' imageSrc={userDp} ></Avatar> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    preview: state.preview.preview
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePreview: () => { dispatch({ type: 'toggle' }); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
