import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import LoadingBar from "./LoadingBar";
import Button from "../../../styles/forms/Button";
import { Colors } from "../../../styles/Color";

const SalesAndPurchaseCard = ({
  currencyConverter,
  converter,
  income,
  todayIncome,
  paid_income,
  unpaid_income,
  underduePayment_income,
  overduePayment_income,
  purchase,
  paid_purchase,
  unpaid_purchase,
  underduePayment_purchase,
  overduePayment_purchase,
  todayPurchase,
  salesIsLoading,
  purchaseIsLoading,
  handleToggleFilter,
  handlePurchaseToggleFilter,
  refetchSales,
  refetchPurchase,
  buttons,
  selected,
  startDate,
  endDate,
}) => {
  // const getDateBasedOnMonth = (monthYear) => {
  //   const inputDate = dayjs(monthYear);
  //   const currentDate = dayjs();

  //   if (inputDate.isBefore(currentDate, "month")) {
  //     return inputDate.endOf("month").format("DD MMM YY");
  //   } else if (inputDate.isSame(currentDate, "month")) {
  //     return currentDate.format("DD MMM YY");
  //   } else {
  //     return inputDate.startOf("month").format("DD MMM YY");
  //   }
  // };

  return (
    <View style={{ gap: 10 }}>
      <Text style={[TextProps, { fontWeight: "500", fontSize: 18 }]}>Sales & Purchase</Text>
      <View style={styles.buttonWrapper}>
        {buttons?.map((item, index) => {
          return (
            <Button
              key={index}
              flex={1}
              backgroundColor={selected === item.value ? Colors.primary : Colors.backgroundLight}
              onPress={item.onPress}
            >
              <Text
                style={[
                  TextProps,
                  {
                    color: selected === item.value ? Colors.fontLight : Colors.fontDark,
                    fontSize: 16,
                    fontWeight: "500",
                  },
                ]}
              >
                {item.title}
              </Text>
            </Button>
          );
        })}
      </View>
      {selected === "sales" ? (
        !salesIsLoading ? (
          <Pressable style={{ flex: 1 }}>
            <View style={{ gap: 10 }}>
              <View style={styles.header}>
                {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Pressable style={styles.wrapper} onPress={handleToggleFilter}>
                    <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
                  </Pressable>
                  <Pressable onPress={refetchSales} style={styles.refresh}>
                    <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
                  </Pressable>
                </View> */}
              </View>
              <View style={styles.header}>
                <Text style={[TextProps, { color: Colors.fontGrey }]}>
                  {dayjs(startDate).format("DD MMM")} - {dayjs(endDate).format("DD MMM YY")}
                </Text>
                <Text style={[TextProps]}>{currencyConverter.format(income || 0)}</Text>
              </View>
              <View>
                <View style={styles.header}>
                  <Text style={[TextProps, { color: Colors.fontGrey }]}>Paid</Text>
                  <Text style={[TextProps, { color: Colors.fontGrey }]}>Unpaid</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={[TextProps]}>{currencyConverter.format(paid_income || 0)}</Text>
                  <Text style={[TextProps]}>{currencyConverter.format(unpaid_income || 0)}</Text>
                </View>
              </View>

              <LoadingBar total={income} paid={paid_income} unpaid={unpaid_income} />
              <View style={styles.header}>
                <Text style={[TextProps, { color: Colors.fontGrey }]}>Today</Text>
                <Text style={[TextProps]}>{currencyConverter.format(todayIncome || 0)}</Text>
              </View>
              <View>
                <View style={styles.header}>
                  <Text style={[TextProps, { color: Colors.fontGrey }]}>Underdue</Text>
                  <Text style={[TextProps, { color: Colors.fontGrey }]}>Overdue</Text>
                </View>
                <View style={styles.header}>
                  <Text style={[TextProps]}>{currencyConverter.format(underduePayment_income || 0)}</Text>
                  <Text style={[TextProps]}>{currencyConverter.format(overduePayment_income || 0)}</Text>
                </View>
              </View>
              <LoadingBar
                total={todayIncome}
                paid={underduePayment_income}
                unpaid={overduePayment_income}
                asToday={true}
              />
            </View>
          </Pressable>
        ) : (
          <Skeleton width="100%" height={300} radius={20} {...SkeletonCommonProps} />
        )
      ) : !purchaseIsLoading ? (
        <Pressable style={{ flex: 1 }}>
          <View style={{ gap: 10 }}>
            <View style={styles.header}>
              {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Pressable style={styles.wrapper} onPress={handlePurchaseToggleFilter}>
                  <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
                </Pressable>
                <Pressable onPress={refetchPurchase} style={styles.refresh}>
                  <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
                </Pressable>
              </View> */}
            </View>
            <View style={styles.header}>
              <Text style={[TextProps, { color: Colors.fontGrey }]}>
                {dayjs(startDate).format("DD MMM")} - {dayjs(endDate).format("DD MMM YY")}
              </Text>
              <Text style={[TextProps]}>{currencyConverter.format(purchase || 0)}</Text>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={[TextProps, { color: Colors.fontGrey }]}>Paid</Text>
                <Text style={[TextProps, { color: Colors.fontGrey }]}>Unpaid</Text>
              </View>
              <View style={styles.header}>
                <Text style={[TextProps]}>{currencyConverter.format(paid_purchase || 0)}</Text>
                <Text style={[TextProps]}>{currencyConverter.format(unpaid_purchase || 0)}</Text>
              </View>
            </View>
            <LoadingBar total={purchase} paid={paid_purchase} unpaid={unpaid_purchase} />
            <View style={styles.header}>
              <Text style={[TextProps, { color: Colors.fontGrey }]}>Today</Text>
              <Text style={[TextProps]}>{currencyConverter.format(todayPurchase || 0)}</Text>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={[TextProps, { color: Colors.fontGrey }]}>Underdue</Text>
                <Text style={[TextProps, { color: Colors.fontGrey }]}>Overdue</Text>
              </View>
              <View style={styles.header}>
                <Text style={[TextProps]}>{currencyConverter.format(underduePayment_purchase || 0)}</Text>
                <Text style={[TextProps]}>{currencyConverter.format(overduePayment_purchase || 0)}</Text>
              </View>
            </View>
            <LoadingBar
              total={todayPurchase}
              paid={underduePayment_purchase}
              unpaid={overduePayment_purchase}
              asToday={true}
            />
          </View>
        </Pressable>
      ) : (
        <Skeleton width="100%" height={300} radius={20} {...SkeletonCommonProps} />
      )}
    </View>
  );
};

export default SalesAndPurchaseCard;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
  refresh: {
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
  },
  buttonWrapper: {
    flexDirection: "row",
    borderRadius: 12,
  },
});
