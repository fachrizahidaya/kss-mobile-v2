import { Pressable, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Skeleton } from "moti/skeleton";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import dayjs from "dayjs";

const ProfitLossCard = ({
  income,
  cogs,
  expense,
  profit,
  percentage,
  converter,
  currencyConverter,
  isLoading,
  startDate,
  endDate,
  toggleFilter,
  refetch,
}) => {
  const data = [
    { value: income, color: "#377893" },
    { value: cogs, color: "#FFD23F" },
    { value: expense, color: "#4AC96D" },
  ];

  return !isLoading ? (
    <View>
      <View style={{ gap: 10 }}>
        <View style={styles.header}>
          <Text style={[{ fontSize: 18, fontWeight: "500" }, TextProps]}>Profit & Loss</Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Pressable style={styles.wrapper} onPress={toggleFilter}>
              <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
            </Pressable>
            <Pressable onPress={refetch} style={styles.refresh}>
              <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
            </Pressable>
          </View>
        </View>
        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <PieChart
            innerCircleBorderWidth={1}
            donut
            innerRadius={70}
            radius={90}
            data={data}
            centerLabelComponent={() => {
              return (
                <View style={{ alignItems: "center" }}>
                  <Text style={[TextProps]}>{percentage}%</Text>
                  <Text style={{ fontSize: 10, color: "#3F434A" }}>compared to</Text>
                  <Text style={{ fontSize: 10, color: "#3F434A" }}>
                    {dayjs(startDate).format("DD MMM")} - {dayjs(endDate).format("DD MMM YY")}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left" }]}>Income</Text>
          <Text style={[TextProps]}> {currencyConverter.format(income)} </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: "#E8E9EB" }} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left" }]}>COGS</Text>
          <Text style={[TextProps]}>{currencyConverter.format(cogs)} </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: "#E8E9EB" }} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left" }]}>Expense</Text>
          <Text style={[TextProps]}> {currencyConverter.format(expense)} </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: "#E8E9EB" }} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left", fontWeight: "700" }]}>Profit</Text>
          <Text style={[TextProps, { fontWeight: "700" }]}> {currencyConverter.format(profit)} </Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={{ marginHorizontal: 14 }}>
      <Skeleton width="100%" height={400} radius={20} {...SkeletonCommonProps} />
    </View>
  );
};

export default ProfitLossCard;

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
  content: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  refresh: {
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: "#E8E9EB",
  },
});
