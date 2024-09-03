import { memo } from "react";

import { Skeleton } from "moti/skeleton";
import { View, Pressable, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SkeletonCommonProps, TextProps } from "./CustomStylings";

const PageHeader = ({ title, subTitle, withReturnButton, withLoading, isLoading, onPress, children }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
        {withReturnButton && (
          <Pressable onPress={onPress}>
            <MaterialCommunityIcons name="chevron-left" size={20} color="#3F434A" />
          </Pressable>
        )}

        {withLoading ? (
          !isLoading ? (
            <Text style={[{ fontSize: 16, fontWeight: "500" }, TextProps]} numberOfLines={2}>
              {title}
              {subTitle && <Text style={{ color: "#176688" }}> #{subTitle}</Text>}
            </Text>
          ) : (
            <Skeleton width={120} height={20} radius="round" {...SkeletonCommonProps} />
          )
        ) : (
          <Text style={[{ fontSize: 16, fontWeight: "500" }, TextProps]} numberOfLines={2}>
            {title}
            {subTitle && <Text style={{ color: "#176688" }}> #{subTitle}</Text>}
          </Text>
        )}
      </View>
      {children}
    </View>
  );
};

export default memo(PageHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
