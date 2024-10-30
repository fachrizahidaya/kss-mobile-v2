import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import ItemList from "../../../components/Coin/DeliveryOrder/ItemList";
import JournalList from "../../../components/Coin/ReceiptPurchaseOrder/JournalList";
import Button from "../../../styles/forms/Button";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import CustomBadge from "../../../styles/CustomBadge";

const ReceiptPurchaseOrderDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const routes = useRoute();
  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const { id } = routes.params;

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessReceivePurchase, isLoading: processReceivePurchaseIsLoading } = useLoading(false);

  const { data, isLoading } = useFetch(`/acc/receive-purchase-order/${id}`);

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Item List`, value: "Item List" },
      { title: `Journal`, value: "Journal" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Receive PO No.", data: data?.data?.receive_no || "No Data" },
    { name: "Received From", data: data?.data?.supplier?.name || "No Data" },
    { name: "Receive PO Date", data: dayjs(data?.data?.receive_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Receive No. from Supplier", data: data?.data?.receive_no_supplier || "No Data" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "No Data" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Journal No.", data: data?.data?.journal?.journal_no || "No Data" },
    { name: "Notes", data: data?.data?.notes || "No Data" },
  ];

  const headerTableArr = [{ name: "Account" }, { name: "Debit" }, { name: "Credit" }];

  const downloadReceivePurchaseHandler = async () => {
    try {
      toggleProcessReceivePurchase();
      const res = await axiosInstance.get(`/acc/receive-purchase-order/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessReceivePurchase();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessReceivePurchase();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.receive_no || "Receive PO Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <CustomBadge
            description={data?.data?.status}
            backgroundColor={data?.data?.status === "Received" ? "#dcfce6" : "#fef9c3"}
            textColor={data?.data?.status === "Received" ? "#16a349" : "#cb8c09"}
          />

          <Button
            paddingHorizontal={10}
            paddingVertical={8}
            onPress={() => downloadReceivePurchaseHandler()}
            disabled={processReceivePurchaseIsLoading}
          >
            {!processReceivePurchaseIsLoading ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <MaterialCommunityIcons name={"download"} size={15} color="#FFFFFF" />
                <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>PDF</Text>
              </View>
            ) : (
              <ActivityIndicator />
            )}
          </Button>
        </View>
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : tabValue === "Item List" ? (
        <View style={styles.tableContent}>
          <ItemList data={data?.data?.receive_purchase_order_item} isLoading={isLoading} navigation={navigation} />
        </View>
      ) : (
        <View style={styles.tableContent}>
          <JournalList
            header={headerTableArr}
            currencyConverter={currencyConverter}
            data={data?.data?.journal?.account}
            isLoading={isLoading}
            debit={currencyConverter.format(data?.data?.journal?.account_sum_debt_amount)}
            credit={currencyConverter.format(data?.data?.journal?.account_sum_credit_amount)}
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

export default ReceiptPurchaseOrderDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFFFFF",
    marginVertical: 14,
    marginHorizontal: 16,
    borderRadius: 10,
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
  tableContent: {
    gap: 10,
  },
});
