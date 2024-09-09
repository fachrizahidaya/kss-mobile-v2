import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";

const Ledger = () => {
  const navigation = useNavigation();

  const ledgerOptions = [
    {
      name: "COA",
      navigate: "COA",
    },
    {
      name: "Journal",
      navigate: "Journal",
    },
    {
      name: "Account History",
      navigate: "Account History",
    },
    {
      name: "Journal Logs",
      navigate: "Journal Log",
    },
  ];

  return (
    <Screen screenTitle="Ledger" returnButton={true} onPress={() => navigation.goBack()}>
      {ledgerOptions.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[card.card, styles.content, { marginBottom: index === ledgerOptions.length - 1 ? 14 : null }]}
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

export default Ledger;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 14,
  },
});
