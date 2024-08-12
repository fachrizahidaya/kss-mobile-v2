import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import LoadingBar from "../shared/LoadingBar";

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
  salesDate,
  purchaseDate,
  refetchSales,
  refetchPurchase,
}) => {
  const getDateBasedOnMonth = (monthYear) => {
    const inputDate = dayjs(monthYear);
    const currentDate = dayjs();

    if (inputDate.isBefore(currentDate, "month")) {
      return inputDate.endOf("month").format("DD MMM YY");
    } else if (inputDate.isSame(currentDate, "month")) {
      return currentDate.format("DD MMM YY");
    } else {
      return inputDate.startOf("month").format("DD MMM YY");
    }
  };

  return (
    <View style={styles.container}>
      {!salesIsLoading ? (
        <Pressable style={[card.card, { flex: 1 }]}>
          <View style={{ gap: 10 }}>
            <View style={styles.header}>
              <Text style={[TextProps, { fontWeight: "500", fontSize: 18 }]}>Sales</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Pressable style={styles.wrapper} onPress={handleToggleFilter}>
                  <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
                </Pressable>
                <Pressable onPress={refetchSales} style={styles.refresh}>
                  <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
                </Pressable>
              </View>
            </View>
            <View style={styles.header}>
              <Text style={[TextProps, { color: "#8A9099" }]}>
                {dayjs(salesDate).startOf("month").format("DD MMM")} - {getDateBasedOnMonth(salesDate)}
              </Text>
              <Text style={[TextProps]}>{currencyConverter.format(income)}</Text>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={[TextProps, { color: "#8A9099" }]}>Paid</Text>
                <Text style={[TextProps, { color: "#8A9099" }]}>Unpaid</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[TextProps]}>{currencyConverter.format(paid_income)}</Text>
                <Text style={[TextProps]}>{currencyConverter.format(unpaid_income)}</Text>
              </View>
            </View>

            <LoadingBar total={income} paid={paid_income} unpaid={unpaid_income} />
            <View style={styles.header}>
              <Text style={[TextProps, { color: "#8A9099" }]}>Today</Text>
              <Text style={[TextProps]}>{currencyConverter.format(todayIncome)}</Text>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={[TextProps, { color: "#8A9099" }]}>Underdue</Text>
                <Text style={[TextProps, { color: "#8A9099" }]}>Overdue</Text>
              </View>
              <View style={styles.header}>
                <Text style={[TextProps]}>{currencyConverter.format(underduePayment_income)}</Text>
                <Text style={[TextProps]}>{currencyConverter.format(overduePayment_income)}</Text>
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
      )}

      {!purchaseIsLoading ? (
        <Pressable style={[card.card, { flex: 1 }]}>
          <View style={{ gap: 10 }}>
            <View style={styles.header}>
              <Text style={[TextProps, { fontWeight: "500", fontSize: 18 }]}>Purchase</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Pressable style={styles.wrapper} onPress={handlePurchaseToggleFilter}>
                  <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
                </Pressable>
                <Pressable onPress={refetchPurchase} style={styles.refresh}>
                  <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
                </Pressable>
              </View>
            </View>
            <View style={styles.header}>
              <Text style={[TextProps, { color: "#8A9099" }]}>
                {dayjs(purchaseDate).startOf("month").format("DD MMM")} - {getDateBasedOnMonth(purchaseDate)}
              </Text>
              <Text style={[TextProps]}>{currencyConverter.format(purchase)}</Text>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={[TextProps, { color: "#8A9099" }]}>Paid</Text>
                <Text style={[TextProps, { color: "#8A9099" }]}>Unpaid</Text>
              </View>
              <View style={styles.header}>
                <Text style={[TextProps]}>{currencyConverter.format(paid_purchase)}</Text>
                <Text style={[TextProps]}>{currencyConverter.format(unpaid_purchase)}</Text>
              </View>
            </View>
            <LoadingBar total={purchase} paid={paid_purchase} unpaid={unpaid_purchase} />
            <View style={styles.header}>
              <Text style={[TextProps, { color: "#8A9099" }]}>Today</Text>
              <Text style={[TextProps]}>{currencyConverter.format(todayPurchase)}</Text>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={[TextProps, { color: "#8A9099" }]}>Underdue</Text>
                <Text style={[TextProps, { color: "#8A9099" }]}>Overdue</Text>
              </View>
              <View style={styles.header}>
                <Text style={[TextProps]}>{currencyConverter.format(underduePayment_purchase)}</Text>
                <Text style={[TextProps]}>{currencyConverter.format(overduePayment_purchase)}</Text>
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
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  container: {
    gap: 8,
    flex: 1,
    marginHorizontal: 14,
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
