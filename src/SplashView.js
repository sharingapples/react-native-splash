import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function (options) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: options.backgroundColor || 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },

    heading: {
      color: options.headingColor || options.color || 'white',
      fontFamily: options.headingFont || options.messageFont || options.font,
      fontSize: options.headingSize || 24,
    },

    message: {
      color: options.color || 'white',
      fontFamily: options.messageFont || options.font,
      fontSize: options.messageSize || 18,
    },
  });

  return class SplashView extends Component {
    static propTypes = {
      message: PropTypes.string,
      header: PropTypes.string,
      icon: Image.propTypes.source,
    };

    static defaultProps = {
      message: '',
      header: null,
      icon: false,
    };

    render() {
      const { message, header, icon } = this.props;

      return (
        <View style={styles.container}>
          {icon && <Image source={icon} />}
          {header && <Text style={styles.heading}>{header}</Text>}
          <Text style={styles.message}>{message}</Text>
        </View>
      );
    }
  };
}
