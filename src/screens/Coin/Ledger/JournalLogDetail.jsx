import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import DetailList from "../../../components/Coin/Journal/DetailList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import ItemList from "../../../components/Coin/Journal/ItemList";
import Tabs from "../../../layouts/Tabs";
import Screen from "../../../layouts/Screen";

const JournalLogDetail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [tabValue, setTabValue] = useState("General Info");

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessJournal, isLoading: processJournalIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/journal/${id}`);

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
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

  const downloadJournalLogHandler = async () => {
    try {
      toggleProcessJournal();
      const res = await axiosInstance.get(`/acc/coa/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessJournal();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessJournal();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.journal_no || "Journal Log Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      // childrenHeader={
      //   <Button paddingHorizontal={10} paddingVertical={8} onPress={downloadJournalLogHandler} disabled={processJournalIsLoading}>
      //     {!processJournalIsLoading ? (
      //       <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
      //     ) : (
      //       <ActivityIndicator />
      //     )}
      //   </Button>
      // }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>

      {tabValue === "General Info" ? (
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
    </Screen>
  );
};

export default JournalLogDetail;

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
  tableContent: {
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
