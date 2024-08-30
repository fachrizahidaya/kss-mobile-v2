import { useNavigation } from "@react-navigation/native";

import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";

const Purchase = () => {
  const navigation = useNavigation();
  const purchaseOptions = [
    {
      name: "Purchase Order",
      navigate: "Purchase Order",
    },
    {
      name: "Receipt Purchase Order",
      navigate: "Receipt Purchase Order",
    },
    {
      name: "Supplier",
      navigate: "Supplier",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Purchase" onPress={() => navigation.goBack()} />
      </View>
      <View>
        {purchaseOptions.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[card.card, styles.content]}
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

export default Purchase;

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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 4,
  },
});
