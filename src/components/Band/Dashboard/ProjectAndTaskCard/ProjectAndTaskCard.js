import { memo } from "react";
import { useNavigation } from "@react-navigation/native";

import { Skeleton } from "moti/skeleton";
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../../styles/Card";
import { SkeletonCommonProps, TextProps } from "../../../../styles/CustomStylings";

const ProjectAndTaskCard = ({ projects, tasks, projectIsLoading, taskIsLoading }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("screen");

  return (
    <View style={styles.container}>
      {!projectIsLoading ? (
        <TouchableOpacity style={[card.card, { flex: 1 }]} onPress={() => navigation.navigate("Projects")}>
          <View style={styles.imageWrapper}>
            <MaterialCommunityIcons name="lightning-bolt" size={45} color="#176688" />
            <Text style={TextProps}>On going projects</Text>
            <Text style={[{ fontWeight: 500, fontSize: 20 }, TextProps]}>{projects}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Skeleton width={width / 2 - 20} height={160} radius={20} {...SkeletonCommonProps} />
      )}

      {!taskIsLoading ? (
        <TouchableOpacity style={[card.card, { flex: 1 }]} onPress={() => navigation.navigate("Tasks")}>
          <View style={styles.imageWrapper}>
            <MaterialCommunityIcons name="format-list-bulleted" size={45} color="#FF965D" />

            <Text style={TextProps}>Total tasks</Text>
            <Text style={[{ fontWeight: 500, fontSize: 20 }, TextProps]}>{tasks}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Skeleton width={width / 2 - 20} height={160} radius={20} {...SkeletonCommonProps} />
      )}
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
    flex: 1,
    marginHorizontal: 14,
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
