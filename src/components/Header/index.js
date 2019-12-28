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
                <span className='header-name'><span style={{ color: '#004ab3' }}><b>Kraft</b></span>JS</span>
              </div>
            </Col>
            <Col xl='4' md='4' sm='4'>
              <div className='d-inline-block float-right header-line-height'>
                <Button className='rounded-circle mr-2' onClick={this.props.togglePreview}><FontAwesomeIcon icon={faEye} /></Button>
                {/* <Avatar classNames=' float-right header-line-height' imageSrc={userDp} ></Avatar> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    togglePreview: () => { dispatch({ type: 'toggle' }); }
  };
};

export default connect(null, mapDispatchToProps)(Header);
