import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/Payment/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import { TextProps } from "../../../styles/CustomStylings";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";

const BankTransferDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessBankTransfer, isLoading: processBankTransferIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/bank-transfer/${id}`);

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

  const downloadBankTransferHandler = async () => {
    try {
      toggleProcessBankTransfer();
      const res = await axiosInstance.get(`/acc/bank-transfer/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessBankTransfer();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessBankTransfer();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.transfer_no || "Bank Transfer Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      // childrenHeader={
      //   <Button
      //     paddingHorizontal={10}
      //     paddingVertical={8}
      //     onPress={downloadBankTransferHandler}
      //     disabled={processBankTransferIsLoading}
      //   >
      //     {!processBankTransferIsLoading ? (
      //       <Text style={[TextProps, { color: "#FFFFFF", fontWeight: "500", fontSize: 12 }]}>Download as PDF</Text>
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
    </Screen>
  );
};

export default BankTransferDetail;

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
