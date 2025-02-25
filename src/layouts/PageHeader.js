import { memo } from "react";

import { View, Pressable, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../styles/CustomStylings";
import { Colors } from "../styles/Color";

const PageHeader = ({
  title,
  subTitle,
  withReturnButton,
  withLoading,
  isLoading,
  onPress,
  children,
}) => {
  return title ? (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
        {withReturnButton && (
          <Pressable onPress={onPress}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color={Colors.iconDark}
            />
          </Pressable>
        )}

        {!isLoading ? (
          <Text
            style={[{ fontSize: 16, fontWeight: "500" }, TextProps]}
            numberOfLines={2}
          >
            {title}
            {subTitle && (
              <Text style={{ color: Colors.primary }}> #{subTitle}</Text>
            )}
          </Text>
        ) : (
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: "500",
                maxWidth: 300,
                overflow: "hidden",
              },
              TextProps,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
            {subTitle && (
              <Text style={{ color: Colors.primary }}> #{subTitle}</Text>
            )}
          </Text>
        )}
      </View>
      {children}
    </View>
  ) : null;
};

export default memo(PageHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
