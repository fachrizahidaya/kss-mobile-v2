import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

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
import { Colors } from "../../../styles/Color";
import FormButton from "../../../styles/buttons/FormButton";

const BankTransferDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

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
      { title: `Accounts`, value: "Account List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const headerTableArr = [{ name: "Acc. Code" }, { name: "Amount" }];

  const dataArr = [
    {
      name: "Bank (In)",
      data: `${data?.data?.from_coa?.code} - ${data?.data?.from_coa?.name}` || "-",
    },
    {
      name: "Bank (Out)",
      data: `${data?.data?.to_coa?.code ? data?.data?.to_coa?.code : null} - ${data?.data?.to_coa?.name}` || "-",
    },
    {
      name: "Amount Bank (In)",
      data:
        `${data?.data?.coa?.currency?.name ? data?.data?.coa?.currency?.name : ""} ${currencyFormatter.format(
          data?.data?.amount_from
        )}` || "-",
    },
    {
      name: "Amount Bank (Out)",
      data:
        `${data?.data?.coa?.currency?.name ? data?.data?.coa?.currency?.name : ""} ${currencyFormatter.format(
          data?.data?.amount_to
        )}` || "-",
    },
    { name: "Notes", data: data?.data?.notes || "-" },
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
      screenTitle="Bank Transfer"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <FormButton
          onPress={downloadBankTransferHandler}
          disabled={processBankTransferIsLoading}
          isSubmitting={processBankTransferIsLoading}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialCommunityIcons name="download" size={15} color={Colors.iconLight} />
            <Text style={{ color: Colors.fontLight }}>PDF</Text>
          </View>
        </FormButton>
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <ScrollView>
          <DetailList
            data={dataArr}
            isLoading={isLoading}
            total_amount={currencyFormatter.format(data?.data?.amount)}
            doc_no={data?.data?.transfer_no}
            currency={data?.data?.coa?.currency?.name}
            status={data?.data?.status}
            date={dayjs(data?.data?.transfer_date).format("DD MMM YYYY")}
            title="Transfer"
          />
        </ScrollView>
      ) : (
        <ItemList
          header={headerTableArr}
          currencyConverter={currencyFormatter}
          data={data?.data?.bank_transfer_account}
          isLoading={isLoading}
          total={currencyFormatter.format(data?.data?.amount)}
          handleDynamicPadding={handleDynamicPadding}
          dynamicPadding={dynamicPadding}
        />
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
    backgroundColor: Colors.secondary,
    marginHorizontal: 16,
    borderRadius: 10,
    gap: 10,
  },
  tableContent: {
    gap: 10,
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
