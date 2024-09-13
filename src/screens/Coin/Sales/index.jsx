import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";
import CustomCard from "../../../styles/CustomCard";

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
          <CustomCard
            key={index}
            index={index}
            length={purchaseOptions.length}
            handlePress={() => navigation.navigate(item.navigate)}
          >
            <View style={styles.content}>
              <Text style={[TextProps]}>{item.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
            </View>
          </CustomCard>
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
  },
});
