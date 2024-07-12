import { View } from "react-native";

import Input from "../../../styles/forms/Input";

const SearchBox = ({ handleSearch, inputToShow, handleClearSearch }) => {
  return (
    <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingVertical: 10 }}>
      <Input
        value={inputToShow}
        placeHolder="Search"
        startIcon="magnify"
        endIcon="close"
        onPressEndIcon={handleClearSearch}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default SearchBox;
