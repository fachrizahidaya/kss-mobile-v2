import { StyleSheet, Text, View, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "./Input";
import { TextProps } from "../CustomStylings";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../Color";
import CustomSheet from "../../layouts/CustomSheet";

const SelectWithSearch = ({
  items = [],
  value,
  placeHolder,
  onChange,
  title,
  formik,
  fieldName = "",
  reference,
  inputToShow,
  fieldNameSearch,
  setInputToShow,
  setSearchInput,
  handleSearch,
}) => {
  const onPressValue = (value) => {
    onChange(value);
    reference.current?.hide();
    setSearchInput("");
    setInputToShow("");
  };

  const handleClearSearch = () => {
    reference.current?.hide();
    setSearchInput("");
    setInputToShow("");
  };

  const valueToPrint = items.find((item) => item.value === value);

  return (
    <View style={styles.wrapper}>
      {title ? (
        <Text style={[{ marginBottom: 9 }, TextProps]}>{title}</Text>
      ) : null}

      <Pressable
        onPress={() => reference.current?.show()}
        style={styles.select}
      >
        <CustomSheet
          reference={reference}
          handleClose={handleClearSearch}
          containerStyle={{ height: 550 }}
        >
          <Input
            value={inputToShow}
            fieldName={fieldNameSearch}
            startIcon="magnify"
            endIcon={inputToShow ? "close-circle-outline" : null}
            onPressEndIcon={() => {
              setInputToShow("");
              setSearchInput("");
            }}
            onChangeText={(value) => {
              handleSearch(value);
              setInputToShow(value);
            }}
            placeHolder="Search"
            height={40}
          />

          <ScrollView>
            <View style={{ gap: 20 }}>
              {items.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => onPressValue(item.value)}
                    key={index}
                  >
                    <Text style={[TextProps]}>{item.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </CustomSheet>
        <Text style={[{ fontSize: 12 }, TextProps]}>
          {valueToPrint?.label || placeHolder}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          style={styles.dropdownIcon}
          size={20}
          color={Colors.iconDark}
        />
      </Pressable>
      {formik?.errors[fieldName] ? (
        <Text
          style={{
            color: Colors.error,
            marginTop: 9,
            marginLeft: 3,
            fontSize: 12,
          }}
        >
          {formik.errors[fieldName]}
        </Text>
      ) : null}
    </View>
  );
};

export default SelectWithSearch;

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
