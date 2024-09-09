import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const DetailList = ({ data, isLoading }) => {
  return (
    <ScrollView>
      <View style={{ gap: 10 }}>
        {!isLoading ? (
          data.map((item, index) => {
            return (
              <View key={index} style={{ gap: 5 }}>
                <Text style={[TextProps]}>{item.name}</Text>
                <Text style={[TextProps, { opacity: 0.5 }]}>{item.data ? item.data : "No Data"}</Text>
              </View>
            );
          })
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  );
};

export default DetailList;
