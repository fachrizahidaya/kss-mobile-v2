import { Fragment, memo } from "react";

import { View } from "react-native";
import AttendanceColor from "./AttendanceColor";
import { Colors } from "../../../styles/Color";

const AttendanceCalendar = ({ renderCalendar }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.secondary,
        marginHorizontal: 16,
        marginVertical: 14,
        borderRadius: 10,
      }}
    >
      <Fragment>{renderCalendar()}</Fragment>
      <AttendanceColor />
    </View>
  );
};

export default memo(AttendanceCalendar);
