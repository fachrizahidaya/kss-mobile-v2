import { useNavigation, useRoute } from "@react-navigation/native";

import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";
import Screen from "../../../../styles/Screen";

const AppraisalResult = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { id, type } = route.params;

  if (type === "personal") {
    var { data } = useFetch(`/hr/performance-result/personal/${id}`);
  } else {
    var { data } = useFetch(`/hr/performance-result/my-team/${id}`);
  }

  return (
    <Screen screenTitle="Appraisal" returnButton={true} onPress={() => navigation.goBack()}>
      <ScrollView>
        {data?.data?.employee_appraisal?.employee_appraisal_value.map((item, index) => {
          return (
            <View
              style={[
                card.card,
                {
                  marginTop: 14,
                  marginBottom:
                    index === data?.data?.employee_appraisal?.employee_appraisal_value?.length - 1 ? 14 : null,
                  marginHorizontal: 16,
                  gap: 10,
                },
              ]}
              key={index}
            >
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>{item?.description}</Text>
              <View style={{ gap: 5 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[TextProps]}>Employee Score: </Text>
                  <Text style={[TextProps]}>{item?.score}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[TextProps]}>Supervisor Score: </Text>
                  <Text style={[TextProps]}>{item?.supervisor_score}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default AppraisalResult;
