import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import Tabs from "../../../layouts/Tabs";
import DetailList from "../../../components/Coin/shared/DetailList";
import ItemList from "../../../components/Coin/COA/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";

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
    { name: "Account Type", data: data?.data?.coa_type?.name || "No Data" },
    { name: "Code", data: data?.data?.code || "No Data" },
    { name: "Name", data: data?.data?.name || "No Data" },
    { name: "Currency", data: data?.data?.currency?.name || "No Data" },
    {
      name: "Balance",
      data: !parent
        ? currencyFormatter.format(data?.data?.balance)
        : currencyFormatter.format(data?.data?.balance) || "No Data",
    },
    { name: "Notes", data: data?.data?.notes || "No Data" },
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
      screenTitle={data?.data?.code || "COA Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      // childrenHeader={
      //   <Button paddingHorizontal={10} paddingVertical={8} onPress={downloadCOAHandler} disabled={processCOAIsLoading}>
      //     {!processCOAIsLoading ? (
      //       <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 12 }}>Download as PDF</Text>
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
      ) : tabValue === "Child Accounts" ? (
        <View style={styles.tableContent}>
          <ItemList
            header={headerTableArr}
            data={data?.data?.child}
            isLoading={isLoading}
            currencyConverter={currencyFormatter}
          />
        </View>
      ) : null}

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
    marginVertical: 14,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 10,
    gap: 10,
    flex: 1,
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
