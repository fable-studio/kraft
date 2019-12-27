import React, { Component } from 'react';

export default class Avatar extends Component {
  render () {
    const { imageSrc, classNames, width, height } = this.props;
    return (
      <div className={classNames}>
        <img src={imageSrc} alt='avatar' className={'rounded-circle'} style={{ width, height }}/>
      </div>
    );
  }
}

Avatar.defaultProps = {
  classNames: '',
  width: 40,
  height: 40
};
