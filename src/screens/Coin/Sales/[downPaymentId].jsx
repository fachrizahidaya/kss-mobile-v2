import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import { useLoading } from "../../../hooks/useLoading";
import { useFetch } from "../../../hooks/useFetch";
import { useDisclosure } from "../../../hooks/useDisclosure";
import axiosInstance from "../../../config/api";
import Tabs from "../../../layouts/Tabs";
import Button from "../../../styles/forms/Button";
import Screen from "../../../layouts/Screen";
import DetailList from "../../../components/Coin/shared/DetailList";
import AlertModal from "../../../styles/modals/AlertModal";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

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
      // { title: `Customer Detail`, value: "Customer Detail" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Sales Order No.", data: data?.data?.sales_order?.so_no || "-" },
    { name: "Purchase Order No.", data: data?.data?.po_no || "-" },
    { name: "Customer", data: data?.data?.customer?.name || "-" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "-" },
    { name: "Address", data: data?.data?.address || "-" },
    { name: "Tax", data: data?.data?.tax || "-" },
    { name: "Tax Date", data: dayjs(data?.data?.tax_date).format("DD/MM/YYYY") || "-" },
    { name: "Credit Limit Days", data: data?.data?.customer?.credit_limit_days || "-" },
    {
      name: "Credit Limit Amount",
      data: currencyConverter.format(data?.data?.customer?.credit_limit_amount) || "-",
    },
    { name: "Billing Address", data: data?.data?.customer?.billing_address || "-" },
    { name: "Shipping Address", data: data?.data?.customer?.shipping_address || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const dataDetail = [
    { name: "Credit Limit Days", data: data?.data?.customer?.credit_limit_days || "-" },
    {
      name: "Credit Limit Amount",
      data: currencyConverter.format(data?.data?.customer?.credit_limit_amount) || "-",
    },
    { name: "Billing Address", data: data?.data?.customer?.billing_address || "-" },
    { name: "Shipping Address", data: data?.data?.customer?.shipping_address || "-" },
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
      screenTitle="Sales Down Payment"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <FormButton
          isSubmitting={processDPIsLoading}
          onPress={downloadDownPaymentHandler}
          disabled={processDPIsLoading}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialCommunityIcons name="download" size={15} color={Colors.iconLight} />
            <Text style={{ color: Colors.fontLight }}>PDF</Text>
          </View>
        </FormButton>
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      <ScrollView>
        <DetailList
          data={dataArr}
          isLoading={isLoading}
          title="Down Payment"
          doc_no={data?.data?.dp_no}
          total_amount={currencyConverter.format(data?.data?.dp_amount)}
          currency={data?.data?.customer?.currency?.name}
          status={data?.data?.status}
          date={dayjs(data?.data?.dp_date).format("DD MMM YYYY")}
          backgroundColor={
            data?.data?.status === "Pending" ? "#e2e3e5" : data?.data?.status === "Partially" ? "#fef9c3" : "#dcfce6"
          }
          textColor={
            data?.data?.status === "Pending" ? "#65758c" : data?.data?.status === "Partially" ? "#cb8c09" : "#16a349"
          }
        />
      </ScrollView>

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
  tableContent: {
    gap: 10,
    position: "relative",
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
