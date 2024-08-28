import { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import {
  BackHandler,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { TextProps } from "../../styles/CustomStylings";
import { useFetch } from "../../hooks/useFetch";
import ProfitLossCard from "../../components/Coin/Dashboard/ProfitLossCard";
import SalesTrend from "../../components/Coin/Dashboard/SalesTrend";
import SalesAndPurchaseCard from "../../components/Coin/Dashboard/SalesAndPurchaseCard";
import Reminder from "../../components/Coin/Dashboard/Reminder";
import Invoice from "../../components/Coin/Dashboard/Invoice";
import ProfitLossFilter from "../../components/Coin/Dashboard/ProfitLossFilter";
import SalesFilter from "../../components/Coin/Dashboard/SalesFilter";
import PurchaseFilter from "../../components/Coin/Dashboard/PurchaseFilter";
import SalesTrendFilter from "../../components/Coin/Dashboard/SalesTrendFilter";
import RecentActivity from "../../components/Coin/Dashboard/RecentActivity";
import { card } from "../../styles/Card";

const height = Dimensions.get("screen").height - 300;

const CoinDashboard = () => {
  const [profitLossYearSelected, setProfitLossYearSelected] = useState(new Date().getFullYear());
  const [profitLossSalesPurchaseBeginDate, setProfitLossSalesPurchaseBeginDate] = useState(null);
  const [profitLossSalesPurchaseEndDate, setProfitLossSalesPurchaseEndDate] = useState(null);
  const [salesMonthSelected, setSalesMonthSelected] = useState(new Date().getMonth() + 1);
  const [salesYearSelected, setSalesYearSelected] = useState(new Date().getFullYear());
  const [joinSalesMonth, setJoinSalesMonth] = useState(`${salesYearSelected}-${salesMonthSelected}`);
  const [purchaseMonthSelected, setPurchaseMonthSelected] = useState(new Date().getMonth() + 1);
  const [purchaseYearSelected, setPurchaseYearSelected] = useState(new Date().getFullYear());
  const [joinPurchaseMonth, setJoinPurchaseMonth] = useState(`${purchaseYearSelected}-${purchaseMonthSelected}`);
  const [salesTrendMonthSelected, setSalesTrendMonthSelected] = useState(new Date().getMonth() + 1);
  const [salesTrendYearSelected, setSalesTrendYearSelected] = useState(new Date().getFullYear());
  const [joinSalesTrendMonth, setJoinSalesTrendMonth] = useState(
    `${salesTrendYearSelected}-${salesTrendMonthSelected}`
  );
  const [joinProfitLossYear, setJoinProfitLossYear] = useState(`${profitLossYearSelected}-01`);
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const [selected, setSelected] = useState("sales");
  const [salesPurchaseBeginDate, setSalesPurchaseBeginDate] = useState(dayjs().date(1).format("YYYY-MM-DD"));
  const [salesPurchaseEndDate, setSalesPurchaseEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [currentYearProfitLossBeginDate, setCurrentYearProfitLossBeginDate] = useState(
    dayjs().month(0).date(1).format("YYYY-MM-DD")
  );
  const [currentYearProfitLossEndDate, setCurrentYearProfitLossEndDate] = useState(
    dayjs().month(11).date(31).format("YYYY-MM-DD")
  );

  const navigation = useNavigation();
  const currentDate = dayjs();

  const route = useRoute();
  const isFocused = useIsFocused();

  const months = [
    { key: 1, name: "January" },
    { key: 2, name: "February" },
    { key: 3, name: "March" },
    { key: 4, name: "April" },
    { key: 5, name: "May" },
    { key: 6, name: "June" },
    { key: 7, name: "July" },
    { key: 8, name: "August" },
    { key: 9, name: "September" },
    { key: 10, name: "October" },
    { key: 11, name: "November" },
    { key: 12, name: "December" },
  ];

  const filterSheetRef = useRef();
  const filterSales = useRef();
  const filterPurchase = useRef();
  const filterSalesTrend = useRef();

  const fetchReminderParameters = {
    limit: 5,
  };

  const fetchActivityParameters = {
    limit: 5,
  };

  const fetchProfitLossParameters = {
    begin_date: profitLossSalesPurchaseBeginDate ? profitLossSalesPurchaseBeginDate : currentYearProfitLossBeginDate,
    end_date: profitLossSalesPurchaseEndDate ? profitLossSalesPurchaseEndDate : currentYearProfitLossEndDate,
    // year: profitLossYearSelected,
  };

  const fetchSalesParameters = {
    begin_date: profitLossSalesPurchaseBeginDate ? profitLossSalesPurchaseBeginDate : salesPurchaseBeginDate,
    end_date: profitLossSalesPurchaseEndDate ? profitLossSalesPurchaseEndDate : salesPurchaseEndDate,
    // month: salesMonthSelected,
    // year: salesYearSelected,
  };

  const fetchPuchaseParameters = {
    begin_date: profitLossSalesPurchaseBeginDate ? profitLossSalesPurchaseBeginDate : salesPurchaseBeginDate,
    end_date: profitLossSalesPurchaseEndDate ? profitLossSalesPurchaseEndDate : salesPurchaseEndDate,
    // month: purchaseMonthSelected,
    // year: purchaseYearSelected,
  };

  const fetchRecentInvoiceParameters = {
    limit: 5,
  };

  const fetchSalesTrendParameters = {
    month: salesTrendMonthSelected,
    year: salesTrendYearSelected,
  };

  const {
    data: reminder,
    refetch: refetchReminder,
    isLoading: reminderIsLoading,
  } = useFetch("/acc/dashboard/reminder", [], fetchReminderParameters);

  const {
    data: profitLoss,
    refetch: refetchProfitLoss,
    isLoading: profitLossIsLoading,
  } = useFetch(
    "/acc/dashboard/profit",
    [
      profitLossSalesPurchaseBeginDate,
      profitLossSalesPurchaseEndDate,
      currentYearProfitLossBeginDate,
      currentYearProfitLossEndDate,
    ],
    fetchProfitLossParameters
  );

  const {
    data: sales,
    refetch: refetchSales,
    isLoading: salesIsLoading,
  } = useFetch(
    "/acc/dashboard/sales",
    [profitLossSalesPurchaseBeginDate, profitLossSalesPurchaseEndDate, salesPurchaseBeginDate, salesPurchaseEndDate],
    fetchSalesParameters
  );
  const {
    data: purchase,
    refetch: refetchPurchase,
    isLoading: purchaseIsLoading,
  } = useFetch(
    "/acc/dashboard/purchase",
    [profitLossSalesPurchaseBeginDate, profitLossSalesPurchaseEndDate, salesPurchaseBeginDate, salesPurchaseEndDate],
    fetchPuchaseParameters
  );

  const {
    data: salesTrend,
    refetch: refetchSalesTrend,
    isLoading: salesTrendIsLoading,
  } = useFetch(
    "/acc/dashboard/sales-trend",
    [salesTrendMonthSelected, salesTrendYearSelected],
    fetchSalesTrendParameters
  );

  const {
    data: invoice,
    refetch: refetchInvoice,
    isLoading: invoiceIsLoading,
  } = useFetch("/acc/dashboard/recent-invoice", [], fetchRecentInvoiceParameters);

  const {
    data: activity,
    refetch: refetchActivity,
    isLoading: activityIsLoading,
  } = useFetch("/acc/dashboard/recent-activity", [], fetchActivityParameters);

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const salesPurchaseButton = [
    { title: "Sales", value: "sales", onPress: () => setSelected("sales") },
    { title: "Purchase", value: "purchase", onPress: () => setSelected("purchase") },
  ];

  const toggleFilterHandler = () => {
    filterSheetRef.current?.show();
  };

  const salesFilterHandler = () => {
    filterSales.current?.show();
  };

  const purchaseFilterHandler = () => {
    filterPurchase.current?.show();
  };

  const salesTrendFilterHandler = () => {
    filterSalesTrend.current?.show();
  };

  const selectProfitLossYearHandler = (year) => {
    setProfitLossYearSelected(year);
  };

  const profitLossBeginDateHandler = (date) => {
    setProfitLossSalesPurchaseBeginDate(date);
  };
  const profitLossEndDateHandler = (date) => {
    setProfitLossSalesPurchaseEndDate(date);
  };

  const selectSalesMonthHandler = (month) => {
    setSalesMonthSelected(month);
    filterSales.current?.hide();
  };

  const selectSalesYearHandler = (year) => {
    setSalesYearSelected(year);
  };

  const selectPurchaseMonthHandler = (month) => {
    setPurchaseMonthSelected(month);
    filterPurchase.current?.hide();
  };

  const selectPurchaseYearHandler = (year) => {
    setPurchaseYearSelected(year);
  };

  const selectSalesTrendMonthHandler = (month) => {
    setSalesTrendMonthSelected(month);
    filterSalesTrend.current?.hide();
  };

  const selectSalesTrendYearHandler = (year) => {
    setSalesTrendYearSelected(year);
  };

  const profitLossSalesPurchaseDateResetHandler = async () => {
    // setProfitLossBeginDate(dayjs().date(1).format("YYYY-MM-DD"));
    // setProfitLossEndDate(dayjs().format("YYYY-MM-DD"));
    setProfitLossSalesPurchaseBeginDate(null);
    setProfitLossSalesPurchaseEndDate(null);
  };

  const refreshProfitLossSalesPurchaseHandler = () => {
    // setProfitLossYearSelected(new Date().getFullYear());
    setProfitLossSalesPurchaseBeginDate(null);
    setProfitLossSalesPurchaseEndDate(null);
    refetchProfitLoss();
    refetchSales();
    refetchPurchase();
  };

  const salesDateResetHandler = async () => {
    setSalesMonthSelected(new Date().getMonth() + 1);
    setSalesYearSelected(new Date().getFullYear());
    filterSales.current?.hide();
  };

  const refreshSalesHandler = () => {
    setSalesMonthSelected(new Date().getMonth() + 1);
    setSalesYearSelected(new Date().getFullYear());
    refetchSales();
  };

  const purchaseDateResetHandler = async () => {
    setPurchaseMonthSelected(new Date().getMonth() + 1);
    setPurchaseYearSelected(new Date().getFullYear());
    filterPurchase.current?.hide();
  };

  const refreshPurchaseHandler = () => {
    setPurchaseMonthSelected(new Date().getMonth() + 1);
    setPurchaseYearSelected(new Date().getFullYear());
    refetchPurchase();
  };

  const salesTrendDateResetHandler = async () => {
    setSalesTrendMonthSelected(new Date().getMonth() + 1);
    setSalesTrendYearSelected(new Date().getFullYear());
    filterSalesTrend.current?.hide();
  };

  const refreshSalesTrendHandler = () => {
    setSalesTrendMonthSelected(new Date().getMonth() + 1);
    setSalesTrendYearSelected(new Date().getFullYear());
    refetchSalesTrend();
  };

  function currencyConverter(number) {
    let formattedNumber;

    if (number >= 1e12) {
      formattedNumber = (number / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
    } else if (number >= 1e9) {
      formattedNumber = (number / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (number >= 1e6) {
      formattedNumber = (number / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    } else {
      formattedNumber = number.toLocaleString();
    }

    if (Platform.OS === "android") {
      const parts = currencyFormatter.formatToParts(number);
      const currencySymbol = parts.find((part) => part.type === "currency").value;
      const decimalSeparator = parts.find((part) => part.type === "decimal")?.value || "";
      const formattedCurrency = `${currencySymbol} ${formattedNumber.replace(decimalSeparator, "")}`;

      return formattedCurrency;
    } else {
      return currencyFormatter.format(number).replace(number.toLocaleString(), formattedNumber);
    }
  }

  const refetchAll = () => {
    refetchReminder();
    refreshProfitLossSalesPurchaseHandler();
    refreshSalesHandler();
    refreshPurchaseHandler();
    refreshSalesTrendHandler();
    refetchInvoice();
    refetchActivity();
  };

  /**
   * Handle double press back to exit app
   */
  useEffect(() => {
    if (route.name === "Dashboard" && isFocused) {
      const backAction = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }
        setBackPressedOnce(true);
        ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000); // Reset backPressedOnce after 2 seconds
        return true;
      };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }
  }, [backPressedOnce, route, isFocused]);

  useEffect(() => {
    setJoinSalesMonth(`${salesYearSelected}-${salesMonthSelected}`);
  }, [salesMonthSelected, salesYearSelected]);

  useEffect(() => {
    setJoinPurchaseMonth(`${purchaseYearSelected}-${purchaseMonthSelected}`);
  }, [purchaseMonthSelected, purchaseYearSelected]);

  useEffect(() => {
    setJoinSalesTrendMonth(`${salesTrendYearSelected}-${salesTrendMonthSelected}`);
  }, [salesTrendMonthSelected, salesTrendYearSelected]);

  useEffect(() => {
    setJoinProfitLossYear(`${profitLossYearSelected}-01`);
  }, [profitLossYearSelected]);

  useEffect(() => {
    refetchAll();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 700, color: "#176688" }}>Financial</Text>
        </View>
        <Text style={[{ fontWeight: 700 }, TextProps]}>PT Kolabora Group Indonesia</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={refetchAll}
            refreshing={
              reminderIsLoading &&
              profitLossIsLoading &&
              salesIsLoading &&
              purchaseIsLoading &&
              salesTrendIsLoading &&
              invoiceIsLoading &&
              activityIsLoading
            }
          />
        }
      >
        <View style={styles.contentWrapper}>
          <Reminder
            data={reminder?.data}
            navigation={navigation}
            currentDate={currentDate}
            isLoading={reminderIsLoading}
            refetch={refetchReminder}
          />
          <RecentActivity
            data={activity?.data}
            navigation={navigation}
            currentDate={currentDate}
            isLoading={activityIsLoading}
            refetch={refetchActivity}
          />
          <Pressable style={[card.card, { flex: 1, marginHorizontal: 14, gap: 20 }]}>
            <ProfitLossCard
              currencyConverter={currencyFormatter}
              converter={currencyConverter}
              income={profitLoss?.data?.income}
              cogs={profitLoss?.data?.cogs}
              expense={profitLoss?.data?.expense}
              profit={profitLoss?.data?.profit}
              percentage={(profitLoss?.data?.profit_percent * 100).toFixed()}
              isLoading={profitLossIsLoading}
              startDate={
                profitLossSalesPurchaseBeginDate ? profitLossSalesPurchaseBeginDate : currentYearProfitLossBeginDate
              }
              endDate={profitLossSalesPurchaseEndDate ? profitLossSalesPurchaseEndDate : currentYearProfitLossEndDate}
              toggleFilter={toggleFilterHandler}
              refetch={refreshProfitLossSalesPurchaseHandler}
            />
            <SalesAndPurchaseCard
              currencyConverter={currencyFormatter}
              converter={currencyConverter}
              income={sales?.data?.month?.income}
              todayIncome={sales?.data?.today?.unpaid_all}
              paid_income={sales?.data?.month?.paid}
              unpaid_income={sales?.data?.month?.unpaid}
              underduePayment_income={sales?.data?.today?.not_yet_due}
              overduePayment_income={sales?.data?.today?.past_due}
              purchase={purchase?.data?.month?.purchase}
              paid_purchase={purchase?.data?.month?.paid}
              unpaid_purchase={purchase?.data?.month?.unpaid}
              underduePayment_purchase={purchase?.data?.today?.not_yet_due}
              overduePayment_purchase={purchase?.data?.today?.past_due}
              todayPurchase={sales?.data?.today?.unpaid_all}
              salesIsLoading={salesIsLoading}
              purchaseIsLoading={purchaseIsLoading}
              handleToggleFilter={salesFilterHandler}
              handlePurchaseToggleFilter={purchaseFilterHandler}
              refetchSales={refreshSalesHandler}
              refetchPurchase={refreshPurchaseHandler}
              buttons={salesPurchaseButton}
              selected={selected}
              startDate={profitLossSalesPurchaseBeginDate ? profitLossSalesPurchaseBeginDate : salesPurchaseBeginDate}
              endDate={profitLossSalesPurchaseEndDate ? profitLossSalesPurchaseEndDate : salesPurchaseEndDate}
            />
          </Pressable>
          <SalesTrend
            converter={currencyConverter}
            data={salesTrend?.data}
            isLoading={salesTrendIsLoading}
            toggleFilter={salesTrendFilterHandler}
            date={joinSalesTrendMonth}
            refetch={refreshSalesTrendHandler}
          />
          <Invoice
            data={invoice?.data}
            navigation={navigation}
            converter={currencyFormatter}
            isLoading={invoiceIsLoading}
            refetch={refetchInvoice}
          />
          <ProfitLossFilter
            reference={filterSheetRef}
            startDate={profitLossSalesPurchaseBeginDate}
            endDate={profitLossSalesPurchaseEndDate}
            handleBeginDate={profitLossBeginDateHandler}
            handleEndDate={profitLossEndDateHandler}
            handleResetDate={profitLossSalesPurchaseDateResetHandler}
            selectedYear={profitLossYearSelected}
            selectedYearHandler={selectProfitLossYearHandler}
          />
          {/* <SalesFilter
            reference={filterSales}
            handleResetDate={salesDateResetHandler}
            selectMonthHandler={selectSalesMonthHandler}
            selectYearHandler={selectSalesYearHandler}
            months={months}
            selectedMonth={salesMonthSelected}
            selectedYear={salesYearSelected}
          /> */}
          {/* <PurchaseFilter
            reference={filterPurchase}
            handleResetDate={purchaseDateResetHandler}
            months={months}
            selectMonthHandler={selectPurchaseMonthHandler}
            selectYearHandler={selectPurchaseYearHandler}
            selectedMonth={purchaseMonthSelected}
            selectedYear={purchaseYearSelected}
          /> */}
          <SalesTrendFilter
            reference={filterSalesTrend}
            handleResetDate={salesTrendDateResetHandler}
            months={months}
            selectMonthHandler={selectSalesTrendMonthHandler}
            selectYearHandler={selectSalesTrendYearHandler}
            selectedMonth={salesTrendMonthSelected}
            selectedYear={salesTrendYearSelected}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
  contentWrapper: {
    flex: 1,
    gap: 14,
    marginVertical: 14,
  },
});
