import { Image, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import ChecklistItem from "./ChecklistItem";
import { TextProps } from "../../shared/CustomStylings";

const ChecklistSection = ({ percentage, checklist }) => {
  return (
    <View style={styles.container}>
      <Text style={[{ fontSize: 12 }, TextProps]}>
        Checklist ({typeof percentage === "undefined" ? 0 : Math.round(percentage)}
        %)
      </Text>
      {checklist?.length === 0 ? (
        <View style={{ alignItems: "center", justifyContent: "center", gap: 5, flex: 1 }}>
          <Text style={[{ fontSize: 12 }, TextProps]}>No Task</Text>
        </View>
      ) : (
        <FlashList
          data={checklist}
          estimatedItemSize={100}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          renderItem={({ item, index }) => <ChecklistItem key={index} title={item?.title} status={item?.status} />}
        />
      )}
    </View>
  );
};

export default ChecklistSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
});
