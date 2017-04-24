//
// Touchable view, for listening to touch events, but not intercept them.
//
// Created by ywu on 15/9/22.
//

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  requireNativeComponent,
  View,
  Platform,
} from 'react-native';

import { convertCoordinate } from '../utils';

//
// ## <section id='MKTouchable'>MKTouchable</section>
//
class MKTouchable extends Component {

  // region property initializers
  _onTouchEvent = (event) => {
    if (this.props.onTouch) {
      const evt = event.nativeEvent;
      evt.x = convertCoordinate(evt.x);
      evt.y = convertCoordinate(evt.y);
      this.props.onTouch(evt);
    }
  };
  // endregion

  measure(cb) {
    return this.refs.node.measure(cb);
  }

  render() {
    if (Platform.OS !== 'web') {
      return (
        <NativeTouchable
          ref="node"
          {...this.props}
          style={this.props.style}
          onChange={this._onTouchEvent}
          onLayout={this.props.onLayout}
        >
          {this.props.children}
        </NativeTouchable>
      );
    } else {
      return (
        <View>
          {this.props.children}
        </View>
      );
    }
  }
}

// ## <section id='props'>Props</section>
MKTouchable.propTypes = {
  // [RN.View Props](https://facebook.github.io/react-native/docs/view.html#props)...
  ...View.propTypes,

  // Touch events callback
  onTouch: PropTypes.func,

  // FIXME `no propType for native prop` error on Android
  nativeBackgroundAndroid: PropTypes.object,
};

let NativeTouchable = null;
if ((typeof BROWSER_APP === 'undefined') || (typeof BROWSER_APP !== 'undefined' && !BROWSER_APP)) { 
  NativeTouchable = requireNativeComponent('MKTouchable', {
    name: 'MKTouchable',
    propTypes: MKTouchable.propTypes,
  }, {
    nativeOnly: {
      nativeBackgroundAndroid: true,
      nativeForegroundAndroid: true,
    },
  });
}

// ## Public interface
module.exports = MKTouchable;
