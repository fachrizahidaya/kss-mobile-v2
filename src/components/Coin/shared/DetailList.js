import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { TextProps } from "../../../styles/CustomStylings";

const DetailList = ({ data, isLoading }) => {
  return (
    <View>
      {!isLoading ? (
        data.map((item, index) => {
          return (
            <View key={index} style={[styles.container, { marginBottom: index === data?.length - 1 ? 14 : null }]}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{item.name}</Text>
              <Text style={[TextProps]}>{item.data}</Text>
            </View>
          );
        })
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginHorizontal: 16,
    marginTop: 14,
  },
});
