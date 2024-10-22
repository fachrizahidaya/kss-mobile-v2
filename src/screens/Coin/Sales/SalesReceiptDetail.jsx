import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import Button from "../../../styles/forms/Button";
import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import AlertModal from "../../../styles/modals/AlertModal";
import axiosInstance from "../../../config/api";
import InvoiceList from "../../../components/Coin/SalesReceipt/InvoiceList";

const SalesReceiptDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessSR, isLoading: processSRIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/sales-receipt/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Invoice List`, value: "Invoice List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Sales Receipt Date", data: dayjs(data?.data?.receipt_date).format("DD/MM/YYYY") },
    { name: "Customer", data: data?.data?.customer?.name },
    { name: "Bank", data: data?.data?.coa?.name },
    { name: "Payment Method", data: data?.data?.payment_method?.name },
    { name: "Notes", data: data?.data?.notes },
  ];

  const downloadSalesReceiptHandler = async () => {
    try {
      toggleProcessSR();
      const res = await axiosInstance.get(`/acc/sales-order/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessSR();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessSR();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.receipt_no || "Sales Order Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadSalesReceiptHandler()}
          disabled={processSRIsLoading}
        >
          {!processSRIsLoading ? (
            <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
      }
    >
      <View style={styles.header}></View>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.tableContent}>
          <InvoiceList
            currencyConverter={currencyConverter}
            data={data?.data?.sales_receipt_invoice}
            isLoading={isLoading}
            payment={currencyConverter.format(data?.data?.payment_amount)}
            paid={null}
            over={currencyConverter.format(data?.data?.overpayment_amount)}
            discount={null}
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

export default SalesReceiptDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFFFFF",
    marginVertical: 14,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  tableContent: {
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
