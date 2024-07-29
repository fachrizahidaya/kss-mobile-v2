import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import { SkeletonCommonProps } from "../../../../styles/CustomStylings";

const ProjectSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <View style={{ gap: 4, width: 200 }}>
        <Skeleton height={20} width="100%" radius={10} {...SkeletonCommonProps} />
        <Skeleton height={20} width={120} radius={10} {...SkeletonCommonProps} />
        <Skeleton height={20} width={20} radius={10} {...SkeletonCommonProps} />
      </View>

      <Skeleton height={20} width={80} radius={10} {...SkeletonCommonProps} />
    </View>
  );
};

export default ProjectSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#cbcbcb",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 4,
    marginHorizontal: 14,
    elevation: 4,
  },
});
