import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { TextProps } from "../../../styles/CustomStylings";
import ObserverItem from "./ObserverItem";
import { Colors } from "../../../styles/Color";

const ObserverSection = ({ observer }) => {
  return (
    <View style={styles.container}>
      <Text style={[{ fontSize: 12 }, TextProps]}>Observed by</Text>
      <FlashList
        data={observer}
        estimatedItemSize={50}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }) => (
          <ObserverItem key={index} name={item?.user?.name.split(" ")[0]} image={item?.user?.image} />
        )}
      />
    </View>
  );
};

export default ObserverSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
  },
});
