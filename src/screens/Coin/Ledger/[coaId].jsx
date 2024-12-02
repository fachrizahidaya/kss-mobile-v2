import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/COA/DetailList";
import ItemList from "../../../components/Coin/COA/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import { TextProps } from "../../../styles/CustomStylings";
import { ScrollView } from "react-native-gesture-handler";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

const COADetail = () => {
  const [tabValue, setTabValue] = useState("General Info");
  const [errorMessage, setErrorMessage] = useState(null);

  const routes = useRoute();
  const navigation = useNavigation();

  const { id, parent, childCount } = routes.params;

  const { toggle: toggleProcessCOA, isLoading: processCOAIsLoading } = useLoading(false);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data, isLoading } = useFetch(`/acc/coa/${id}`);

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const tabs = useMemo(() => {
    return !parent || (parent && childCount > 0)
      ? [
          { title: `General Info`, value: "General Info" },
          { title: `Child Accounts`, value: "Child Accounts" },
        ]
      : [{ title: `General Info`, value: "General Info" }];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Balance" }];

  const dataArr = [
    { name: "Account Type", data: data?.data?.coa_type?.name || "-" },
    { name: "Code", data: data?.data?.code || "-" },
    { name: "Name", data: data?.data?.name || "-" },
    { name: "Currency", data: data?.data?.currency?.name || "-" },
    {
      name: "Balance",
      data: !parent
        ? currencyFormatter.format(data?.data?.balance)
        : currencyFormatter.format(data?.data?.balance) || "-",
    },
    { name: "Notes", data: data?.data?.notes || "-" },
  ];

  const downloadCOAHandler = async () => {
    try {
      toggleProcessCOA();
      const res = await axiosInstance.get(`/acc/coa/${id}/print-pdf`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res.data.data}`);
      toggleProcessCOA();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleProcessCOA();
    }
  };

  return (
    <Screen
      screenTitle="COA Detail"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <FormButton isSubmitting={processCOAIsLoading} onPress={downloadCOAHandler} disabled={processCOAIsLoading}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialCommunityIcons name="download" size={15} color={Colors.iconLight} />
            <Text style={{ color: Colors.fontLight }}>PDF</Text>
          </View>
        </FormButton>
      }
    >
      <ScrollView>
        <View style={styles.content}>
          <Text style={[TextProps, { fontWeight: "600", fontSize: 16 }]}>General Info</Text>
        </View>
        <DetailList
          data={dataArr}
          isLoading={isLoading}
          code={data?.data?.code}
          name={data?.data?.name}
          account_type={data?.data?.coa_type?.name}
          currency={data?.data?.currency?.name}
          balance_date={dayjs(data?.data?.balance_date).format("DD MMM YYYY")}
          balance={data?.data?.balance}
          converter={currencyFormatter}
        />
        <View style={styles.content}>
          <Text style={[TextProps, { fontWeight: "600", fontSize: 16 }]}>Journal Accounts</Text>
        </View>
        <ItemList
          header={headerTableArr}
          data={data?.data?.child}
          isLoading={isLoading}
          currencyConverter={currencyFormatter}
        />
      </ScrollView>

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

export default COADetail;

const styles = StyleSheet.create({
  content: {
    marginTop: 14,
    marginHorizontal: 16,
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
