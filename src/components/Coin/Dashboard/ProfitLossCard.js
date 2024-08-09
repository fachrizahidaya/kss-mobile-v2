import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SheetManager } from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import CustomDateTimePicker from "../../../styles/CustomDateTimePicker";

const ProfitLossCard = ({
  currencyConverter,
  income,
  cogs,
  expense,
  profit,
  percentage,
  previousYear,
  selectedYear,
  converter,
}) => {
  const data = [
    { value: income, color: "#FF965D" },
    { value: cogs, color: "#377893" },
    { value: expense, color: "#fd7972" },
  ];

  return (
    <Pressable style={[card.card, { flex: 1, gap: 5 }]}>
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Profit & Loss</Text>

          <Pressable
            style={styles.wrapper}
            onPress={() =>
              SheetManager.show("form-sheet", {
                payload: {
                  children: (
                    <View style={styles.content}>
                      <View style={{ gap: 5 }}>
                        <CustomDateTimePicker
                          unlimitStartDate={true}
                          width="100%"
                          //   defaultValue={startDate ? startDate : null}
                          //   onChange={startDateChangeHandler}
                          title="Begin Date"
                        />
                      </View>
                      <View style={{ gap: 5 }}>
                        <CustomDateTimePicker
                          unlimitStartDate={true}
                          width="100%"
                          //   defaultValue={startDate ? startDate : null}
                          //   onChange={startDateChangeHandler}
                          title="End Date"
                        />
                      </View>
                    </View>
                  ),
                },
              })
            }
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialCommunityIcons name="tune-variant" size={20} color="#3F434A" />
            </View>
          </Pressable>
        </View>
        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <PieChart
            innerCircleBorderWidth={1}
            donut
            innerRadius={50}
            radius={90}
            data={data}
            centerLabelComponent={() => {
              return (
                <View style={{ alignItems: "center" }}>
                  <Text style={[TextProps]}>{percentage}%</Text>
                  <Text style={{ fontSize: 10, color: "#3F434A" }}>compared to {previousYear}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left" }]}>Income</Text>
          <Text style={[TextProps]}> {converter(income)} </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: "#E8E9EB" }} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left" }]}>COGS</Text>
          <Text style={[TextProps]}>{converter(cogs)} </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: "#E8E9EB" }} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left" }]}>Expense</Text>
          <Text style={[TextProps]}> {converter(expense)} </Text>
        </View>
        <View style={{ borderWidth: 0.8, borderColor: "#E8E9EB" }} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { textAlign: "left" }]}>Profit</Text>
          <Text style={[TextProps]}> {converter(profit)} </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProfitLossCard;

const styles = StyleSheet.create({
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
});
