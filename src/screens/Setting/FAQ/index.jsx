import { useNavigation } from "@react-navigation/native";

import { StyleSheet, View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import { questionAndAnswer } from "../../../components/Setting/FAQ/data/questionAndAnswer";
import Screen from "../../../styles/Screen";

const FrequentlyAskedQuestions = () => {
  const navigation = useNavigation();

  const topicArr = [
    {
      name: questionAndAnswer[0]?.name,
      data: questionAndAnswer[0]?.data,
      description: questionAndAnswer[0].description,
    },
    {
      name: questionAndAnswer[1]?.name,
      data: questionAndAnswer[1]?.data,
      description: questionAndAnswer[1].description,
    },
    {
      name: questionAndAnswer[2]?.name,
      data: questionAndAnswer[2]?.data,
      description: questionAndAnswer[2].description,
    },
    {
      name: questionAndAnswer[3]?.name,
      data: questionAndAnswer[3]?.data,
      description: questionAndAnswer[3].description,
    },
    {
      name: questionAndAnswer[4]?.name,
      data: questionAndAnswer[4]?.data,
      description: questionAndAnswer[4].description,
    },
    {
      name: questionAndAnswer[5]?.name,
      data: questionAndAnswer[5]?.data,
      description: questionAndAnswer[5].description,
    },
    {
      name: questionAndAnswer[6]?.name,
      data: questionAndAnswer[6]?.data,
      description: questionAndAnswer[6].description,
    },
    {
      name: questionAndAnswer[7]?.name,
      data: questionAndAnswer[7]?.data,
      description: questionAndAnswer[7].description,
    },
    {
      name: questionAndAnswer[8]?.name,
      data: questionAndAnswer[8]?.data,
      description: questionAndAnswer[8].description,
    },
  ];

  return (
    <Screen screenTitle="FAQs" returnButton={true} onPress={() => navigation.goBack()}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {topicArr.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("FAQ Detail", {
                    data: item?.data,
                    name: item?.name,
                    description: item?.description,
                  })
                }
                style={[card.card, styles.wrapper]}
              >
                <Text style={[TextProps]}>{item?.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};

export default FrequentlyAskedQuestions;

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 25,
    borderRadius: 50,
    resizeMode: "contain",
  },
  wrapper: {
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    marginHorizontal: 16,
  },
});
