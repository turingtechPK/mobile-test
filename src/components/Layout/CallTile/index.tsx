import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import moment from "moment";
import colors from "../../../config/colors";
import fontSize from "../../../config/fontSize";

interface Props {
  from?: string;
  to?: string;
  via?: string;
  duration: number;
  call_type?: String;
  notes?: [];
  is_archived?: boolean;
  direction?: string;
  created_at?: string;
  onPress?: () => void;
}
export default function Calltile(props: Props) {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      activeOpacity={0.7}
      style={styles?.RootContainer}
    >
      <View>
        <Text style={styles.title}>
          From : {props?.from} To : {props?.to}
        </Text>
        <Text style={styles.title}>Via : {props?.via}</Text>
        {/* let minutes = ~~(seconds / 60); let extraSeconds = seconds % 60; */}
        <Text style={styles.title}>
          Duration: {Math?.floor(props?.duration / 60)} mins
          {Math?.floor(props?.duration % 60)} secs
        </Text>
        <Text style={styles.title}>Notes : ({props?.notes?.length})</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.status}>
          {props?.is_archived ? "Archived" : "Not Archived"}
        </Text>
        <Text style={[styles.title, { fontSize: fontSize.ExtraSmall }]}>
          {props?.direction}
        </Text>
        <Text style={styles.created}>
          {moment(props?.created_at).format("ll")}
        </Text>

        <Text
          style={[
            styles.callType,
            {
              color:
                props?.call_type == "missed"
                  ? colors.Warning
                  : props?.call_type == "voicemail"
                  ? colors.primary
                  : props?.call_type == "answered"
                  ? colors.success
                  : colors.info,
              borderColor:
                props?.call_type == "missed"
                  ? colors.Warning
                  : props?.call_type == "voicemail"
                  ? colors.primary
                  : props?.call_type == "answered"
                  ? colors.success
                  : colors.info,
            },
          ]}
        >
          {props?.call_type}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  RootContainer: {
    width: "97%",
    padding: 10,
    margin: 5,
    borderRadius: 7,
    overflow: "hidden",
    borderColor: colors.EditColor,
    borderWidth: 1,
    marginTop: 5,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fontSize.Small,
    color: colors.black,
  },
  created: {
    color: colors.EditColor,
    fontSize: fontSize.ExtraSmall,
  },
  status: {
    color: colors.info,
    fontSize: fontSize.ExtraSmall,
  },
  callType: {
    fontSize: fontSize.Small,
    color: colors.success,
    fontWeight: "bold",
    borderColor: colors.black,
    borderWidth: 0.5,
    padding: 3,
    overflow: "hidden",
    borderRadius: 3,
    marginTop: 3,
    textTransform: "uppercase",
  },
});
