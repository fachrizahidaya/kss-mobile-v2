import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import DetailList from "../../../components/Coin/Journal/DetailList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import { TextProps } from "../../../styles/CustomStylings";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import ItemList from "../../../components/Coin/Journal/ItemList";
import Tabs from "../../../styles/Tabs";

const JournalLogDetail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [tabValue, setTabValue] = useState("Journal Detail");

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessJournal, isLoading: processJournalIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/journal/${id}`);

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `Journal Detail`, value: "Journal Detail" },
      { title: `Account List`, value: "Account List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Debit" }, { name: "Credit" }];

  const dataArr = [
    { name: "Journal Number", data: data?.data?.journal_no },
    { name: "Journal Date", data: dayjs(data?.data?.journal_date).format("DD/MM/YYYY") },
    { name: "Transaction Type", data: data?.data?.transaction_type?.name },
    { name: "Transaction Number", data: data?.data?.transaction_no },
    { name: "Notes", data: data?.data?.notes },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title={data?.data?.journal_no || "Journal Log Detail"} onPress={() => navigation.goBack()} />
        {/* <Button height={35} padding={10} onPress={null} disabled={processJournalIsLoading}>
          {!processJournalIsLoading ? (
            <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button> */}
      </View>
      <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 16 }}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>

      {tabValue === "Journal Detail" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.tableContent}>
          <ItemList
            header={headerTableArr}
            currencyConverter={currencyFormatter}
            data={data?.data?.account}
            isLoading={isLoading}
            debit={currencyFormatter.format(data?.data?.account_sum_debt_amount)}
            credit={currencyFormatter.format(data?.data?.account_sum_credit_amount)}
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

export default JournalLogDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  tableContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
});
