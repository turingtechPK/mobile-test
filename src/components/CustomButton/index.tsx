import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button } from "native-base";
import { ColorSchemeType } from "native-base/lib/typescript/components/types";
interface Props {
  title: string;
  isLoading?: boolean;
  isLoadingText?: string;
  colorScheme?: ColorSchemeType;
  onPress?: () => {};
  size?: string;
  disabled?: boolean;
  variant?: string;
  width?: number;
}
export default function CustomButton(props: Props) {
  return (
    <View
      style={[
        styles?.buttonContainer,
        { width: props?.width ? props?.width : 150 },
      ]}
    >
      <Button
        size={props?.size ? props?.size : "md"}
        colorScheme={props?.colorScheme ? props?.colorScheme : "indigo"}
        onPress={props?.onPress}
        variant={props?.variant ? props?.variant : "solid"}
        disabled={props?.disabled}
        isLoading={props?.isLoading ? props?.isLoading : false}
        isLoadingText={
          props?.isLoadingText ? props?.isLoadingText : "Submitting"
        }
      >
        {props?.title}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    alignSelf: "center",
    marginTop: 10,
  },
});
