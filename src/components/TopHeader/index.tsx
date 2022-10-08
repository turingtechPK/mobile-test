import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../config/colors';
import {RH, RW} from '../../config/style';
import {Images} from '../../constants/Images';

export default function TopHeader(props: any) {
  return (
    <View style={styles.root}>
      {props?.goback ? (
        <TouchableOpacity onPress={props?.onPress}>
          <Image source={Images?.Arrow} style={styles.arrow} />
        </TouchableOpacity>
      ) : (
        <Image source={Images?.Logo} style={styles.logo} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.barColor,
  },

  logo: {
    width: RW(55),
    height: RH(3),
  },
  arrow: {
    width: RW(5),
    height: RW(5),
  },
});
