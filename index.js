import React, { Component } from 'react';
import DefaultSplashView from './src/SplashView';
import DefaultErrorView from './src/ErrorView';

import ViewTransition from './ViewTransition';

const Transition = require('react-native-transition')();

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
        console.log('Initialized');
        // All initializers started, start the main app view
        // Transition.push(<App />);

        this.setState({
          initialized: true,
        });

        //this._view.show(<App />);
        // this.setState({
        //   initialized: true,
        // });
      }).catch((err) => {
        // this.setState({
        //   error: err,
        // });
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.initialized !== this.state.initialized) {
        return true;
      }

      // If the app has already been initialized, it is not required to update the
      // splash in any case. (Might happen due the the setMessage callback passed
      // to the initializers)
      if (this.state.initialized) {
        return false;
      }

      return true;
    }

    render() {
      const { message, initialized } = this.state;

      const child = initialized ? <App /> : <SplashView icon={options.icon} header={options.header} message={message} />;
      console.log('Rendering', initialized);
      return (
        <Transition>
          {child}
        </Transition>
      );
      // const { initialized, error, message } = this.state;

      // // In case app is initialized, just render the app
      // if (initialized) {
      //   return <App />;
      // }

      // // In case of an error, display the error message
      // if (error) {
      //   return <ErrorView error={error} />;
      // }

      // // Display the splash screen with the message
      // return <SplashView icon={options.icon} header={options.header} message={message} />;
    }
  };
}
