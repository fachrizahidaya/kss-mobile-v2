import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/Journal/DetailList";
import ItemList from "../../../components/Coin/Journal/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import { TextProps } from "../../../styles/CustomStylings";
import AmountList from "../../../components/Coin/Journal/AmountList";

const JournalDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

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

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Debit" }, { name: "Credit" }];

  const dataArr = [
    { name: "Journal Number", data: data?.data?.journal_no || "-" },
    { name: "Journal Date", data: dayjs(data?.data?.journal_date).format("DD/MM/YYYY") || "-" },
    { name: "Transaction Type", data: data?.data?.transaction_type?.name || "-" },
    { name: "Transaction Number", data: data?.data?.transaction_no || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
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
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={downloadJournalHandler}
          disabled={processJournalIsLoading}
        >
          {!processJournalIsLoading ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialCommunityIcons name={"download"} size={15} color="#FFFFFF" />
              <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>PDF</Text>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
      }
    >
      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: dynamicPadding }}>
          <View style={styles.content}>
            <Text style={[TextProps, { fontWeight: "600", fontSize: 16 }]}>General Info</Text>
          </View>
          <DetailList
            data={dataArr}
            isLoading={isLoading}
            journal_date={dayjs(data?.data?.journal_date).format("DD MMM YYYY")}
            journal_no={data?.data?.journal_no}
            transaction_type={data?.data?.transaction_type?.name}
            transaction_no={data?.data?.transaction_no}
            notes={data?.data?.notes}
          />
          <View style={styles.content}>
            <Text style={[TextProps, { fontWeight: "600", fontSize: 16 }]}>Journal Accounts</Text>
          </View>
          <ItemList
            header={headerTableArr}
            currencyConverter={currencyFormatter}
            data={data?.data?.account}
            isLoading={isLoading}
            debit={null}
            credit={null}
          />
        </ScrollView>
      </View>

      <AmountList
        isLoading={isLoading}
        debit={currencyFormatter.format(data?.data?.account_sum_debt_amount)}
        credit={currencyFormatter.format(data?.data?.account_sum_credit_amount)}
        currencyConverter={currencyFormatter}
        handleDynamicPadding={handleDynamicPadding}
      />

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
    marginTop: 14,
    marginHorizontal: 16,
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
