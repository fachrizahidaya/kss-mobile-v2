import { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { TextProps } from "../../styles/CustomStylings";
import IncomeCard from "../../components/Coin/Dashboard/IncomeCard";
import SalesAndCustomerCard from "../../components/Coin/Dashboard/SalesAndCustomerCard";
import { useFetch } from "../../hooks/useFetch";
import AnalyticCard from "../../components/Coin/Dashboard/AnalyticCard";
import StatisticCard from "../../components/Coin/Dashboard/StatisticCard";
import SalesCard from "../../components/Coin/Dashboard/SalesCard";
import OrderCard from "../../components/Coin/Dashboard/OrderCard";
import ProfitLossCard from "../../components/Coin/Dashboard/ProfitLossCard";
import SalesTrend from "../../components/Coin/Dashboard/SalesTrend";
import SalesAndPurchaseCard from "../../components/Coin/Dashboard/SalesAndPurchaseCard";
import Reminder from "../../components/Coin/Dashboard/Reminder";
import Invoice from "../../components/Coin/Dashboard/Invoice";

const height = Dimensions.get("screen").height - 300;

const CoinDashboard = () => {
  const [category, setCategory] = useState("pending");
  const [number, setNumber] = useState(1);
  const [tabValue, setTabValue] = useState("Pending");

  const navigation = useNavigation();
  const currentDate = dayjs();

  const {
    data: customerData,
    isLoading: customerDataIsLoading,
    refetch: refetchCustomerData,
    isFetching: customerDataIsFetching,
  } = useFetch(`/acc/customer`);

  const {
    data: invoiceData,
    isLoading: invoiceDataIsLoading,
    refetch: refetchInvoiceData,
    isFetching: invoiceDataIsFetching,
  } = useFetch(`/acc/sales-invoice`);

  const {
    data: salesData,
    isLoading: salesDataIsLoading,
    refetch: refetchSalesData,
    isFetching: salesDataIsFetching,
  } = useFetch(`/acc/sales-order`);

  const { data: purchaseData } = useFetch(`/acc/po`);

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const schedule = [
    {
      type: "Sales",
      id: 1,
      document_no: { so_no: "002", po_no: null, invoice_no: "01-01", do_no: null },
      customer: "Albert",
      company: "PT Kolabora",
      description: "Jatuh Tempo Piutang",
      due_date: "2024-08-01",
    },
    {
      type: "Purchase",
      id: 2,
      document_no: { so_no: null, po_no: "003", invoice_no: "02-03", do_no: null },
      customer: "PT Kolabora",
      company: "Ratna",
      description: "Jatuh Tempo Utang",
      due_date: "2024-08-01",
    },
    {
      type: "Delivery",
      id: 3,
      document_no: { so_no: null, po_no: null, invoice_no: "01-02", do_no: "010" },
      customer: "Barakah",
      company: "PT Kolabora",
      description: "Pengiriman Barang",
      due_date: "2024-08-02",
    },
    {
      type: "Purchase",
      id: 4,
      document_no: { so_no: null, po_no: "005", invoice_no: "02-05", do_no: null },
      customer: "PT Kolabora",
      company: "Ratna",
      description: "Jatuh Tempo Utang",
      due_date: "2024-08-02",
    },
    {
      type: "Sales",
      id: 1,
      document_no: { so_no: "002", po_no: null, invoice_no: "01-01", do_no: null },
      customer: "Albert",
      company: "PT Kolabora",
      description: "Jatuh Tempo Piutang",
      due_date: "2024-08-03",
    },
    {
      type: "Sales",
      id: 1,
      document_no: { so_no: "002", po_no: null, invoice_no: "01-01", do_no: null },
      customer: "Albert",
      company: "PT Kolabora",
      description: "Jatuh Tempo Piutang",
      due_date: "2024-08-03",
    },
  ];

  const buttons = [
    { title: "Pending", value: "pending", onPress: () => setCategory("pending") },
    { title: "Partially", value: "partial", onPress: () => setCategory("partial") },
  ];

  const invoice = [
    {
      invoice_no: "101776778ggfghfghghgvhvh86786hjgjhgjg",
      invoice_date: "2024-07-15",
      customer: "Albin",
      status: "Pending",
    },
    {
      invoice_no: "105",
      invoice_date: "2024-07-15",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "107",
      invoice_date: "2024-07-20",
      customer: "Charles",
      status: "Pending",
    },
    {
      invoice_no: "111",
      invoice_date: "2024-07-22",
      customer: "Ratna",
      status: "Pending",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
    {
      invoice_no: "112",
      invoice_date: "2024-07-22",
      customer: "Albin",
      status: "Partial",
    },
  ];

  const tabs = useMemo(() => {
    return [
      { title: `Pending`, value: "Pending", number: 1 },
      { title: `Partial`, value: "Partial", number: 2 },
    ];
  }, []);

  const onChangeNumber = (value) => {
    setNumber(value);
  };

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "Pending") {
    } else {
    }
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

    // Apply the currency formatter to the number part only
    return currencyFormatter.format(number).replace(number.toLocaleString(), formattedNumber);
  }

  // const invoiceAmount = invoiceData?.data?.map((item) => item?.subtotal_amount);
  // const salesAmount = salesData?.data?.map((item) => item?.subtotal_amount);

  // const sumOfInvoice = invoiceAmount?.reduce(totalSum);
  // const sumOfSales = salesAmount?.reduce(totalSum);

  // const salesByMonth = invoiceData?.data?.map((item) => ({
  //   amount: item?.subtotal_amount,
  //   date: dayjs(item?.invoice_date).format("MMM YY"),
  // }));

  // const purchaseByMonth = purchaseData?.data?.map((item) => ({
  //   amount: item?.subtotal_amount,
  //   date: dayjs(item?.po_date).format("MMM YY"),
  // }));

  // function totalSum(total, value) {
  //   return total + value;
  // }

  /**
   * For Income Card
   */
  // const currentMonth = dayjs().format("M");

  // const incomeBySingleMonth = invoiceData?.data?.map((item) => ({
  //   amount: item?.subtotal_amount,
  //   date: dayjs(item?.so_date).format("M"),
  // }));

  // const currentMonthIncome = incomeBySingleMonth?.filter((item) => item?.date === currentMonth.toString());
  // const previousMonthIncome = incomeBySingleMonth?.filter((item) => item?.date === (currentMonth - 1).toString());

  // const totalCurrentMonthIncome = currentMonthIncome?.reduce((sum, item) => sum + (item?.amount || 0), 0);
  // const totalPreviousMonthIncome = previousMonthIncome?.reduce((sum, item) => sum + (item?.amount || 0), 0);

  // const incomePercentageOfChangeBetweenPreviousAndCurrentMonth =
  //   ((totalCurrentMonthIncome - totalPreviousMonthIncome) / totalCurrentMonthIncome) * 100;

  /**************************************************************** */

  /**
   * For Sales and Customer Card
   */
  // const salesBySingleMonth = invoiceData?.data?.map((item) => ({
  //   amount: item?.subtotal_amount,
  //   date: dayjs(item?.invoice_date).format("M"),
  // }));

  // const currentMonthSales = salesBySingleMonth?.filter((item) => item?.date === currentMonth.toString());
  // const previousMonthSales = salesBySingleMonth?.filter((item) => item?.date === (currentMonth - 1).toString());

  // const totalCurrentMonthSales = currentMonthSales?.reduce((sum, item) => sum + (item?.amount || 0), 0);
  // const totalPreviousMonthSales = previousMonthSales?.reduce((sum, item) => sum + (item?.amount || 0), 0);

  // const salesPercentageOfChangeBetweenPreviousAndCurrentMonth =
  //   ((totalCurrentMonthSales - totalPreviousMonthSales) / totalPreviousMonthSales) * 100;

  // const filteredCustomerByCurrentMonth = customerData?.data?.filter(
  //   (item) => dayjs(item?.created_at).format("M") == dayjs().format("M")
  // );

  // const filteredCustomerByPreviousMonth = customerData?.data?.filter(
  //   (item) => dayjs(item?.created_at).format("M") == dayjs().format("M") - 1
  // );

  // const customerTotalPercentageOfChangeBetweenPreviousAndCurrentMonth =
  //   ((filteredCustomerByCurrentMonth?.length - filteredCustomerByPreviousMonth?.length) / customerData?.data?.length) *
  //   100;

  /**************************************************************** */

  /**
   * For Statistic Card
   */
  // let sumSalesByMonth = {};
  // let sumPurchaseByMonth = {};

  // salesByMonth?.forEach((item) => {
  //   if (sumSalesByMonth[item?.date]) {
  //     sumSalesByMonth[item?.date] += item?.amount;
  //   } else {
  //     sumSalesByMonth[item?.date] = item?.amount;
  //   }
  // });

  // purchaseByMonth?.forEach((item) => {
  //   if (sumPurchaseByMonth[item?.date]) {
  //     sumPurchaseByMonth[item?.date] += item?.amount;
  //   } else {
  //     sumPurchaseByMonth[item?.date] = item?.amount;
  //   }
  // });

  // const sumByMonth = {};
  // let count = 0;

  // for (const monthYear in sumSalesByMonth) {
  //   if (count >= 6) break;
  //   if (!sumByMonth[monthYear]) {
  //     sumByMonth[monthYear] = [sumSalesByMonth[monthYear], 0];
  //   } else {
  //     sumByMonth[monthYear][0] = sumSalesByMonth[monthYear];
  //   }
  //   count++; // Increment the counter
  // }

  // for (const monthYear in sumPurchaseByMonth) {
  //   if (count >= 6) break; // If 5 entries processed, break out of the loop
  //   if (!sumByMonth[monthYear]) {
  //     sumByMonth[monthYear] = [0, sumPurchaseByMonth[monthYear]];
  //   } else {
  //     sumByMonth[monthYear][1] = sumPurchaseByMonth[monthYear];
  //   }
  //   count++; // Increment the counter
  // }
  /**************************************************************** */

  /**
   * For Sales Card
   */
  // const currentYear = dayjs().format("YYYY");

  // const salesByYear = invoiceData?.data.map((item) => ({
  //   amount: item?.subtotal_amount,
  //   date: dayjs(item?.invoice_date).format("YYYY"),
  // }));

  // const currentYearSales = salesByYear?.filter((item) => item?.date === currentYear.toString());
  // const previousYearSales = salesByYear?.filter((item) => item?.date === (currentYear - 1).toString());

  // const totalCurrentYearSales = currentYearSales?.reduce((sum, item) => sum + (item?.amount || 0), 0);
  // const totalPreviousYearSales = previousYearSales?.reduce((sum, item) => sum + (item?.amount || 0), 0);

  /**************************************************************** */

  /**
   * For Profit Loss Card
   */
  const previousYearProfitLoss = dayjs().format("YYYY") - 1;
  const selectedYearProfitLoss = dayjs().format("YYYY");

  const incomePreviousYear = 8000000000;
  const cogsPreviousYear = 6200000000;
  const expensePreviousYear = 1500000000;

  const incomeSelectedYear = 9487346442;
  const cogsSelectedYear = 7594207016;
  const expenseSelectedYear = 1410663285;

  const totalProfitPreviousYear = incomePreviousYear - cogsPreviousYear - expensePreviousYear;
  const totalProfitSelectedYear = incomeSelectedYear - cogsSelectedYear - expenseSelectedYear;

  const comparisonPercentage = Math.round(
    ((totalProfitSelectedYear - totalProfitPreviousYear) / totalProfitPreviousYear) * 100
  );
  /**************************************************************** */

  /**
   * For Sales Trend
   */
  const salesInvoice = [
    { subtotal_amount: 100000000, invoice_date: "2024-05" },
    { subtotal_amount: 150000000, invoice_date: "2024-06" },
    { subtotal_amount: 200000000, invoice_date: "2024-07" },
  ];

  const totalSalesByMonth = salesInvoice.map((item) => ({
    amount: item?.subtotal_amount,
    date: dayjs(item?.invoice_date).format("MMM YY"),
  }));

  let sumAllSalesByMonth = {};

  totalSalesByMonth?.forEach((item) => {
    if (sumAllSalesByMonth[item?.date]) {
      sumAllSalesByMonth[item?.date] += item?.amount;
    } else {
      sumAllSalesByMonth[item?.date] = item?.amount;
    }
  });

  const allSalesByMonth = {};
  let countAll = 0;

  for (const monthYear in sumAllSalesByMonth) {
    if (countAll >= 6) break;
    if (!allSalesByMonth[monthYear]) {
      allSalesByMonth[monthYear] = [sumAllSalesByMonth[monthYear], 0];
    } else {
      allSalesByMonth[monthYear][0] = sumAllSalesByMonth[monthYear];
    }
    countAll++; // Increment the counter
  }

  /**************************************************************** */

  const refetchEverything = () => {
    refetchCustomerData();
    refetchInvoiceData();
    refetchSalesData();
  };

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
            refreshing={customerDataIsFetching && invoiceDataIsFetching && salesDataIsFetching}
            onRefresh={refetchEverything}
          />
        }
        style={styles.scrollView}
      >
        <View style={styles.contentWrapper}>
          <Reminder data={schedule} navigation={navigation} />
          <SalesAndPurchaseCard currencyConverter={currencyFormatter} converter={currencyConverter} />
          <ProfitLossCard
            currencyConverter={currencyFormatter}
            converter={currencyConverter}
            income={incomeSelectedYear}
            cogs={cogsSelectedYear}
            expense={expenseSelectedYear}
            profit={totalProfitSelectedYear}
            percentage={comparisonPercentage}
            previousYear={previousYearProfitLoss}
            selectedYear={selectedYearProfitLoss}
          />
          <SalesTrend sumByMonth={allSalesByMonth} converter={currencyConverter} />
          <Invoice
            buttons={buttons}
            category={category}
            data={invoice}
            tabs={tabs}
            tabValue={tabValue}
            onChangeTab={onChangeTab}
            onChangeNumber={onChangeNumber}
            number={number}
            navigation={navigation}
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
  scrollView: {
    paddingHorizontal: 14,
  },
  contentWrapper: {
    flex: 1,
    gap: 14,
    marginVertical: 14,
  },
});
