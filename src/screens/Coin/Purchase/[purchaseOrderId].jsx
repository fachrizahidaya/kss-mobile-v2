import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import Tabs from "../../../layouts/Tabs";
import { useFetch } from "../../../hooks/useFetch";
import ItemList from "../../../components/Coin/shared/ItemList";
import DetailList from "../../../components/Coin/shared/DetailList";
import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import TransactionList from "../../../components/Coin/PurchaseOrder/TransactionList";
import CostList from "../../../components/Coin/PurchaseOrder/CostList";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

const PurchaseOrderDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

  const routes = useRoute();
  const navigation = useNavigation();

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessPO, isLoading: processPOIsLoading } = useLoading(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/purchase-order/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Items`, value: "Item List" },
      { title: `Costs`, value: "Costs" },
      { title: `Transaction History`, value: "Transaction History" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Date" }];

  const dataArr = [
    { name: "Due Date", data: dayjs(data?.data?.due_date).format("DD/MM/YYYY") || "-" },
    { name: "Supplier", data: data?.data?.supplier?.name || "-" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "-" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "-" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "-" },
    { name: "Courier", data: data?.data?.courier?.name || "-" },
    { name: "FoB", data: data?.data?.fob?.name || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const downloadPurchaseOrderHandler = async () => {
    try {
      toggleProcessPO();
      const res = await axiosInstance.get(`/acc/purchase-order/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessPO();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessPO();
    }
  };

  return (
    <Screen
      screenTitle="Purchase Order"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <FormButton
          isSubmitting={processPOIsLoading}
          onPress={downloadPurchaseOrderHandler}
          disabled={processPOIsLoading}
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
            total_amount={currencyConverter.format(data?.data?.total_amount)}
            doc_no={data?.data?.po_no}
            currency={data?.data?.supplier?.currency?.name}
            status={data?.data?.status}
            date={dayjs(data?.data?.po_date).format("DD MMM YYYY")}
            title="Purchase Order"
            backgroundColor={
              data?.data?.status === "Pending" ? "#e2e3e5" : data?.data?.status === "Partially" ? "#fef9c3" : "#dcfce6"
            }
            textColor={
              data?.data?.status === "Pending" ? "#65758c" : data?.data?.status === "Partially" ? "#cb8c09" : "#16a349"
            }
          />
        </ScrollView>
      ) : tabValue === "Item List" ? (
        <ItemList
          currencyConverter={currencyConverter}
          data={data?.data?.purchase_order_item}
          isLoading={isLoading}
          discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
          tax={currencyConverter.format(data?.data?.tax_amount)}
          sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
          total_amount={currencyConverter.format(data?.data?.total_amount)}
          navigation={navigation}
          handleDynamicPadding={handleDynamicPadding}
          dynamicPadding={dynamicPadding}
        />
      ) : tabValue === "Transaction History" ? (
        <TransactionList
          header={headerTableArr}
          data={data?.data?.receive_purchase_order_item}
          isLoading={isLoading}
          isInvoice={false}
        />
      ) : (
        <CostList data={data?.data?.purchase_order_cost} isLoading={isLoading} converter={currencyConverter} />
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

export default PurchaseOrderDetail;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
