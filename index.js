import React, { Component } from 'react';
import Transition, { Flip } from 'react-native-transition';

import DefaultSplashView from './src/SplashView';
import DefaultErrorView from './src/ErrorView';

export default function (
  App,
  initializers = [],
  initialMessage = {},
  options = {},
  CustomSplashView = null,
  CustomErrorView = null
) {
  const SplashView = CustomSplashView || DefaultSplashView(options);
  const ErrorView = CustomErrorView || DefaultErrorView(options);

  return class Splash extends Component {
    state = {
      message: initialMessage,
      initialized: false,
      error: null,
      children: [],
    };

    setMessage = (message) => {
      this.setState({ message });
    }

    componentWillMount() {
      // Start initializing all the initializers, with the message setter
      Promise.all(initializers.map(fn => fn(this.setMessage))).then(() => {
        // All initializers started, start the main app view
        this._transition.add(<App />, { style: Flip });
      }).catch((err) => {
        this._transition.add(<ErrorView error={err} />, { style: Flip });
      });
    }

    render() {
      const { message } = this.state;

      return (
        <Transition ref={(node) => { this._transition = node; }} duration={1000}>
          <SplashView icon={options.icon} header={options.header} message={message} />
        </Transition>
      );
    }
  };
}
