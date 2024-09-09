import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ActivityIndicator, Linking, StyleSheet, Text, View } from "react-native";

import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/COA/DetailList";
import ItemList from "../../../components/Coin/COA/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../styles/Screen";

const COADetail = () => {
  const [tabValue, setTabValue] = useState("COA Detail");
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
          { title: `COA Detail`, value: "COA Detail" },
          { title: `Child Accounts`, value: "Child Accounts" },
        ]
      : [{ title: `COA Detail`, value: "COA Detail" }];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const headerTableArr = [{ name: "Account" }, { name: "Balance" }];

  const dataArr = [
    { name: "Account Type", data: data?.data?.coa_type?.name },
    { name: "Code", data: data?.data?.code },
    { name: "Name", data: data?.data?.name },
    { name: "Currency", data: data?.data?.currency?.name },
    {
      name: "Balance",
      data: !parent ? currencyFormatter.format(data?.data?.balance) : currencyFormatter.format(data?.data?.balance),
    },
    { name: "Notes", data: data?.data?.notes },
  ];

  return (
    <Screen
      screenTitle={data?.data?.code || "COA Detail"}
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <Button paddingHorizontal={10} paddingVertical={8} onPress={null} disabled={processCOAIsLoading}>
          {!processCOAIsLoading ? (
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
      {tabValue === "COA Detail" ? (
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
