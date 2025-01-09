import { useNavigation, useRoute } from "@react-navigation/native";

import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import { TextProps } from "../../../../styles/CustomStylings";
import Screen from "../../../../layouts/Screen";
import CustomCard from "../../../../layouts/CustomCard";

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
            <CustomCard
              index={index}
              length={data?.data?.comment?.employee_review_comment_value?.length}
              gap={10}
              key={index}
            >
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                {item?.performance_review_comment?.description}
              </Text>
              <Text style={[TextProps]}>{item?.comment}</Text>
            </CustomCard>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default CommentResult;
