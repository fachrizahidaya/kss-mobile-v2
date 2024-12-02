import { useRef } from "react";

import { StyleSheet, Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../CustomStylings";
import SelectSheet from "../actionsheets/SelectSheet";
import { Colors } from "../Color";

const Select = ({ placeHolder, items = [], value, onChange, title, formik, fieldName = "", hasParentSheet }) => {
  const selectSheetRef = useRef(null);

  const onPressValue = (value) => {
    onChange(value);
    selectSheetRef.current?.hide();
  };

  const valueToPrint = items.find((item) => item.value === value);

  return (
    <>
      <View style={styles.wrapper}>
        {title ? <Text style={[TextProps, { marginBottom: 9 }]}>{title}</Text> : null}

        <Pressable style={styles.select} onPress={() => selectSheetRef.current?.show()}>
          <Text style={[TextProps, { overflow: "hidden", width: "80%" }]} ellipsizeMode="tail" numberOfLines={1}>
            {valueToPrint?.label || placeHolder}
          </Text>

          <MaterialCommunityIcons name="chevron-down" style={styles.dropdownIcon} size={20} color={Colors.fontDark} />
        </Pressable>

        {formik?.errors[fieldName] ? (
          <Text style={{ color: Colors.error, marginTop: 9 }}>{formik.errors[fieldName]}</Text>
        ) : null}
      </View>

      <SelectSheet reference={selectSheetRef} children={items} onChange={onPressValue} />
    </>
  );
};

export default Select;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  select: {
    height: 42,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    padding: 10,
    position: "relative",
    justifyContent: "center",
  },
  dropdownIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
