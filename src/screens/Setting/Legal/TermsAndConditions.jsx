import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { TextProps } from "../../../styles/CustomStylings";
import { terms } from "../../../components/Setting/terms";
import Screen from "../../../styles/Screen";

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <Screen
      screenTitle="Terms and Conditions"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor="#FFFFFF"
    >
      <ScrollView showsVerticalScrollIndicator>
        <View style={styles.wrapper}>
          <Text style={[TextProps, { fontSize: 16, fontWeight: "700" }]}>{terms.title}</Text>
          <Text style={[TextProps, { fontWeight: "600" }]}>
            Last updated {dayjs(terms.date).format("MMM DD, YYYY")}
          </Text>
          <View style={{ height: 20 }}></View>
          <Text style={[TextProps]}>{terms.description}</Text>
          <View style={{ height: 20 }}></View>
          <Text style={[TextProps, { fontWeight: "700" }]}>TABLE OF CONTENTS</Text>
          {terms.contents.map((item, index) => {
            return (
              <View key={index} style={{ marginVertical: 3 }}>
                <Text style={[TextProps, { color: "blue" }]}>{item}</Text>
              </View>
            );
          })}
          {terms.data.map((item, index) => {
            return (
              <View key={index} style={{ gap: 5, marginVertical: 10 }}>
                <Text style={[TextProps]}>{item.name}</Text>
                <Text style={[TextProps]}>{item.description}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 42,
    padding: 8,
  },
  wrapper: {
    gap: 15,
    marginHorizontal: 16,
    marginVertical: 14,
    flex: 1,
  },
});
export default TermsAndConditions;
