import {Input, View} from 'native-base';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import colors from '../../config/colors';
import {RW} from '../../config/style';
import {Images} from '../../constants/Images';

interface Props {
  src?: string;
  title?: string;
}

function Logo(props: Props) {
  return (
    <View style={styles?.Container}>
      <Image source={Images.TLogo} style={styles?.logo} />
      <Text>{props?.title}</Text>
    </View>
  );
}

export default Logo;
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '50%',
    height: '50%',
  },
});
