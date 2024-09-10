import { useNavigation } from "@react-navigation/native";

import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";

const Sales = () => {
  const navigation = useNavigation();
  const purchaseOptions = [
    {
      name: "Sales Order",
      navigate: "Sales Order",
    },
    {
      name: "Delivery Order",
      navigate: "Delivery Order",
    },
    {
      name: "Customer",
      navigate: "Customer",
    },
    {
      name: "Invoice",
      navigate: "Invoice",
    },
    {
      name: "Down Payment",
      navigate: "Down Payment",
    },
    // {
    //   name: "Quotation",
    //   navigate: "null",
    // },
  ];

  return (
    <Screen screenTitle="Sales" returnButton={true} onPress={() => navigation.goBack()}>
      {purchaseOptions.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[card.card, styles.content, { marginBottom: index === purchaseOptions.length - 1 ? 14 : null }]}
            onPress={() => navigation.navigate(item.navigate)}
          >
            <Text style={[TextProps]}>{item.name}</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
          </Pressable>
        );
      })}
    </Screen>
  );
};

export default Sales;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginHorizontal: 16,
  },
});
