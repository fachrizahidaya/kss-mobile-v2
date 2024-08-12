import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Skeleton } from "moti/skeleton";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";

const SalesTrend = ({ data, isLoading, toggleFilter, date, refetch }) => {
  const screenWidth = Dimensions.get("window").width - 150;

  return !isLoading ? (
    <Pressable style={[card.card, { flex: 1, marginHorizontal: 14 }]}>
      <View style={{ gap: 20 }}>
        <View style={styles.header}>
          <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Sales Trend</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Pressable style={styles.wrapper} onPress={toggleFilter}>
              <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
            </Pressable>
            <Pressable onPress={refetch} style={styles.refresh}>
              <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <BarChart
            width={screenWidth}
            noOfSections={3}
            frontColor={"#377893"}
            barWidth={35}
            data={data}
            initialSpacing={45}
            yAxisTextStyle={{ color: "#3F434A" }}
            xAxisLabelTextStyle={{ color: "#3F434A" }}
            spacing={35}
            yAxisTextNumberOfLines={3}
            yAxisLabelWidth={50}
            yAxisColor={"#E8E9EB"}
            xAxisColor={"#E8E9EB"}
            barBorderTopRightRadius={5}
            barBorderTopLeftRadius={5}
            formatYLabel={(label) => {
              const labelVal = Number(label);
              if (labelVal >= 1000000000000) return (labelVal / 1000000000000).toFixed(0) + "T";
              if (labelVal >= 1000000000) return (labelVal / 1000000000).toFixed(0) + "B";
              if (labelVal >= 1000000) return (labelVal / 1000000).toFixed(0) + "M";
              if (labelVal >= 1000) return (labelVal / 1000).toFixed(0) + "K";
              return label;
            }}
          />
        </View>
      </View>
    </Pressable>
  ) : (
    <View style={{ marginHorizontal: 14 }}>
      <Skeleton width="100%" height={300} radius={20} {...SkeletonCommonProps} />
    </View>
  );
};

export default SalesTrend;

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
  refresh: {
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: "#E8E9EB",
  },
});
