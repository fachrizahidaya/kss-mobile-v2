import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const DetailList = ({ data, isLoading }) => {
  return (
    <ScrollView>
      <View>
        {!isLoading ? (
          data.map((item, index) => {
            return (
              <View key={index} style={[styles.container, { marginBottom: index === data?.length - 1 ? 14 : null }]}>
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

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginHorizontal: 16,
    marginTop: 14,
  },
});
