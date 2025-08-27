import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { Colors } from "../../../styles/Color";

const SalesAndCustomerCard = ({
  customer_qty,
  customerIsLoading,
  invoiceIsLoading,
  total_sales,
  currencyConverter,
  monthlySalesPercentage,
  monthlyCustomerPercentage,
}) => {
  const { width } = Dimensions.get("screen");

  const dataArr = [
    {
      title: "Total Sales",
      value: currencyConverter.format(total_sales),
      icon: "signal-cellular-3",
      progressIcon:
        monthlySalesPercentage < 0
          ? "arrow-down-thin"
          : monthlySalesPercentage == 0
          ? "equal"
          : "arrow-up-thin",
      progressIconColor:
        monthlySalesPercentage < 0
          ? "#FD7972"
          : monthlySalesPercentage == 0
          ? Colors.fontGrey
          : "#49C96D",
      progressPercentage: Math.abs(monthlySalesPercentage).toFixed(0) + "%",
    },
    {
      title: "Total Customer",
      value: new Intl.NumberFormat("id-ID").format(customer_qty),
      icon: "account-outline",
      progressIcon:
        monthlyCustomerPercentage < 0
          ? "arrow-down-thin"
          : monthlyCustomerPercentage == 0
          ? "equal"
          : "arrow-up-thin",
      progressIconColor:
        monthlyCustomerPercentage < 0
          ? "#FD7972"
          : monthlyCustomerPercentage == 0
          ? Colors.fontGrey
          : "#49C96D",
      progressPercentage: Math.abs(monthlyCustomerPercentage).toFixed(0) + "%",
    },
  ];

  return (
    <View style={styles.container}>
      <Pressable style={[card.card, styles.content]}>
        <View style={{ gap: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <Text style={[TextProps, { color: Colors.fontGrey }]}>
              {dataArr[0].title}
            </Text>
            <View style={{ backgroundColor: "#fff4ee", borderRadius: 20, padding: 10 }}>
              <MaterialCommunityIcons name={dataArr[0].icon} size={20} color="#FF965D" />
            </View>
          </View>

          <Text style={[TextProps]}>{dataArr[0].value}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name={dataArr[0].progressIcon}
              size={20}
              color={dataArr[0].progressIconColor}
            />

            <Text style={[TextProps, { color: dataArr[0].progressIconColor }]}>
              {dataArr[0].progressPercentage}
            </Text>
          </View>
        </View>
      </Pressable>

      <Pressable style={[card.card, styles.content]}>
        <View style={{ gap: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <Text style={[TextProps, { color: Colors.fontGrey }]}>
              {dataArr[1].title}
            </Text>
            <View style={{ backgroundColor: "#fff4ee", borderRadius: 20, padding: 10 }}>
              <MaterialCommunityIcons name={dataArr[1].icon} size={20} color="#FF965D" />
            </View>
          </View>

          <Text style={[TextProps]}>{dataArr[1].value}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name={dataArr[1].progressIcon}
              size={20}
              color={dataArr[1].progressIconColor}
            />

            <Text style={[TextProps, { color: dataArr[1].progressIconColor }]}>
              {dataArr[1].progressPercentage}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default SalesAndCustomerCard;

const styles = StyleSheet.create({
  container: {
    height: 160,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
