import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

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
import CustomBadge from "../../../styles/CustomBadge";
import CostList from "../../../components/Coin/PurchaseOrder/CostList";
import ItemList from "../../../components/Coin/shared/ItemList";

const PurchaseInvoiceDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

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
      { title: `Items`, value: "Item List" },
      { title: `Costs`, value: "Cost List" },
      { title: `Journal`, value: "Journal" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const headerTableArr = [{ name: "Payment" }, { name: "Date" }, { name: "Amount" }];

  const dataArr = [
    { name: "Supplier", data: data?.data?.supplier?.name || "-" },
    { name: "Invoice No. Supplier", data: data?.data?.invoice_no_supplier || "-" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "-" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "-" },
    { name: "Courier", data: data?.data?.courier?.name || "-" },
    { name: "FoB", data: data?.data?.fob?.name || "-" },
    { name: "Supplier Address", data: data?.data?.supplier?.address || "-" },
    { name: "Journal No.", data: data?.data?.journal?.journal_no || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
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
      screenTitle={"Purchase Invoice"}
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialCommunityIcons name={"download"} size={15} color="#FFFFFF" />
              <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>PDF</Text>
            </View>
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
        <ScrollView>
          <DetailList
            data={dataArr}
            isLoading={isLoading}
            total_amount={currencyConverter.format(data?.data?.total_amount)}
            doc_no={data?.data?.invoice_no}
            currency={data?.data?.supplier?.currency?.name}
            status={data?.data?.status}
            date={dayjs(data?.data?.invoice_date).format("DD MMM YYYY")}
            title="Invoice"
            backgroundColor={
              data?.data?.status === "Unpaid"
                ? "#e2e3e5"
                : data?.data?.status === "Partially Paid"
                ? "#fef9c3"
                : "#dcfce6"
            }
            textColor={
              data?.data?.status === "Unpaid"
                ? "#65758c"
                : data?.data?.status === "Partially Paid"
                ? "#cb8c09"
                : "#16a349"
            }
          />
        </ScrollView>
      ) : tabValue === "Payment History" ? (
        <TransactionList
          header={headerTableArr}
          data={data?.data?.purchase_payment_invoice}
          isLoading={isLoading}
          isInvoice={true}
        />
      ) : tabValue === "Item List" ? (
        <ItemList
          currencyConverter={currencyConverter}
          data={data?.data?.purchase_invoice_item}
          isLoading={isLoading}
          discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
          tax={currencyConverter.format(data?.data?.tax_amount)}
          sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
          total_amount={currencyConverter.format(data?.data?.total_amount)}
          navigation={navigation}
          handleDynamicPadding={handleDynamicPadding}
          dynamicPadding={dynamicPadding}
        />
      ) : tabValue === "Cost List" ? (
        <CostList data={data?.data?.purchase_invoice_cost} isLoading={isLoading} converter={currencyConverter} />
      ) : (
        <JournalList
          header={null}
          currencyConverter={currencyConverter}
          data={data?.data?.journal?.account}
          debit={data?.data?.journal?.account_sum_debit_amount}
          credit={data?.data?.journal?.account_sum_credit_amount}
        />
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
    borderRadius: 10,
    gap: 10,
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
