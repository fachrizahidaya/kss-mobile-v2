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
    { name: "Email", data: data?.data?.email || "No Data" },
    { name: "Phone Number", data: data?.data?.phone || "No Data" },
    { name: "Website", data: data?.data?.website || "No Data" },
    { name: "Address", data: data?.data?.address || "No Data" },
    { name: "City", data: data?.data?.city || "No Data" },
    { name: "Province", data: data?.data?.province || "No Data" },
    { name: "State", data: data?.data?.state || "No Data" },
    { name: "ZIP Code", data: data?.data?.zip_code || "No Data" },
    { name: "Category", data: data?.data?.supplier_category?.name || "No Data" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "No Data" },
  ];

  const taxData = [
    { name: "Tax Number", data: data?.data?.tax_no || "No Data" },
    { name: "Tax Account", data: data?.data?.tax_account || "No Data" },
    { name: "Tax Address", data: data?.data?.tax_address || "No Data" },
    { name: "Tax City", data: data?.data?.tax_city || "No Data" },
    { name: "Tax Province", data: data?.data?.tax_province || "No Data" },
    { name: "Tax State", data: data?.data?.tax_state || "No Data" },
    { name: "Tax ZIP Code", data: data?.data?.tax_zip_code || "No Data" },
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
