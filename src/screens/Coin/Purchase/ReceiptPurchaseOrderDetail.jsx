import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { SafeAreaView, StyleSheet, View } from "react-native";

import PageHeader from "../../../styles/PageHeader";
import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/ReceiptPurchaseOrder/DetailList";
import { useFetch } from "../../../hooks/useFetch";

const ReceiptPurchaseOrderDetail = () => {
  const [tabValue, setTabValue] = useState("Receipt Detail");

  const navigation = useNavigation();
  const routes = useRoute();

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/po-receipt/${id}`);

  const tabs = useMemo(() => {
    return [{ title: `Receipt Detail`, value: "Receipt Detail" }];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Receipt Date", data: dayjs(data?.data?.receipt_date).format("DD/MM/YYYY") },
    { name: "Receipt Number", data: data?.data?.receipt_no },
    { name: "Notes", data: data?.data?.notes },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader
          title={data?.data?.receipt_no || "Receipt Purchase Order Detail"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "Receipt Detail" && (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReceiptPurchaseOrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
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
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
