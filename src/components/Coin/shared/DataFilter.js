import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../../../styles/forms/Input";

const DataFilter = ({
  inputToShow,
  handleSearch,
  placeholder,
  handleClearSearch,
  reference,
  withFilter,
  account,
  startDate,
  endDate,
  accountTo,
}) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      placeHolder={placeholder}
      endIcon={withFilter ? null : inputToShow && "close-circle-outline"}
      onPressEndIcon={withFilter ? null : handleClearSearch}
      endAdornment={
        withFilter ? (
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {inputToShow ? (
              <TouchableOpacity onPress={handleClearSearch}>
                <MaterialCommunityIcons name="close" size={20} color="#3F434A" />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={{ position: "relative" }} onPress={() => reference.current?.show()}>
              <MaterialCommunityIcons name="tune-variant" size={20} color="#3F434A" />
              {account || accountTo || startDate || endDate ? <View style={styles.filterIndicator} /> : null}
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
};

export default DataFilter;

const styles = StyleSheet.create({
  filterIndicator: {
    position: "absolute",
    backgroundColor: "#4AC96D",
    borderRadius: 10,
    right: -3,
    top: -3,
    width: 8,
    height: 8,
  },
});
