import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const DetailList = ({ data, isLoading }) => {
  return (
    <ScrollView>
      {!isLoading ? (
        data.map((item, index) => {
          return (
            <View key={index} style={{ marginVertical: 5, gap: 5 }}>
              <Text style={[TextProps]}>{item.name}</Text>
              <View style={styles.wrapper}>
                <Text style={[TextProps]}>{item.data ? item.data : "No Data"}</Text>
              </View>
            </View>
          );
        })
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    padding: 10,
  },
});
