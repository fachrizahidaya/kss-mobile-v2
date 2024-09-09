import { useNavigation, useRoute } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";
import Screen from "../../../../styles/Screen";

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
        <View style={{ marginVertical: 14, marginHorizontal: 16 }}>
          <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>Employee</Text>

          {data?.data?.conclusion?.employee?.item.map((item, index) => {
            return (
              <View
                style={[
                  card.card,
                  {
                    marginTop: 14,
                    marginBottom: index === data?.data?.conclusion?.employee?.item?.length - 1 ? 14 : null,
                    gap: 10,
                  },
                ]}
                key={index}
              >
                <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>{item?.item}</Text>
                <View style={{ gap: 5 }}>
                  <Text style={[TextProps]}>Actual Score: {item?.score?.toFixed(1)}</Text>
                  <Text style={[TextProps]}>Weight: {item?.weight}%</Text>
                  <Text style={[TextProps]}>Score x Weight: {item?.score_x_weight?.toFixed(1)}</Text>
                </View>
              </View>
            );
          })}

          <View style={[card.card]}>
            <View style={{ gap: 5 }}>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Total Score: {data?.data?.conclusion?.employee?.total_score?.toFixed(1)}
              </Text>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Grade: {data?.data?.conclusion?.employee?.grade}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: 16 }}>
          <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>Supervisor</Text>

          {data?.data?.conclusion?.supervisor?.item.map((item, index) => {
            return (
              <View
                style={[
                  card.card,
                  {
                    marginTop: 14,
                    marginBottom: index === data?.data?.conclusion?.supervisor?.item?.length - 1 ? 14 : null,
                    gap: 10,
                  },
                ]}
                key={index}
              >
                <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>{item?.item}</Text>
                <View style={{ gap: 5 }}>
                  <Text style={[TextProps]}>Actual Score: {item?.score?.toFixed(1)}</Text>
                  <Text style={[TextProps]}>Weight: {item?.weight}%</Text>
                  <Text style={[TextProps]}>Score x Weight: {item?.score_x_weight?.toFixed(1)}</Text>
                </View>
              </View>
            );
          })}

          <View style={[card.card, { marginVertical: 4, gap: 10 }]}>
            <View style={{ gap: 5 }}>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Total Score: {data?.data?.conclusion?.supervisor?.total_score?.toFixed(1)}
              </Text>
              <Text style={[{ fontSize: 14, fontWeight: "700" }, TextProps]}>
                Grade: {data?.data?.conclusion?.supervisor?.grade}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Conclusion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
