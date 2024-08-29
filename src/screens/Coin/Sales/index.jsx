import { useNavigation } from "@react-navigation/native";

import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Sales" onPress={() => navigation.goBack()} />
      </View>
      <View style={{ marginHorizontal: 16 }}>
        {purchaseOptions.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[
                card.card,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  marginVertical: 4,
                },
              ]}
              onPress={() => navigation.navigate(item.navigate)}
            >
              <Text style={[TextProps]}>{item.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Sales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
