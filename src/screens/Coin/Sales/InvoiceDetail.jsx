import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../../styles/forms/Button";
import PageHeader from "../../../styles/PageHeader";
import { TextProps } from "../../../styles/CustomStylings";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/shared/ItemList";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ItemDetail from "../../../components/Coin/shared/ItemDetail";
import AlertModal from "../../../styles/modals/AlertModal";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title={data?.data?.invoice_no || "Invoice Detail"} onPress={() => navigation.goBack()} />
        <Button height={35} padding={10} onPress={() => downloadInvoiceHandler()} disabled={processInvoiceIsLoading}>
          {!processInvoiceIsLoading ? (
            <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
      </View>

      <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 16 }}>
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
    </SafeAreaView>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
});
