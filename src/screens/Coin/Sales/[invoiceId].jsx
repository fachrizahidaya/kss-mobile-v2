import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import Button from "../../../styles/forms/Button";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/shared/ItemList";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import CostList from "../../../components/Coin/PurchaseOrder/CostList";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

const InvoiceDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

  const routes = useRoute();
  const navigation = useNavigation();

  const { toggle: toggleProcessInvoice, isLoading: processInvoiceIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/sales-invoice/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Items`, value: "Item List" },
      { title: `Costs`, value: "Costs" },
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
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "-" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "-" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "-" },
    { name: "Courier", data: data?.data?.courier?.name || "-" },
    { name: "FoB", data: data?.data?.fob?.name || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const downloadInvoiceHandler = async () => {
    try {
      toggleProcessInvoice();
      const res = await axiosInstance.get(`/acc/sales-invoice/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessInvoice();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessInvoice();
    }
  };

  return (
    <Screen
      screenTitle="Sales Invoice"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <FormButton
          isSubmitting={processInvoiceIsLoading}
          onPress={downloadInvoiceHandler}
          disabled={processInvoiceIsLoading}
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
      {tabValue === "General Info" ? (
        <ScrollView>
          <DetailList
            data={dataArr}
            isLoading={isLoading}
            total_amount={currencyConverter.format(data?.data?.total_amount)}
            doc_no={data?.data?.invoice_no}
            currency={data?.data?.customer?.currency?.name}
            status={data?.data?.status}
            date={dayjs(data?.data?.invoice_date).format("DD MMM YYYY")}
            title="Invoice"
            backgroundColor={
              data?.data?.status === "Unpaid" ? "#e2e3e5" : data?.data?.status === "Partially" ? "#fef9c3" : "#dcfce6"
            }
            textColor={
              data?.data?.status === "Unpaid" ? "#65758c" : data?.data?.status === "Partially" ? "#cb8c09" : "#16a349"
            }
          />
        </ScrollView>
      ) : tabValue === "Item List" ? (
        <ItemList
          data={data?.data?.sales_invoice_item}
          isLoading={isLoading}
          currencyConverter={currencyConverter}
          discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
          tax={currencyConverter.format(data?.data?.tax_amount)}
          sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
          total_amount={currencyConverter.format(data?.data?.total_amount)}
          navigation={navigation}
          handleDynamicPadding={handleDynamicPadding}
          dynamicPadding={dynamicPadding}
        />
      ) : (
        <CostList data={data?.data?.sales_invoice_cost} isLoading={isLoading} converter={currencyConverter} />
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

export default InvoiceDetail;

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
