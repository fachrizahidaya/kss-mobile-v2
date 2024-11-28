import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

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
import { Colors } from "../../../styles/Color";

const SalesReceiptDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

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
      { title: `Invoices`, value: "Invoice List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const dataArr = [
    { name: "Customer", data: data?.data?.customer?.name || "-" },
    { name: "Bank", data: data?.data?.coa?.name || "-" },
    { name: "Payment Method", data: data?.data?.payment_method?.name || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
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
      screenTitle={"Sales Receipt"}
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialCommunityIcons name={"download"} size={15} color={Colors.iconLight} />
              <Text style={{ color: Colors.fontLight, fontWeight: "500", fontSize: 12 }}>PDF</Text>
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
            doc_no={data?.data?.receipt_no}
            currency={data?.data?.customer?.currency?.name}
            date={dayjs(data?.data?.receipt_date).format("DD MMM YYYY")}
            title="Receipt"
          />
        </ScrollView>
      ) : (
        <InvoiceList
          currencyConverter={currencyConverter}
          data={data?.data?.sales_receipt_invoice}
          isLoading={isLoading}
          payment={currencyConverter.format(data?.data?.payment_amount)}
          paid={null}
          over={currencyConverter.format(data?.data?.overpayment_amount)}
          discount={null}
          dynamicPadding={dynamicPadding}
          handleDynamicPadding={handleDynamicPadding}
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

export default SalesReceiptDetail;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
