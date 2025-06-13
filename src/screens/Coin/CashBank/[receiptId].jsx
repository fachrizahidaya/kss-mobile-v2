import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/Payment/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

const ReceiptDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessReceipt, isLoading: processReceiptIsLoading } =
    useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/receipt/${id}`);

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Accounts`, value: "Account List" },
    ];
  }, []);

  const handleChangeTab = (value) => {
    setTabValue(value);
  };

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Value" }];

  const dataArr = [
    { name: "Bank", data: data?.data?.coa?.name || "-" },
    { name: "Value", data: currencyFormatter.format(data?.data?.total_amount) || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const handleDownload = async () => {
    try {
      toggleProcessReceipt();
      const res = await axiosInstance.get(`/acc/coa/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessReceipt();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessReceipt();
    }
  };

  return (
    <Screen
      screenTitle="Receipt"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <FormButton
          isSubmitting={processReceiptIsLoading}
          onPress={handleDownload}
          disabled={processReceiptIsLoading}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialCommunityIcons name="download" size={15} color={Colors.iconLight} />
            <Text style={{ color: Colors.fontLight }}>PDF</Text>
          </View>
        </FormButton>
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={handleChangeTab} />
      </View>
      {tabValue === "General Info" ? (
        <ScrollView>
          <DetailList
            data={dataArr}
            isLoading={isLoading}
            total_amount={currencyFormatter.format(data?.data?.total_amount)}
            doc_no={data?.data?.receipt_no}
            currency={data?.data?.coa?.currency?.name}
            status={data?.data?.status}
            date={dayjs(data?.data?.payment_date).format("DD MMM YYYY")}
            title="Receipt"
          />
        </ScrollView>
      ) : (
        <ItemList
          header={headerTableArr}
          currencyConverter={currencyFormatter}
          data={data?.data?.receipt_account}
          isLoading={isLoading}
          total={currencyFormatter.format(data?.data?.total_amount)}
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

export default ReceiptDetail;

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
