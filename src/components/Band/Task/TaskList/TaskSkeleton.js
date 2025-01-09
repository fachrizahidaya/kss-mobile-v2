import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import { SkeletonCommonProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const TaskSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Skeleton show height={20} width={100} radius="round" {...SkeletonCommonProps} />

        <Skeleton show height={20} width={100} radius="round" {...SkeletonCommonProps} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Skeleton show height={15} width={15} radius="round" {...SkeletonCommonProps} />
          <Skeleton show height={15} width={15} radius="round" {...SkeletonCommonProps} />
          <Skeleton show height={15} width={15} radius="round" {...SkeletonCommonProps} />
        </View>

        <Skeleton show height={30} width={30} radius="round" {...SkeletonCommonProps} />
      </View>
    </View>
  );
};

export default TaskSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginVertical: 14,
    marginHorizontal: 16,
    borderRadius: 15,
    gap: 10,
  },
});
