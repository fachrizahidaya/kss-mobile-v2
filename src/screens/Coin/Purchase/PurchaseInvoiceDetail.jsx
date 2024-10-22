import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import Screen from "../../../layouts/Screen";
import Button from "../../../styles/forms/Button";
import Tabs from "../../../layouts/Tabs";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";
import AlertModal from "../../../styles/modals/AlertModal";
import TransactionList from "../../../components/Coin/PurchaseOrder/TransactionList";
import JournalList from "../../../components/Coin/ReceiptPurchaseOrder/JournalList";
import DetailList from "../../../components/Coin/shared/DetailList";

const PurchaseInvoiceDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessPI, isLoading: processPIIsLoading } = useLoading(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/purchase-invoice/${id}`);

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
    { name: "Invoice Date", data: dayjs(data?.data?.invoice_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Supplier", data: data?.data?.supplier?.name || "No Data" },
    { name: "Invoice No. Supplier", data: data?.data?.invoice_no_supplier || "No Data" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "No Data" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Courier", data: data?.data?.courier?.name || "No Data" },
    { name: "FoB", data: data?.data?.fob?.name || "No Data" },
    { name: "Supplier Address", data: data?.data?.supplier?.address || "No Data" },
    { name: "Journal No.", data: data?.data?.journal?.journal_no || "No Data" },
    { name: "Notes", data: data?.data?.notes || "No Data" },
  ];

  const downloadPurchaseInvoiceHandler = async () => {
    try {
      toggleProcessPI();
      const res = await axiosInstance.get(`/acc/purchase-invoice/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessPI();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessPI();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.invoice_no || "Purchase Invoice Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadPurchaseInvoiceHandler()}
          disabled={processPIIsLoading}
        >
          {!processPIIsLoading ? (
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
            isInvoice={true}
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

export default PurchaseInvoiceDetail;

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
    gap: 10,
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
