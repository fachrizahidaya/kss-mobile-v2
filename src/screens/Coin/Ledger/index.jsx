import { useNavigation } from "@react-navigation/native";

import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Ledger" onPress={() => navigation.goBack()} />
      </View>
      <View>
        {ledgerOptions.map((item, index) => {
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

export default Ledger;

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
