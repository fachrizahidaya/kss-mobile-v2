import { View, ScrollView, Text, StyleSheet } from "react-native";
import HTMLtoTextConverter from "./HTMLtoTextConverter";

const Description = ({ description }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HTMLtoTextConverter htmlString={description} />
      </ScrollView>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    maxHeight: 150,
    backgroundColor: "#FFFFFF",
    gap: 5,
    padding: 10,
    borderRadius: 10,
  },
});
