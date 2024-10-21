import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import Tabs from "../../../layouts/Tabs";
import Screen from "../../../layouts/Screen";
import DetailList from "../../../components/Coin/shared/DetailList";

const CustomerDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/customer/${id}`);

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Financial Info`, value: "Financial Info" },
      { title: `Tax Info`, value: "Tax Info" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Customer ID", data: data?.data?.code || "No Data" },
    { name: "Email", data: data?.data?.email || "No Data" },
    { name: "Phone Number", data: data?.data?.phone || "No Data" },
    { name: "Website", data: data?.data?.website || "No Data" },
    { name: "Billing Address", data: data?.data?.billing_address || "No Data" },
    { name: "City", data: data?.data?.city || "No Data" },
    { name: "Province", data: data?.data?.province || "No Data" },
    { name: "State", data: data?.data?.state || "No Data" },
    { name: "ZIP Code", data: data?.data?.zip_code || "No Data" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "No Data" },
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

  const financeData = [
    { name: "Currency", data: data?.data?.currency?.name || "No Data" },
    { name: "Payment Terms", data: data?.data?.terms_payment?.name || "No Data" },
    { name: "Credit Limit", data: data?.data?.credit_limit_amount || "No Data" },
    { name: "Price Category", data: data?.data?.price_category?.name || "No Data" },
    { name: "Discount Category", data: data?.data?.discount_category?.name || "No Data" },
    { name: "Credit Account", data: data?.data?.tax_state || "No Data" },
  ];

  return (
    <Screen screenTitle={data?.data?.name || "Customer Detail"} returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : tabValue === "Financial Info" ? (
        <View style={styles.content}>
          <DetailList data={financeData} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.content}>
          <DetailList data={taxData} isLoading={isLoading} />
        </View>
      )}
    </Screen>
  );
};

export default CustomerDetail;

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
