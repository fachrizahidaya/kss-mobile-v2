import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import useCheckAccess from "../../hooks/useCheckAccess";
import { TextProps } from "../CustomStylings";
import { useDisclosure } from "../../hooks/useDisclosure";
import AlertModal from "../modals/AlertModal";

const CoinAddNewSheet = (props) => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const createCustomerAccess = useCheckAccess("create", "Customer");
  const createSupplierAccess = useCheckAccess("create", "Suppliers");

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const items = [
    {
      title: `New Customer ${createCustomerAccess ? "" : "(No access)"}`,
      screen: () => {
        createCustomerAccess
          ? navigation.navigate("New Customer", {
              setRequestType: setRequestType,
              toggleSuccessModal: toggleAlert,
              setError: setErrorMessage,
            })
          : navigation.navigate("Dashboard");
        props.reference.current?.hide();
      },
    },
    {
      title: `New Supplier ${createSupplierAccess ? "" : "(No access)"}`,
      screen: () => {
        createSupplierAccess
          ? navigation.navigate("New Supplier", {
              setRequestType: setRequestType,
              toggleSuccessModal: toggleAlert,
            })
          : navigation.navigate("Dashboard");
        props.reference.current?.hide();
      },
    },
  ];

  return (
    <>
      <ActionSheet ref={props.reference}>
        <View style={styles.container}>
          {items.map((item, idx) => {
            return (
              <Pressable key={idx} style={styles.wrapper} onPress={item.screen}>
                <View style={styles.flex}>
                  <View style={styles.item}>
                    <MaterialCommunityIcons name="plus" size={20} color="#3F434A" />
                  </View>
                  <Text key={idx} style={[{ fontSize: 14 }, TextProps]}>
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ActionSheet>
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Data added!" : "Process error!"}
        description={requestType === "post" ? "Data successfully saved" : errorMessage || "Please try again later"}
      />
    </>
  );
};

export default CoinAddNewSheet;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E9EB",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  item: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
