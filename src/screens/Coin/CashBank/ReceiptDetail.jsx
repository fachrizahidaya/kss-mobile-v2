import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/Payment/DetailList";
import ItemList from "../../../components/Coin/Payment/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import { TextProps } from "../../../styles/CustomStylings";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";

const ReceiptDetail = () => {
  const [tabValue, setTabValue] = useState("Receipt Detail");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessReceipt, isLoading: processReceiptIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/receipt/${id}`);

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `Receipt Detail`, value: "Receipt Detail" },
      { title: `Account List`, value: "Account List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Value" }];

  const dataArr = [
    { name: "Receipt Number", data: data?.data?.payment_no },
    { name: "Receipt Date", data: dayjs(data?.data?.payment_date).format("DD/MM/YYYY") },
    { name: "Bank", data: data?.data?.coa?.name },
    { name: "Value", data: currencyFormatter.format(data?.data?.total_amount) },
    { name: "Notes", data: data?.data?.notes },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title={data?.data?.payment_no || "Receipt Detail"} onPress={() => navigation.goBack()} />
        <Button paddingHorizontal={10} paddingVertical={8} onPress={null} disabled={processReceiptIsLoading}>
          {!processReceiptIsLoading ? (
            <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 16 }}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "Receipt Detail" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.tableContent}>
          <ItemList
            header={headerTableArr}
            currencyConverter={currencyFormatter}
            data={data?.data?.payment_account}
            isLoading={isLoading}
            total={currencyFormatter.format(data?.data?.total_amount)}
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
    </SafeAreaView>
  );
};

export default ReceiptDetail;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  tableContent: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
});
