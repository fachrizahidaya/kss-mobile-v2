import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../../../styles/forms/Input";

const DataFilter = ({ inputToShow, handleSearch, placeholder, handleClearSearch, reference, withFilter }) => {
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
            <TouchableOpacity onPress={() => reference.current?.show()}>
              <MaterialCommunityIcons name="tune-variant" size={20} color="#3F434A" />
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
};

export default DataFilter;
