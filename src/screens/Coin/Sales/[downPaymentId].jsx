import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import { useLoading } from "../../../hooks/useLoading";
import { useFetch } from "../../../hooks/useFetch";
import { useDisclosure } from "../../../hooks/useDisclosure";
import axiosInstance from "../../../config/api";
import Tabs from "../../../layouts/Tabs";
import Button from "../../../styles/forms/Button";
import Screen from "../../../layouts/Screen";
import DetailList from "../../../components/Coin/shared/DetailList";
import AlertModal from "../../../styles/modals/AlertModal";

const DownPaymentDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessDP, isLoading: processDPIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/sales-down-payment/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Customer Detail`, value: "Customer Detail" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Down Payment No.", data: data?.data?.dp_no || "No Data" },
    { name: "Down Payment Date", data: dayjs(data?.data?.dp_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Sales Order No.", data: data?.data?.sales_order?.so_no || "No Data" },
    { name: "Purchase Order No.", data: data?.data?.po_no || "No Data" },
    { name: "Customer", data: data?.data?.customer?.name || "No Data" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "No Data" },
    { name: "Tax", data: data?.data?.tax || "No Data" },
    { name: "Tax Date", data: dayjs(data?.data?.tax_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Notes", data: data?.data?.notes || "No Data" },
  ];

  const dataDetail = [
    { name: "Credit Limit Days", data: data?.data?.customer?.credit_limit_days || "No Data" },
    {
      name: "Credit Limit Amount",
      data: currencyConverter.format(data?.data?.customer?.credit_limit_amount) || "No Data",
    },
    { name: "Billing Address", data: data?.data?.customer?.billing_address || "No Data" },
    { name: "Shipping Address", data: data?.data?.customer?.shipping_address || "No Data" },
  ];

  const downloadDownPaymentHandler = async () => {
    try {
      toggleProcessDP();
      const res = await axiosInstance.get(`/acc/sales-order/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessDP();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessDP();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.dp_no || "DP Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadDownPaymentHandler()}
          disabled={processDPIsLoading}
        >
          {!processDPIsLoading ? (
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
        <View style={styles.content}>
          <DetailList data={dataDetail} isLoading={isLoading} />
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

export default DownPaymentDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFFFFF",
    marginVertical: 14,
    marginHorizontal: 16,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  tableContent: {
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
