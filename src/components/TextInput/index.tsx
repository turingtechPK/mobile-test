import {Input, View} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '../../config/colors';
import {RW} from '../../config/style';

interface Props {
  size?: string;
  placeholder?: string;
  variant?: string;
  error?: any;
  value?: string;
  onChangeText?: any;
  name?: string;
  secureTextEntery?: boolean;
}

function TextInput(props: Props) {
  return (
    <View style={styles?.Container}>
      <Input
        name={props?.name}
        colorScheme="indigo"
        variant={props?.variant ? props?.variant : 'outline'}
        size={props?.size ? props?.size : 'lg'}
        placeholder={props?.placeholder}
        mx="3"
        value={props?.value}
        onChangeText={props?.onChangeText}
        w={RW(95)}
        secureTextEntry={props?.secureTextEntery}
      />
      {props?.error && <Text style={styles.error}>{props?.error}</Text>}
    </View>
  );
}

export default TextInput;
const styles = StyleSheet.create({
  Container: {
    // width: RW(95),
    // alignSelf: 'center',
    marginTop: 20,
  },
  error: {
    color: colors.Warning,
    fontSize: 12,
    paddingTop: 4,
    alignSelf: 'center',
  },
});
