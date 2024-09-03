import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { StyleSheet, View } from "react-native";

import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/ReceiptPurchaseOrder/DetailList";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../styles/Screen";

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
    <Screen
      screenTitle={data?.data?.receipt_no || "Receipt Purchase Order Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "Receipt Detail" && (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      )}
    </Screen>
  );
};

export default ReceiptPurchaseOrderDetail;

const styles = StyleSheet.create({
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
