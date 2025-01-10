import { Pressable, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Skeleton } from "moti/skeleton";
import dayjs from "dayjs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import { Colors } from "../../../styles/Color";

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
    { value: income, color: Colors.primary },
    { value: cogs, color: "#FFD23F" },
    { value: expense, color: "#4AC96D" },
  ];

  return (
    <View>
      <View style={{ gap: 10 }}>
        <View style={styles.header}>
          <Text style={[{ fontSize: 18, fontWeight: "500" }, TextProps]}>
            Profit & Loss
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <CustomFilter
              toggle={toggleFilter}
              filterAppear={
                startDate !== dayjs().month(0).date(1).format("YYYY-MM-DD") ||
                endDate !== dayjs().month(11).date(31).format("YYYY-MM-DD")
              }
              size={15}
            />

            <Pressable onPress={refetch} style={styles.refresh}>
              <MaterialCommunityIcons
                name="refresh"
                size={15}
                color={Colors.iconDark}
              />
            </Pressable>
          </View>
        </View>
        <Text style={[TextProps, { color: Colors.fontGrey }]}>
          {dayjs(startDate).format("DD MMM")} -{" "}
          {dayjs(endDate).format("DD MMM YY")}
        </Text>
        <View style={{ marginVertical: 10, alignItems: "center" }}>
          {income || cogs || expense || profit ? (
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
                    <Text style={{ fontSize: 10, color: Colors.fontDark }}>
                      compared to
                    </Text>
                    <Text style={{ fontSize: 10, color: Colors.fontDark }}>
                      {dayjs(startDate).format("DD MMM")} -{" "}
                      {dayjs(endDate).format("DD MMM YY")}
                    </Text>
                  </View>
                );
              }}
            />
          ) : (
            <EmptyPlaceholder text="No Data" />
          )}
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[TextProps, { textAlign: "left" }]}>Income</Text>
          <Text style={[TextProps]}>
            {currencyConverter.format(income || 0)}
          </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: Colors.borderGrey }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[TextProps, { textAlign: "left" }]}>COGS</Text>
          <Text style={[TextProps]}>{currencyConverter.format(cogs || 0)}</Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: Colors.borderGrey }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[TextProps, { textAlign: "left" }]}>Expense</Text>
          <Text style={[TextProps]}>
            {currencyConverter.format(expense || 0)}
          </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: Colors.borderGrey }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[TextProps, { textAlign: "left", fontWeight: "700" }]}>
            Profit
          </Text>
          <Text style={[TextProps, { fontWeight: "700" }]}>
            {currencyConverter.format(profit || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
  // !isLoading ?
  // : (
  //   <View style={{ marginHorizontal: 14 }}>
  //     <Skeleton width="100%" height={400} radius={20} {...SkeletonCommonProps} />
  //   </View>
  // );
};

export default ProfitLossCard;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  refresh: {
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
  },
});
