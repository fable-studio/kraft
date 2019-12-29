import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

export default class ColorPicker extends Component {
  constructor (props) {
    super(props);

    this.state = {
      color: props.color,
      displayColorPicker: false
    };
    this._propColor = props.color;
    this._stateColor = this.state.color;
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  }

  handleChange = (color) => {
    this.setState({ color: color.hex });
    this.props.onColorChange(color.hex);
  }

  componentDidUpdate () {
    if (this.state.color === this._stateColor && this.props.color !== this._propColor) {
      this._propColor = this.props.color;
      this.setState({
        color: this._propColor
      });
    }

    this._stateColor = this.state.color;
  }

  render () {
    const { height, width } = this.props;

    const styles = {
      color: {
        width: width + 'px',
        height: height + 'px',
        borderRadius: '2px',
        background: this.state.color
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2000'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    };

    return (
      <div className={this.props.className}>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker
          ? (
            <div style={ styles.popover }>
              <div style={ styles.cover } onClick={ this.handleClose }/>
              <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
            </div>
          ) : null
        }
      </div>
    );
  }
};

ColorPicker.defaultProps = {
  onColorChange: () => {},
  color: '#ff0000',
  className: '',
  width: 36,
  height: 14
};
