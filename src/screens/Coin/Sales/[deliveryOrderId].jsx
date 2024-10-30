import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../hooks/useFetch";
import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/DeliveryOrder/ItemList";
import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import Button from "../../../styles/forms/Button";
import AlertModal from "../../../styles/modals/AlertModal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import Screen from "../../../layouts/Screen";
import CustomBadge from "../../../styles/CustomBadge";

const DeliveryOrderDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleProcessDO, isLoading: processDOIsLoading } = useLoading(false);

  const { data, isLoading } = useFetch(`/acc/delivery-order/${id}`);

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Item List`, value: "Item List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Delivery Order No.", data: data?.data?.do_no || "-" },
    { name: "Delivery Order Date", data: dayjs(data?.data?.do_date).format("DD/MM/YYYY") || "-" },
    { name: "Customer", data: data?.data?.customer?.name || "-" },
    { name: "Shipping Address", data: data?.data?.shipping_address || "-" },
    { name: "Shipping Date", data: dayjs(data?.data?.shipping_date).format("DD/MM/YYYY") || "-" },
    { name: "Courier", data: data?.data?.courier?.name || "-" },
    { name: "FoB", data: data?.data?.fob?.name || "-" },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const downloadDeliveryOrderHandler = async () => {
    try {
      toggleProcessDO();
      const res = await axiosInstance.get(`/acc/delivery-order/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessDO();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessDO();
    }
  };

  return (
    <Screen
      screenTitle={data?.data?.do_no || "DO Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <CustomBadge
            description={data?.data?.status}
            backgroundColor={
              data?.data?.status === "Pending" ? "#e2e3e5" : data?.data?.status === "Delivery" ? "#fef9c3" : "#dcfce6"
            }
            textColor={
              data?.data?.status === "Pending" ? "#65758c" : data?.data?.status === "Delivery" ? "#cb8c09" : "#16a349"
            }
          />
          <Button
            paddingHorizontal={10}
            paddingVertical={8}
            onPress={() => downloadDeliveryOrderHandler()}
            disabled={processDOIsLoading}
          >
            {!processDOIsLoading ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <MaterialCommunityIcons name={"download"} size={15} color="#FFFFFF" />
                <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>PDF</Text>
              </View>
            ) : (
              <ActivityIndicator />
            )}
          </Button>
        </View>
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
        <View style={styles.tableContent}>
          <ItemList data={data?.data?.delivery_order_item} isLoading={isLoading} navigation={navigation} />
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

export default DeliveryOrderDetail;

const styles = StyleSheet.create({
  content: {
    marginVertical: 14,
    backgroundColor: "#FFFFFF",
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
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
