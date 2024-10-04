import RenderHtml from "react-native-render-html";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const NotificationItem = ({ name, modul, content, itemId, time, isRead, index, length, navigation }) => {
  const { width } = Dimensions.get("screen");

  return (
    <Pressable
      onPress={() => {
        if (modul === "Task") {
          navigation.navigate("Task Detail", { taskId: itemId });
        } else if (modul === "Project") {
          navigation.navigate("Project Detail", { projectId: itemId });
        }
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: !isRead ? (modul === "Task" ? "#FF965D33" : "#49C96D33") : "white",
            marginBottom: index === length - 1 ? 14 : null,
          },
        ]}
      >
        <Text style={[{ width: 42 }, TextProps]}>{time.split(" ")[1]}</Text>

        <View style={[styles.wrapper, { borderColor: modul === "Task" ? "#FF965D" : "#49C96D" }]} />

        <View style={{ flex: 1 }}>
          <Text style={[TextProps]}>{name}</Text>
          <View>
            <RenderHtml contentWidth={width} source={{ html: content }} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 14,
  },
  wrapper: {
    borderWidth: 2,
    borderRadius: 10,
    height: "100%",
  },
});
