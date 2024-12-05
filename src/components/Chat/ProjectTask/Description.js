import { View, ScrollView, StyleSheet } from "react-native";
import HTMLtoTextConverter from "./HTMLtoTextConverter";
import { Colors } from "../../../styles/Color";

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
    backgroundColor: Colors.secondary,
    gap: 5,
    padding: 10,
    borderRadius: 10,
  },
});
