import { useNavigation, useRoute } from "@react-navigation/native";

import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import { TextProps } from "../../../../styles/CustomStylings";
import Screen from "../../../../styles/Screen";
import CustomCard from "../../../../styles/CustomCard";

const Conclusion = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { id, type } = route.params;

  if (type === "personal") {
    var { data } = useFetch(`/hr/performance-result/personal/${id}`);
  } else {
    var { data } = useFetch(`/hr/performance-result/my-team/${id}`);
  }

  return (
    <Screen screenTitle="Conclusion" returnButton={true} onPress={() => navigation.goBack()}>
      <ScrollView>
        <View style={{ marginVertical: 14 }}>
          <Text style={[{ fontSize: 14, fontWeight: "700", marginHorizontal: 16 }, TextProps]}>Employee</Text>

          {data?.data?.conclusion?.employee?.item.map((item, index) => {
            return (
              <CustomCard index={index} length={data?.data?.conclusion?.employee?.item?.length} gap={10} key={index}>
                <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>{item?.item}</Text>
                <View style={{ gap: 5 }}>
                  <Text style={[TextProps]}>Actual Score: {item?.score?.toFixed(1)}</Text>
                  <Text style={[TextProps]}>Weight: {item?.weight}%</Text>
                  <Text style={[TextProps]}>Score x Weight: {item?.score_x_weight?.toFixed(1)}</Text>
                </View>
              </CustomCard>
            );
          })}

          <CustomCard>
            <View style={{ gap: 5 }}>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Total Score: {data?.data?.conclusion?.employee?.total_score?.toFixed(1)}
              </Text>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Grade: {data?.data?.conclusion?.employee?.grade}
              </Text>
            </View>
          </CustomCard>
        </View>

        <View style={{ marginVertical: 14 }}>
          <Text style={[{ fontSize: 14, fontWeight: "700", marginHorizontal: 16 }, TextProps]}>Supervisor</Text>

          {data?.data?.conclusion?.supervisor?.item.map((item, index) => {
            return (
              <CustomCard index={index} length={data?.data?.conclusion?.supervisor?.item?.length} gap={10} key={index}>
                <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>{item?.item}</Text>
                <View style={{ gap: 5 }}>
                  <Text style={[TextProps]}>Actual Score: {item?.score?.toFixed(1)}</Text>
                  <Text style={[TextProps]}>Weight: {item?.weight}%</Text>
                  <Text style={[TextProps]}>Score x Weight: {item?.score_x_weight?.toFixed(1)}</Text>
                </View>
              </CustomCard>
            );
          })}

          <CustomCard>
            <View style={{ gap: 5 }}>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Total Score: {data?.data?.conclusion?.supervisor?.total_score?.toFixed(1)}
              </Text>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Grade: {data?.data?.conclusion?.supervisor?.grade}
              </Text>
            </View>
          </CustomCard>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Conclusion;
