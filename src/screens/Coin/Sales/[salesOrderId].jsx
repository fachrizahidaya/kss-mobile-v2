import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/shared/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import CostList from "../../../components/Coin/PurchaseOrder/CostList";
import { Colors } from "../../../styles/Color";

const SalesOrderDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessSO, isLoading: processSOIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/sales-order/${id}`);

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
    { name: "Purchase Order No.", data: data?.data?.po_no || "-" },
    { name: "Due Date", data: dayjs(data?.data?.due_date).format("DD/MM/YYYY") || "-" },
    { name: "Sales Person", data: data?.data?.sales_person?.name || "-" },
    { name: "Customer", data: data?.data?.customer?.name || "-" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "-" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "-" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "-" },
    { name: "Courier", data: data?.data?.courier?.name || "-" },
    { name: "FoB", data: data?.data?.fob?.name || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const downloadSalesOrderHandler = async () => {
    try {
      toggleProcessSO();
      const res = await axiosInstance.get(`/acc/sales-order/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessSO();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessSO();
    }
  };

  return (
    <Screen
      screenTitle={"Sales Order"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadSalesOrderHandler()}
          disabled={processSOIsLoading}
        >
          {!processSOIsLoading ? (
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
            doc_no={data?.data?.so_no}
            currency={data?.data?.customer?.currency?.name}
            status={data?.data?.status}
            date={dayjs(data?.data?.so_date).format("DD MMM YYYY")}
            title="Sales Order"
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
        </ScrollView>
      ) : tabValue === "Item List" ? (
        <ItemList
          currencyConverter={currencyConverter}
          data={data?.data?.sales_order_item}
          isLoading={isLoading}
          discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
          tax={currencyConverter.format(data?.data?.tax_amount)}
          sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
          total_amount={currencyConverter.format(data?.data?.total_amount)}
          navigation={navigation}
          handleDynamicPadding={handleDynamicPadding}
          dynamicPadding={dynamicPadding}
        />
      ) : (
        <CostList data={data?.data?.sales_order_cost} isLoading={isLoading} converter={currencyConverter} />
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

export default SalesOrderDetail;

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
