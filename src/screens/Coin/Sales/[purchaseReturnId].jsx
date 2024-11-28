import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import AlertModal from "../../../styles/modals/AlertModal";
import Tabs from "../../../layouts/Tabs";
import { useFetch } from "../../../hooks/useFetch";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/shared/ItemList";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const PurchaseReturnDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

  const routes = useRoute();
  const navigation = useNavigation();

  const { toggle: toggleProcessReturn, isLoading: processReturnIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { id } = routes.params;

  const { data, isLoading } = useFetch(`/acc/purchase-return/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Items`, value: "Item List" },
      { title: `Costs`, value: "Costs" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const handleDynamicPadding = (value) => {
    setDynamicPadding(value);
  };

  const dataArr = [
    { name: "Supplier", data: data?.data?.supplier?.name || "-" },
    { name: "Invoice No. Supplier", data: data?.data?.invoice_no_supplier || "-" },
    { name: "Terms of Payment", data: data?.data?.terms_payment?.name || "-" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "-" },
    { name: "Courier", data: data?.data?.courier?.name || "-" },
    { name: "FoB", data: data?.data?.fob?.name || "-" },
    { name: "Supplier Address", data: data?.data?.supplier?.address || "-" },
    { name: "Journal No.", data: data?.data?.journal?.journal_no || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const downloadReturnHandler = async () => {
    try {
      toggleProcessReturn();
      const res = await axiosInstance.get(`/acc/purchase-return/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessReturn();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessReturn();
    }
  };

  return (
    <Screen
      screenTitle={"Purchase Return"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button
          paddingHorizontal={10}
          paddingVertical={8}
          onPress={() => downloadReturnHandler()}
          disabled={processReturnIsLoading}
        >
          {!processReturnIsLoading ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialCommunityIcons name={"download"} size={15} color={Colors.iconLight} />
              <Text style={{ color: Colors.fontLight, fontWeight: "500", fontSize: 12 }}>PDF</Text>
            </View>
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
        <ScrollView>
          <DetailList
            data={dataArr}
            isLoading={isLoading}
            total_amount={currencyConverter.format(data?.data?.total_amount)}
            doc_no={data?.data?.return_no}
            currency={data?.data?.customer?.currency?.name}
            status={data?.data?.status}
            date={dayjs(data?.data?.return_date).format("DD MMM YYYY")}
            title="Return"
          />
        </ScrollView>
      ) : tabValue === "Item List" ? (
        <ItemList
          data={data?.data?.purchase_return_item}
          isLoading={isLoading}
          currencyConverter={currencyConverter}
          discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
          tax={currencyConverter.format(data?.data?.tax_amount)}
          sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
          total_amount={currencyConverter.format(data?.data?.total_amount)}
          navigation={navigation}
          handleDynamicPadding={handleDynamicPadding}
          dynamicPadding={dynamicPadding}
        />
      ) : (
        <ItemList
          data={data?.data?.purchase_return_cost}
          isLoading={isLoading}
          currencyConverter={currencyConverter}
          discount={currencyConverter.format(data?.data?.discount_amount) || `${data?.data?.discount_percent}%`}
          tax={currencyConverter.format(data?.data?.tax_amount)}
          sub_total={currencyConverter.format(data?.data?.subtotal_amount)}
          total_amount={currencyConverter.format(data?.data?.total_amount)}
          navigation={navigation}
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

export default PurchaseReturnDetail;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
