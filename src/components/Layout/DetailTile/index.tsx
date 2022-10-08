import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import moment from "moment";
import colors from "../../../config/colors";
import fontSize from "../../../config/fontSize";
import CustomButton from "../../CustomButton";

interface Props {
  details?: any;
  changeStatus?: () => {};
}
export default function Detailtile(props: Props) {
  return (
    <View style={styles.RootContainer}>
      <View style={styles.Row}>
        <Text style={styles.title}>From:</Text>
        <Text
          style={[
            styles.callType,
            {
              color:
                props?.details?.call_type == "missed"
                  ? colors.Warning
                  : props?.details?.call_type == "voicemail"
                  ? colors.primary
                  : props?.details?.call_type == "answered"
                  ? colors.success
                  : colors.info,
            },
          ]}
        >
          {props?.details?.call_type}
        </Text>
      </View>

      <Text style={styles.value}>{props?.details?.from}</Text>
      <Text style={styles.title}>To:</Text>
      <Text style={styles.value}>{props?.details?.to}</Text>
      <Text style={styles.title}>Via:</Text>
      <Text style={styles.value}>{props?.details?.via}</Text>
      <Text style={styles.title}>Duration:</Text>
      <Text style={styles.value}>
        {Math?.floor(props?.details?.duration / 60)} mins
        {Math?.floor(props?.details?.duration % 60)} secs
      </Text>
      <Text style={styles.title}>Created At:</Text>
      <Text style={styles.created}>
        {moment(props?.details?.created_at).format("ll")}
      </Text>
      <Text style={styles.title}>Status:</Text>
      <View style={styles.Row}>
        <Text style={[styles.value, { color: colors.info }]}>
          {props?.details?.is_archived ? "Archived" : "Not Archived"}
        </Text>
        <CustomButton
          size="xs"
          width={100}
          variant="subtle"
          colorScheme={"info"}
          onPress={props?.changeStatus}
          title={!props?.details?.is_archived ? "Archive" : "UnArchive"}
        />
      </View>

      <Text style={styles.title}>Notes:</Text>
      {props?.details?.notes?.map((e: any, index: number) => (
        <Text style={styles.value} key={index}>
          {index + 1}.{e.content}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  RootContainer: {
    // width: '97%',
    padding: 10,
    // margin: 5,
    // flex: 1,
    // backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize.Normal,
    color: colors.black,
    fontWeight: "bold",
    marginTop: 10,
  },
  created: {
    color: colors.EditColor,
    fontSize: fontSize.Normal,
  },
  status: {
    color: colors.info,
    fontSize: fontSize.Normal,
  },
  value: {
    fontSize: fontSize.Normal,
    color: colors.black,
  },
  callType: {
    fontSize: fontSize.Normal,
    color: colors.success,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  Row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
