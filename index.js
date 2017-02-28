import React, { Component } from 'react';
import { createTransition } from 'react-native-transition';

import DefaultSplashView from './src/SplashView';
import DefaultErrorView from './src/ErrorView';

import PropsManager from './src/PropsManager';

// Create the transition to switch over to the main application view
const Transition = createTransition();

export default function (
  App,
  initializers = [],
  initialMessage = null,
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
    };

    setMessage = (message) => {
      this.setState({ message });
    }

    componentWillMount() {
      const propsManager = new PropsManager();

      // Start initializing all the initializers, with the message setter
      Promise.all(initializers.map(fn => fn(propsManager, this.setMessage))).then(() => {
        // All initializers started, start the main app view
        Transition.show(<App {...propsManager.getAllProps()} />);
      }).catch((err) => {
        Transition.show(<ErrorView error={err} />);
      });
    }

    render() {
      const { message } = this.state;

      return (
        <Transition>
          <SplashView icon={options.icon} header={options.header} message={message} />
        </Transition>
      );
    }
  };
}
