import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const DetailList = ({ data, isLoading }) => {
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default DetailList;

const styles = StyleSheet.create({});
