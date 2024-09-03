import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/Journal/DetailList";
import ItemList from "../../../components/Coin/Journal/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../styles/Screen";

const JournalDetail = () => {
  const [tabValue, setTabValue] = useState("Journal Detail");
  const [errorMessage, setErrorMessage] = useState(null);

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
    <Screen
      screenTitle={data?.data?.journal_no || "Journal Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button paddingHorizontal={10} paddingVertical={8} onPress={null} disabled={processJournalIsLoading}>
          {!processJournalIsLoading ? (
            <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "Journal Detail" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.wrapper}>
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
    </Screen>
  );
};

export default JournalDetail;

const styles = StyleSheet.create({
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
  wrapper: {
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
