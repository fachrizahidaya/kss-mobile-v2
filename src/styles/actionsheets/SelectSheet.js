import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-actions-sheet";

import { TextProps } from "../CustomStylings";
import { Colors } from "../Color";
import CustomSheet from "../../layouts/CustomSheet";

const SelectSheet = ({ reference, children, onChange }) => {
  return (
    <CustomSheet reference={reference}>
      <ScrollView style={{ maxHeight: 400 }}>
        <View style={styles.wrapper}>
          {children?.length > 0
            ? children.map((item, idx) => {
                return (
                  <Pressable key={idx} onPress={() => onChange(item.value)} style={styles.menuItem}>
                    <Text style={[TextProps, { fontSize: 16 }]}>{item.label}</Text>
                  </Pressable>
                );
              })
            : null}
        </View>
      </ScrollView>
    </CustomSheet>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderWhite,
  },
});

export default SelectSheet;
