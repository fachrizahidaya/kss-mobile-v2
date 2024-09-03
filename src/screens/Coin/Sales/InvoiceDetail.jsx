import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Button from "../../../styles/forms/Button";
import PageHeader from "../../../styles/PageHeader";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/shared/ItemList";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ItemDetail from "../../../components/Coin/shared/ItemDetail";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../styles/Screen";

const InvoiceDetail = () => {
  const [tabValue, setTabValue] = useState("Invoice Detail");
  const [itemDetailData, setItemDetailData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { toggle: toggleProcessInvoice, isLoading: processInvoiceIsLoading } = useLoading(false);

  const { toggle: toggleItemDetail, isOpen: itemDetailIsOpen } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/sales-invoice/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `Invoice Detail`, value: "Invoice Detail" },
      { title: `Item List`, value: "Item List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Item" }, { name: "Qty" }, { name: "Total Amount" }];

  const dataArr = [
    { name: "Invoice Number", data: data?.data?.invoice_no },
    { name: "Invoice Date", data: dayjs(data?.data?.invoice_date).format("DD/MM/YYYY") },
    { name: "Customer", data: data?.data?.customer?.name },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name },
    { name: "Shipping Address", data: data?.data?.shipping_address },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") },
    { name: "Courier", data: data?.data?.courier?.name },
    { name: "FoB", data: data?.data?.fob?.name },
    { name: "Notes", data: data?.data?.notes },
  ];

  const openItemDetailModalHandler = (value) => {
    toggleItemDetail();
    setItemDetailData(value);
  };

  const closeItemDetailModalHandler = () => {
    toggleItemDetail();
    setItemDetailData(null);
  };

  const downloadInvoiceHandler = async () => {
    try {
      toggleProcessInvoice();
      const res = await axiosInstance.get(`/acc/sales-invoice/${id}/generate-invoice`);
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
      screenTitle={data?.data?.invoice_no || "Invoice Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadInvoiceHandler()}
          disabled={processInvoiceIsLoading}
        >
          {!processInvoiceIsLoading ? (
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
      {tabValue === "Invoice Detail" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <ItemList
            header={headerTableArr}
            data={data?.data?.sales_invoice_item}
            isLoading={isLoading}
            currencyConverter={currencyConverter}
            discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
            tax={currencyConverter.format(data?.data?.tax_amount)}
            sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
            total_amount={currencyConverter.format(data?.data?.total_amount)}
            toggleModal={openItemDetailModalHandler}
          />
        </View>
      )}
      <ItemDetail
        visible={itemDetailIsOpen}
        backdropPress={toggleItemDetail}
        onClose={closeItemDetailModalHandler}
        data={itemDetailData}
        converter={currencyConverter}
      />
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
  content: {
    marginVertical: 8,
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
    marginVertical: 8,
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
