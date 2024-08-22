import { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { ActivityIndicator, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import Tabs from "../../../styles/Tabs";
import DetailList from "../../../components/Coin/COA/DetailList";
import ItemList from "../../../components/Coin/COA/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import { useLoading } from "../../../hooks/useLoading";
import axiosInstance from "../../../config/api";
import { TextProps } from "../../../styles/CustomStylings";
import Button from "../../../styles/forms/Button";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";

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

  const headerTableArr = [{ name: "Account Name" }, { name: "Balance" }];

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title={data?.data?.code || "COA Detail"} onPress={() => navigation.goBack()} />
        <Button height={35} padding={10} onPress={null} disabled={processCOAIsLoading}>
          {!processCOAIsLoading ? (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 5 }}>
              <MaterialCommunityIcons name="tray-arrow-down" size={20} color="#FFFFFF" />
              <Text style={[TextProps, { color: "#FFFFFF", fontWeight: "500" }]}>Download</Text>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 16 }}>
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
    </SafeAreaView>
  );
};

export default COADetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  tableContent: {
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
});
