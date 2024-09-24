import { useNavigation, useRoute } from "@react-navigation/native";

import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import { TextProps } from "../../../../styles/CustomStylings";
import Screen from "../../../../layouts/Screen";
import CustomCard from "../../../../styles/CustomCard";

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
            <CustomCard
              index={index}
              length={data?.data?.employee_appraisal?.employee_appraisal_value?.length}
              gap={10}
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
            </CustomCard>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default AppraisalResult;
