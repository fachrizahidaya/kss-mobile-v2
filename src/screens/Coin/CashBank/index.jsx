import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";

const CashBank = () => {
  const navigation = useNavigation();

  const cashBankOptions = [
    {
      name: "Payment",
      navigate: "Payment",
    },
    {
      name: "Receipt",
      navigate: "Receipt",
    },
    {
      name: "Bank Transfer",
      navigate: "Bank Transfer",
    },
    {
      name: "Bank History",
      navigate: "Bank History",
    },
  ];

  return (
    <Screen screenTitle="Cash & Bank" returnButton={true} onPress={() => navigation.goBack()}>
      {cashBankOptions.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[card.card, styles.content, { marginBottom: index === cashBankOptions.length - 1 ? 14 : null }]}
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

export default CashBank;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 14,
  },
});
