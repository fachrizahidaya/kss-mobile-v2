import { View, Text, StyleSheet } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";

const AttendanceColor = () => {
  const listIcons = [
    { key: "allGood", color: "#EDEDED", name: "All Good" },
    { key: "reportRequired", color: "#FDC500", name: "Report Required" },
    { key: "submittedReport", color: "#186688", name: "Submitted Report" },
    { key: "dayOff", color: "#3BC14A", name: "Day Off/Holiday" },
    { key: "leave", color: "#F97316", name: "Leave" },
    { key: "sick", color: "#D6293A", name: "Sick" },
  ];

  return (
    <View style={styles.container}>
      {listIcons.map((item) => {
        return (
          <View key={item?.key} style={styles.content}>
            <MaterialCommunityIcons name="circle" color={item.color} size={15} />
            <Text style={[{ fontSize: 12 }, TextProps]}>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default AttendanceColor;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
});
