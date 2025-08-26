import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-actions-sheet";

import { TextProps } from "../CustomStylings";
import { Colors } from "../Color";
import CustomSheet from "../../layouts/CustomSheet";

const SelectSheet = ({ reference, children, onChange, needMoreParams }) => {
  const handlePress = (item) => {
    onChange(
<<<<<<< HEAD
<<<<<<< HEAD
      item,
=======
      item.value,
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
=======
      item.value,
>>>>>>> 859eea89 (first commit)
      needMoreParams ? item?.begin_time : null,
      needMoreParams ? item?.end_time : null
    );
    reference.current?.hide();
  };

  return (
    <CustomSheet reference={reference}>
      <ScrollView style={{ maxHeight: 400 }}>
        <View style={styles.wrapper}>
          {children?.length > 0
            ? children.map((item, idx) => {
                return (
                  <Pressable
                    key={idx}
<<<<<<< HEAD
<<<<<<< HEAD
                    onPress={() =>
                      onChange(
                        item.value,
                        needMoreParams ? item?.begin_time : null,
                        needMoreParams ? item?.end_time : null,
                      )
                    }
=======
                    onPress={() => handlePress(item)}
>>>>>>> a33df56f (feat: shift atttendance)
=======
                    onPress={() => handlePress(item)}
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
                    style={styles.menuItem}
                  >
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
