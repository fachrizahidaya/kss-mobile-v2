import { memo } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/**
 * @param {Array} tabs - An array of tab objects.
 * @param {string} value - The currently selected tab value.
 * @param {function} onChange - Function to handle tab selection changes.
 */
const Tabs = ({ tabs = [], value, onChange, justify, withIcon = false }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // style={{ borderBottomWidth: 1, borderColor: "#E8E9EB" }}
    >
      <View style={{ flexDirection: "row", gap: 10, justifyContent: justify ? justify : "flex-start", flex: 1 }}>
        {tabs.length > 0 &&
          tabs.map((tab, idx) => {
            return (
              <Pressable key={idx} onPress={() => onChange(tab.value)}>
                <View
                  style={[
                    styles.content,
                    {
                      // borderBottomWidth: value === tab.value ? 2 : 0,
                      backgroundColor: value === tab.value ? "#176688" : null,
                    },
                  ]}
                >
                  <Text style={[{ textTransform: "capitalize", color: value === tab.value ? "#FFFFFF" : "#3F434A" }]}>
                    {tab.title}
                  </Text>
                  {withIcon && <MaterialCommunityIcons name="circle" color={tab.color} size={10} />}
                </View>
              </Pressable>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default memo(Tabs);

const styles = StyleSheet.create({
  content: {
    borderColor: "#377893",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
