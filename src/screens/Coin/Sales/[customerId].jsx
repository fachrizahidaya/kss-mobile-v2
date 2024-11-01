import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
    { name: "Customer ID", data: data?.data?.code || "-" },
    { name: "Customer Name", data: data?.data?.name || "-" },
    { name: "Email", data: data?.data?.email || "-" },
    { name: "Phone Number", data: data?.data?.phone || "-" },
    { name: "Website", data: data?.data?.website || "-" },
    { name: "Billing Address", data: data?.data?.billing_address || "-" },
    { name: "City", data: data?.data?.city || "-" },
    { name: "Province", data: data?.data?.province || "-" },
    { name: "State", data: data?.data?.state || "-" },
    { name: "ZIP Code", data: data?.data?.zip_code || "-" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "-" },
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

  const financeData = [
    { name: "Currency", data: data?.data?.currency?.name || "-" },
    { name: "Payment Terms", data: data?.data?.terms_payment?.name || "-" },
    { name: "Credit Limit", data: data?.data?.credit_limit_amount || "-" },
    { name: "Price Category", data: data?.data?.price_category?.name || "-" },
    { name: "Discount Category", data: data?.data?.discount_category?.name || "-" },
    { name: "Credit Account", data: data?.data?.tax_state || "-" },
  ];

  return (
    <Screen screenTitle={data?.data?.name || "Customer Detail"} returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <ScrollView>
          <DetailList data={dataArr} isLoading={isLoading} useHeader={false} />
        </ScrollView>
      ) : tabValue === "Financial Info" ? (
        <DetailList data={financeData} isLoading={isLoading} useHeader={false} />
      ) : (
        <DetailList data={taxData} isLoading={isLoading} useHeader={false} />
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
