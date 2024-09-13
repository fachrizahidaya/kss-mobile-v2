import { useNavigation, useRoute } from "@react-navigation/native";

import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";
import Screen from "../../../../styles/Screen";

const KPIResult = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { id, type } = route.params;

  if (type === "personal") {
    var { data } = useFetch(`/hr/performance-result/personal/${id}`);
  } else {
    var { data } = useFetch(`/hr/performance-result/my-team/${id}`);
  }

  return (
    <Screen screenTitle="KPI Result" returnButton={true} onPress={() => navigation.goBack()}>
      <ScrollView>
        {data?.data?.employee_appraisal?.employee_appraisal_value.map((item, index) => {
          return (
            <View style={[card.card, { marginVertical: 14, marginHorizontal: 16, gap: 5 }]} key={index}>
              <Text style={[TextProps]}>{item?.description}</Text>
              <Text style={[TextProps]}>{item?.choice_text}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default KPIResult;
