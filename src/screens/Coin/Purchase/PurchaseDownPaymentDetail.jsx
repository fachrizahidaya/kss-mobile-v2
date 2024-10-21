import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import Button from "../../../styles/forms/Button";
import Screen from "../../../layouts/Screen";
import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import TransactionList from "../../../components/Coin/PurchaseOrder/TransactionList";
import JournalList from "../../../components/Coin/ReceiptPurchaseOrder/JournalList";
import AlertModal from "../../../styles/modals/AlertModal";
import { useFetch } from "../../../hooks/useFetch";

const PurchaseDownPaymentDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessPDP, isLoading: processPDPIsLoading } = useLoading(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/purchase-down-payment/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Payment History`, value: "Payment History" },
      { title: `Journal`, value: "Journal" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Payment" }, { name: "Date" }, { name: "Amount" }];

  const dataArr = [
    { name: "Down Payment Date", data: dayjs(data?.data?.dp_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Supplier", data: data?.data?.supplier?.name || "No Data" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "No Data" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Courier", data: data?.data?.courier?.name || "No Data" },
    { name: "FoB", data: data?.data?.fob?.name || "No Data" },
    { name: "Notes", data: data?.data?.notes || "No Data" },
  ];

  const downloadPurchaseDownPaymentHandler = async () => {
    try {
      toggleProcessPDP();
      const res = await axiosInstance.get(`/acc/purchase-down-payment/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessPDP();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessPDP();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.dp_no || "Purchase DP Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadPurchaseDownPaymentHandler()}
          disabled={processPDPIsLoading}
        >
          {!processPDPIsLoading ? (
            <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : tabValue === "Payment History" ? (
        <View style={styles.wrapper}>
          <TransactionList
            header={headerTableArr}
            data={data?.data?.purchase_payment_invoice}
            isLoading={isLoading}
            isInvoice={false}
          />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <JournalList
            header={null}
            currencyConverter={currencyConverter}
            data={data?.data?.journal?.account}
            debit={data?.data?.journal?.account_sum_debt_amount}
            credit={data?.data?.journal?.account_sum_credit_amount}
          />
        </View>
      )}

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title="Process error!"
        description={errorMessage || "Please try again later"}
        type="danger"
      />
    </Screen>
  );
};

export default PurchaseDownPaymentDetail;

const styles = StyleSheet.create({
  content: {
    marginVertical: 14,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
