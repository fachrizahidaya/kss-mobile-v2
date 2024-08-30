import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";

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

const BankTransferDetail = () => {
  const [tabValue, setTabValue] = useState("Transfer Detail");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessJournal, isLoading: processJournalIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/bank-transfer/${id}`);

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `Transfer Detail`, value: "Transfer Detail" },
      { title: `Account List`, value: "Account List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Acc. Code" }, { name: "Amount" }];

  const dataArr = [
    { name: "Transfer Number", data: data?.data?.transfer_no },
    { name: "Transfer Date", data: dayjs(data?.data?.transfer_date).format("DD/MM/YYYY") },
    { name: "Bank (In)", data: `${data?.data?.from_coa?.code} - ${data?.data?.from_coa?.name}` },
    { name: "Bank (Out)", data: `${data?.data?.to_coa?.code} - ${data?.data?.to_coa?.name}` },
    { name: "Amount Bank (In)", data: currencyFormatter.format(data?.data?.amount_from) },
    { name: "Amount Bank (Out)", data: currencyFormatter.format(data?.data?.amount_to) },

    { name: "Notes", data: data?.data?.notes },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title={data?.data?.transfer_no || "Bank Transfer Detail"} onPress={() => navigation.goBack()} />
        {/* <Button  paddingHorizontal={10}
          paddingVertical={8} onPress={null} disabled={processJournalIsLoading}>
          {!processJournalIsLoading ? (
            <Text style={[TextProps, { color: "#FFFFFF", fontWeight: "500", fontSize: 12 }]}>Download as PDF</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button> */}
      </View>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "Transfer Detail" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.tableContent}>
          <ItemList
            header={headerTableArr}
            currencyConverter={currencyFormatter}
            data={data?.data?.bank_transfer_account}
            isLoading={isLoading}
            total={currencyFormatter.format(data?.data?.amount)}
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

export default BankTransferDetail;

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
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
