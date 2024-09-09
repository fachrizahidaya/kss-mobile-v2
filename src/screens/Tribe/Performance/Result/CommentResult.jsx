import { useNavigation, useRoute } from "@react-navigation/native";

import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";
import Screen from "../../../../styles/Screen";

const CommentResult = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { id, type } = route.params;

  if (type === "personal") {
    var { data } = useFetch(`/hr/performance-result/personal/${id}`);
  } else {
    var { data } = useFetch(`/hr/performance-result/my-team/${id}`);
  }

  return (
    <Screen screenTitle="Comment" returnButton={true} onPress={() => navigation.goBack()}>
      <ScrollView>
        {data?.data?.comment?.employee_review_comment_value.map((item, index) => {
          return (
            <View
              style={[
                card.card,
                {
                  marginTop: 14,
                  marginBottom: index === data?.data?.comment?.employee_review_comment_value?.length - 1 ? 14 : null,
                  marginHorizontal: 16,
                  gap: 10,
                },
              ]}
              key={index}
            >
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                {item?.performance_review_comment?.description}
              </Text>
              <Text style={[TextProps]}>{item?.comment}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default CommentResult;
