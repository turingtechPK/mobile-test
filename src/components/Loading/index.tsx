import React from 'react';
import {StatusBar, Text} from 'react-native';
import {ActivityIndicator, View} from 'react-native';
import colors from '../../config/colors';
interface Props {
  message?: String;
}
export default function Loading(props: Props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        barStyle="dark-content"
      />
      <ActivityIndicator color={colors.primary} />
      <Text style={{color: colors.primary, fontSize: 18, letterSpacing: 2}}>
        {props.message ? props.message : 'LOADING..'}
      </Text>
    </View>
  );
}
