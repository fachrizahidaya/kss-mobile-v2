import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

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

const PurchaseOrderDetail = () => {
  const [tabValue, setTabValue] = useState("Order Detail");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessPO, isLoading: processPOIsLoading } = useLoading(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/po/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `Order Detail`, value: "Order Detail" },
      { title: `Item List`, value: "Item List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Item" }, { name: "Qty" }, { name: "Total Amount" }];

  const dataArr = [
    { name: "PO Number", data: data?.data?.po_no },
    { name: "Purchase Date", data: dayjs(data?.data?.po_date).format("DD/MM/YYYY") },
    { name: "Supplier", data: data?.data?.supplier?.name },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name },
    { name: "Shipping Address", data: data?.data?.shipping_address },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") },
    { name: "Courier", data: data?.data?.courier?.name },
    { name: "FoB", data: data?.data?.fob?.name },
    { name: "Notes", data: data?.data?.notes },
  ];

  const downloadPurchaseOrderHandler = async () => {
    try {
      toggleProcessPO();
      const res = await axiosInstance.get(`/acc/po/${id}/generate-po`);
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
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadPurchaseOrderHandler()}
          disabled={processPOIsLoading}
        >
          {!processPOIsLoading ? (
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
      {tabValue === "Order Detail" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <ItemList
            header={headerTableArr}
            currencyConverter={currencyConverter}
            data={data?.data?.po_item}
            isLoading={isLoading}
            discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
            tax={currencyConverter.format(data?.data?.tax_amount)}
            sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
            total_amount={currencyConverter.format(data?.data?.total_amount)}
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  wrapper: {
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
