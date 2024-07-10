import { View, Text, Image, StyleSheet } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const AttachmentSection = () => {
  return (
    <View style={styles.container}>
      <Text style={[TextProps]}>Attachment</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
        <Text style={[{ fontSize: 12 }, TextProps]}>No Data</Text>
      </View>
    </View>
  );
};

export default AttachmentSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    gap: 5,
  },
});
