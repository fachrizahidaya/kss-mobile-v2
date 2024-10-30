import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Tabs from "../../../layouts/Tabs";
import { useFetch } from "../../../hooks/useFetch";
import ItemList from "../../../components/Coin/shared/ItemList";
import DetailList from "../../../components/Coin/shared/DetailList";
import Button from "../../../styles/forms/Button";
import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import TransactionList from "../../../components/Coin/PurchaseOrder/TransactionList";
import CustomBadge from "../../../styles/CustomBadge";

const PurchaseOrderDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

  const routes = useRoute();
  const navigation = useNavigation();

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessPO, isLoading: processPOIsLoading } = useLoading(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/purchase-order/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Item List`, value: "Item List" },
      { title: `Transaction History`, value: "Transaction History" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Date" }];

  const dataArr = [
    { name: "Purchase Order No.", data: data?.data?.po_no || "No Data" },
    { name: "Purchase Order Date", data: dayjs(data?.data?.po_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Due Date", data: dayjs(data?.data?.due_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Supplier", data: data?.data?.supplier?.name || "No Data" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "No Data" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "No Data" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Courier", data: data?.data?.courier?.name || "No Data" },
    { name: "FoB", data: data?.data?.fob?.name || "No Data" },
    { name: "Notes", data: data?.data?.notes || "No Data" },
  ];

  const downloadPurchaseOrderHandler = async () => {
    try {
      toggleProcessPO();
      const res = await axiosInstance.get(`/acc/purchase-order/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessPO();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessPO();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.po_no || "Purchase Order Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <CustomBadge
            description={data?.data?.status}
            backgroundColor={
              data?.data?.status === "Pending"
                ? "#e2e3e5"
                : data?.data?.status === "In Progress"
                ? "#fef9c3"
                : "#dcfce6"
            }
            textColor={
              data?.data?.status === "Pending"
                ? "#65758c"
                : data?.data?.status === "In Progress"
                ? "#cb8c09"
                : "#16a349"
            }
          />

          <Button
            paddingHorizontal={10}
            paddingVertical={8}
            onPress={() => downloadPurchaseOrderHandler()}
            disabled={processPOIsLoading}
          >
            {!processPOIsLoading ? (
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
        <View style={styles.wrapper}>
          <ItemList
            currencyConverter={currencyConverter}
            data={data?.data?.purchase_order_item}
            isLoading={isLoading}
            discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
            tax={currencyConverter.format(data?.data?.tax_amount)}
            sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
            total_amount={currencyConverter.format(data?.data?.total_amount)}
            navigation={navigation}
            handleDynamicPadding={handleDynamicPadding}
            dynamicPadding={dynamicPadding}
          />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <TransactionList
            header={headerTableArr}
            data={data?.data?.receive_purchase_order_item}
            isLoading={isLoading}
            isInvoice={false}
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

export default PurchaseOrderDetail;

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
