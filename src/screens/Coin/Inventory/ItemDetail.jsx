import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Screen from "../../../layouts/Screen";
import { useFetch } from "../../../hooks/useFetch";
import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";

const ItemDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;
  const { data, isLoading } = useFetch(`/acc/item/${id}`);

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Sell/Purchase`, value: "Sell Purchase" },
      { title: `Other`, value: "Other" },
      { title: `Account`, value: "Account" },
      { title: `Stock`, value: "Stock" },
      { title: `Mutation`, value: "Mutation" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "SKU", data: data?.data?.sku },
    { name: "Category", data: data?.data?.item_category?.name },
  ];

  const dataOther = [
    { name: "Length", data: data?.data?.long },
    { name: "Width", data: data?.data?.wide },
    { name: "Height", data: data?.data?.height },
    { name: "Weight", data: data?.data?.weight },
  ];

  const dataSellPurchase = [
    { name: "Discount", data: data?.data?.default_discount },
    { name: "Tax", data: data?.data?.tax?.name },
    { name: "Supplier", data: data?.data?.supplier },
    { name: "Purchase Unit", data: data?.data?.purchase_unit?.name },
    { name: "Purchase Price", data: data?.data?.purchase_price },
    { name: "Minimum Purchase", data: data?.data?.min_purchase },
    { name: "Minimum Stock", data: data?.data?.min_stock },
  ];

  return (
    <Screen screenTitle={data?.data?.name || "Item Detail"} returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : tabValue === "Sell Purchase" ? (
        <View style={styles.content}>
          <DetailList data={dataSellPurchase} isLoading={isLoading} />
        </View>
      ) : tabValue === "Other" ? (
        <View style={styles.content}>
          <DetailList data={dataOther} isLoading={isLoading} />
        </View>
      ) : tabValue === "Stock" ? (
        <View style={styles.content}></View>
      ) : tabValue === "Account" ? (
        <View style={styles.content}></View>
      ) : (
        <View style={styles.content}></View>
      )}
    </Screen>
  );
};

export default ItemDetail;

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
