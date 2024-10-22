import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/Journal/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";

const JournalDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
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
      { title: `General Info`, value: "General Info" },
      { title: `Account List`, value: "Account List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Debit" }, { name: "Credit" }];

  const dataArr = [
    { name: "Journal Number", data: data?.data?.journal_no || "No Data" },
    { name: "Journal Date", data: dayjs(data?.data?.journal_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Transaction Type", data: data?.data?.transaction_type?.name || "No Data" },
    { name: "Transaction Number", data: data?.data?.transaction_no || "No Data" },
    { name: "Notes", data: data?.data?.notes || "No Data" },
  ];

  const downloadJournalHandler = async () => {
    try {
      toggleProcessJournal();
      const res = await axiosInstance.get(`/acc/journal/${id}/print-pdf`);
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
      screenTitle={data?.data?.journal_no || "Journal Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      // childrenHeader={
      //   <Button
      //     paddingHorizontal={10}
      //     paddingVertical={8}
      //     onPress={downloadJournalHandler}
      //     disabled={processJournalIsLoading}
      //   >
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
    gap: 10,
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
