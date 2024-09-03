import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { TextProps } from "../../../styles/CustomStylings";
import { privacy } from "../../../components/Setting/privacy";
import Screen from "../../../styles/Screen";

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <Screen
      screenTitle="Privacy and Policy"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor="#FFFFFF"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Text style={[TextProps, { fontSize: 16, fontWeight: "700" }]}>{privacy.title}</Text>
          <Text style={[TextProps, { fontWeight: "600" }]}>
            Last updated {dayjs(privacy.date).format("MMM DD, YYYY")}
          </Text>
          <View style={{ height: 20 }}></View>
          <Text style={[TextProps]}>{privacy.description}</Text>
          <View style={{ height: 20 }}></View>
          <Text style={[TextProps, { fontWeight: "700" }]}>SUMMARY OF KEY POINTS</Text>
          <Text style={[TextProps]}>{privacy.summary}</Text>
          <Text style={[TextProps, { fontWeight: "700" }]}>TABLE OF CONTENTS</Text>
          {privacy.contents.map((item, index) => {
            return (
              <View key={index} style={{ marginVertical: 3 }}>
                <Text style={[TextProps, { color: "blue" }]}>{item}</Text>
              </View>
            );
          })}
          {privacy.data.map((item, index) => {
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

export default PrivacyPolicy;

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
