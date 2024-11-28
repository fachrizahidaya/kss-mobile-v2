import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RenderHTML from "react-native-render-html";
import { Colors } from "../../../../styles/Color";

const TaskSection = ({ tasks, keyword, navigation }) => {
  const { width } = Dimensions.get("screen");

  const boldMatchCharacters = (sentence = "", characters = "") => {
    const regex = new RegExp(characters, "gi");
    return sentence.replace(regex, `<strong style="color: #176688;">$&</strong>`);
  };

  const renderItem = (title) => {
    return boldMatchCharacters(title, keyword);
  };

  const baseStyles = {
    opacity: 0.5,
  };

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontWeight: "500", color: Colors.primary }}>TASKS</Text>

      {tasks.map((task) => (
        <Pressable
          style={styles.item}
          key={task.id}
          onPress={() => navigation.navigate("Task Detail", { taskId: task.id })}
        >
          <View style={styles.icon}>
            <MaterialCommunityIcons name="format-list-bulleted" size={20} color={Colors.primary} />
          </View>

          <View style={{ flex: 1, gap: 2 }}>
            <RenderHTML
              contentWidth={width}
              source={{
                html: renderItem(task.title),
              }}
            />
            {!task.title.includes(keyword) ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                {task?.project_title ? (
                  <>
                    <Text style={{ opacity: 0.5 }}>In project :</Text>

                    <RenderHTML
                      contentWidth={width}
                      source={{
                        html: renderItem(task?.project_title),
                      }}
                      baseStyle={baseStyles}
                    />
                  </>
                ) : null}
              </View>
            ) : null}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default TaskSection;

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  icon: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: Colors.borderGrey,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
});
