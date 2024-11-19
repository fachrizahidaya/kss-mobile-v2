import { StyleSheet, View } from "react-native";
import Input from "../../../styles/forms/Input";

const DataFilter = ({ inputToShow, handleSearch, placeholder, handleClearSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <Input
        value={inputToShow}
        onChangeText={handleSearch}
        placeHolder={placeholder}
        endIcon={inputToShow && "close-circle-outline"}
        onPressEndIcon={handleClearSearch}
      />
    </View>
  );
};

export default DataFilter;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
