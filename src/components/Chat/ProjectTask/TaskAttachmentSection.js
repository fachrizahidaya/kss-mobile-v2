import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const TaskAttachmentSection = () => {
  return (
    <View style={styles.container}>
      <Text style={[TextProps]}>Attachment</Text>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 5, flex: 1 }}>
        <View>
          <Text style={[{ fontSize: 12 }, TextProps]}>No Data</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskAttachmentSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    gap: 5,
    borderRadius: 10,
  },
});
