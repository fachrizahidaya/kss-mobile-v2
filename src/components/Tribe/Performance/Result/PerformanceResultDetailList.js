import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../shared/CustomStylings";

const PerformanceResultDetailList = ({ dayjs, begin_date, end_date, name, type }) => {
  return (
    <View style={styles.wrapper}>
      <View style={{ gap: type === "personal" ? null : 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[{ width: "45%", overflow: "hidden" }, TextProps]} numberOfLines={1} ellipsizeMode="tail">
            {type === "personal" ? "" : name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={[{ opacity: 0.5 }, TextProps]}>
              {begin_date
                ? type === "personal"
                  ? dayjs(begin_date).format("DD MMM YYYY")
                  : dayjs(begin_date).format("DD MMM YYYY")
                : "-"}{" "}
              to
            </Text>
            <Text style={[{ opacity: 0.5 }, TextProps]}>
              {end_date
                ? type === "personal"
                  ? dayjs(end_date).format("DD MMM YYYY")
                  : dayjs(end_date).format("DD MMM YYYY")
                : "-"}
            </Text>
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default PerformanceResultDetailList;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
  },
});
