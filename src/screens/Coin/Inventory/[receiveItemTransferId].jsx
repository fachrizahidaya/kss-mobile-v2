import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

import { Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Screen from "../../../layouts/Screen";
import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/ItemTransfer/ItemList";
import AlertModal from "../../../styles/modals/AlertModal";
import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

const ReceiveItemTransferDetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id } = routes.params;

  const { toggle: toggleProcessTransfer, isLoading: processTransferIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/receive-item-transfer/${id}`);

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return [
      { title: `General Info`, value: "General Info" },
      { title: `Items`, value: "Item List" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const dataArr = [
    { name: "Origin Warehouse", data: data?.data?.from_warehouse?.name },
    { name: "Target Warehouse", data: data?.data?.to_warehouse?.name },
  ];

  const downloadTransferHandler = async () => {
    try {
      toggleProcessTransfer();
      const res = await axiosInstance.get(`/acc/item-transfer/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessTransfer();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessTransfer();
    }
  };

  return (
    <Screen
      screenTitle="Receive Item"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <FormButton
          isSubmitting={processTransferIsLoading}
          onPress={downloadTransferHandler}
          disabled={processTransferIsLoading}
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
        <DetailList
          data={dataArr}
          isLoading={isLoading}
          total_amount={null}
          doc_no={data?.data?.receive_no}
          currency={null}
          date={dayjs(data?.data?.receive_date).format("DD MMM YYYY")}
          title="Receive"
        />
      ) : (
        <ItemList
          currencyConverter={currencyConverter}
          data={data?.data?.receive_item_transfer_item}
          isLoading={isLoading}
          navigation={navigation}
          isReceive={false}
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

export default ReceiveItemTransferDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.secondary,
    marginVertical: 14,
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
