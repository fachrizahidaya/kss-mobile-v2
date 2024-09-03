import { Pressable, StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

const CancelAction = ({ onDeselect, toggleCancelModal, reference }) => {
  return (
    <ActionSheet ref={reference} onClose={onDeselect}>
      <Pressable onPress={toggleCancelModal} style={{ ...styles.wrapper }}>
        <View>
          <Text>Cancel Request</Text>
        </View>
      </Pressable>
    </ActionSheet>
  );
};

export default CancelAction;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E9EB",
  },
});
