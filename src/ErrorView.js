import React, { PropTypes } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function (options) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: options.backgroundColor || 'black',
    },

    heading: {
      fontSize: options.errroHeadingSize || options.headingSize || 24,
      fontFamily: options.errorHeadingFont || options.errorFont || options.headingFont
                      || options.messageFont || options.font,
      color: options.errroHeadingColor || options.errorColor || options.headingColor || options.color || 'white',
    },

    message: {
      fontSize: options.errorMessageSize || options.messageSize || 16,
      fontFamily: options.errorMessageFont || options.errorFont || options.messageFont
                      || options.font,
      color: options.errorMessageColor || options.errorColor || options.color || 'white',
    },
  });

  const ErrorView = ({ error }) => (
    <View style={styles.container}>
      {error.icon && <Image source={error.icon} />}
      {error.title && <Text style={styles.heading}>{error.title}</Text>}
      <Text style={styles.message}>{error.message}</Text>
    </View>
  );

  ErrorView.propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
      icon: Image.propTypes.source,
      title: PropTypes.string,
    }).isRequired,
  };

  return ErrorView;
}
