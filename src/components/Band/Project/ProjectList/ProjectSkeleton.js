import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import { SkeletonCommonProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const ProjectSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <View style={{ gap: 4, width: 200 }}>
        <Skeleton
          height={20}
          width="100%"
          radius={10}
          {...SkeletonCommonProps}
        />
        <Skeleton
          height={20}
          width={120}
          radius={10}
          {...SkeletonCommonProps}
        />
        <Skeleton height={20} width={20} radius={10} {...SkeletonCommonProps} />
      </View>

      <Skeleton height={20} width={80} radius={10} {...SkeletonCommonProps} />
    </View>
  );
};

export default ProjectSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.secondary,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#CBCBCB",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 14,
    marginHorizontal: 16,
    elevation: 4,
  },
});
