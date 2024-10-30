import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";

import Tabs from "../../../layouts/Tabs";
import { useFetch } from "../../../hooks/useFetch";
import DetailList from "../../../components/Coin/shared/DetailList";
import Screen from "../../../layouts/Screen";
import ItemList from "../../../components/Coin/Supplier/ItemList";

const SupplierDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/supplier/${id}`);

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Tax Info`, value: "Tax Info" },
      { title: `Contact`, value: "Contact" },
      { title: `Bank Detail`, value: "Bank Detail" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Date" }];

  const dataArr = [
    { name: "Name", data: data?.data?.name || "-" },
    { name: "Email", data: data?.data?.email || "-" },
    { name: "Phone Number", data: data?.data?.phone || "-" },
    { name: "Website", data: data?.data?.website || "-" },
    { name: "Address", data: data?.data?.address || "-" },
    { name: "City", data: data?.data?.city || "-" },
    { name: "Province", data: data?.data?.province || "-" },
    { name: "State", data: data?.data?.state || "-" },
    { name: "ZIP Code", data: data?.data?.zip_code || "-" },
    { name: "Category", data: data?.data?.supplier_category?.name || "-" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "-" },
  ];

  const taxData = [
    { name: "Tax Number", data: data?.data?.tax_no || "-" },
    { name: "Tax Account", data: data?.data?.tax_account || "-" },
    { name: "Tax Address", data: data?.data?.tax_address || "-" },
    { name: "Tax City", data: data?.data?.tax_city || "-" },
    { name: "Tax Province", data: data?.data?.tax_province || "-" },
    { name: "Tax State", data: data?.data?.tax_state || "-" },
    { name: "Tax ZIP Code", data: data?.data?.tax_zip_code || "-" },
  ];

  return (
    <Screen screenTitle={data?.data?.name || "Supplier Detail"} returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : tabValue === "Tax Info" ? (
        <View style={styles.content}>
          <DetailList data={taxData} isLoading={isLoading} />
        </View>
      ) : tabValue === "Contact" ? (
        <View style={styles.wrapper}>
          <ItemList data={data?.data?.supplier_contact} isLoading={isLoading} isBank={false} />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <ItemList data={data?.data?.supplier_bank} isLoading={isLoading} isBank={true} />
        </View>
      )}
    </Screen>
  );
};

export default SupplierDetail;

const styles = StyleSheet.create({
  content: {
    marginVertical: 14,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 10,
    gap: 10,
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
