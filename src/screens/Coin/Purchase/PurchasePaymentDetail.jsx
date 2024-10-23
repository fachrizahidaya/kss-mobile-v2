import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import { useDisclosure } from "../../../hooks/useDisclosure";
import Screen from "../../../layouts/Screen";
import Button from "../../../styles/forms/Button";
import { useLoading } from "../../../hooks/useLoading";
import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";
import Tabs from "../../../layouts/Tabs";
import AlertModal from "../../../styles/modals/AlertModal";
import JournalList from "../../../components/Coin/ReceiptPurchaseOrder/JournalList";
import DetailList from "../../../components/Coin/shared/DetailList";

const PurchasePaymentDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessPP, isLoading: processPPIsLoading } = useLoading(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/purchase-payment/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Journal`, value: "Journal" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Payment No.", data: data?.data?.payment_no || "No Data" },
    { name: "Payment Date", data: dayjs(data?.data?.payment_date).format("DD/MM/YYYY") || "No Data" },
    { name: "Supplier", data: data?.data?.supplier?.name || "No Data" },
    { name: "Bank", data: data?.data?.coa?.name || "No Data" },
    { name: "Payment Method", data: data?.data?.payment_method?.name || "No Data" },
    { name: "Notes", data: data?.data?.notes || "No Data" },
  ];

  const downloadPurchasePaymentHandler = async () => {
    try {
      toggleProcessPP();
      const res = await axiosInstance.get(`/acc/purchase-payment/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessPP();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessPP();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.payment_no || "Purchase Payment Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadPurchasePaymentHandler()}
          disabled={processPPIsLoading}
        >
          {!processPPIsLoading ? (
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
      {tabValue === "General Info" ? (
        <View style={styles.content}>
          <DetailList data={dataArr} isLoading={isLoading} />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <JournalList
            header={null}
            currencyConverter={currencyConverter}
            data={data?.data?.journal?.account}
            debit={data?.data?.journal?.account_sum_debt_amount}
            credit={data?.data?.journal?.account_sum_credit_amount}
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

export default PurchasePaymentDetail;

const styles = StyleSheet.create({
  content: {
    marginVertical: 14,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
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
