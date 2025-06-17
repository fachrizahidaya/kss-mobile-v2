import { memo } from "react";

import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const ProjectAndTaskCard = ({
  projects,
  tasks,
  projectIsLoading,
  taskIsLoading,
  navigation,
}) => {
  const { width } = Dimensions.get("screen");

  return (
    <View style={styles.container}>
      <Pressable
        style={[card.card, { flex: 1 }]}
        onPress={() => navigation.navigate("Projects")}
      >
        <View style={styles.imageWrapper}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={45}
            color={Colors.primary}
          />
          <Text style={TextProps}>On going projects</Text>
          <Text style={[{ fontWeight: "500", fontSize: 20 }, TextProps]}>{projects}</Text>
        </View>
      </Pressable>

      <Pressable
        style={[card.card, { flex: 1 }]}
        onPress={() => navigation.navigate("Tasks")}
      >
        <View style={styles.imageWrapper}>
          <MaterialCommunityIcons name="format-list-bulleted" size={45} color="#FF965D" />

          <Text style={TextProps}>Total tasks</Text>
          <Text style={[{ fontWeight: "500", fontSize: 20 }, TextProps]}>{tasks}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(ProjectAndTaskCard);

const styles = StyleSheet.create({
  container: {
    height: 160,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginHorizontal: 16,
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
});
