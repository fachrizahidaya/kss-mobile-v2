import { useCallback } from "react";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import Input from "../../../styles/forms/Input";

const GlobalSearchInput = ({ setGlobalKeyword, globalKeyword, searchFormRef }) => {
  const handleClearSearch = () => {
    searchFormRef.current.clear();
    setGlobalKeyword("");
  };

  const keywordSearchHandler = useCallback(
    _.debounce((value) => {
      setGlobalKeyword(value);
    }, 500),
    []
  );

  return (
    <View style={styles.searchContainer}>
      <Input
        innerRef={searchFormRef}
        placeHolder="Search"
        startIcon="magnify"
        endIcon={globalKeyword && "close"}
        onPressEndIcon={handleClearSearch}
        onChangeText={(value) => keywordSearchHandler(value)}
      />
    </View>
  );
};

export default GlobalSearchInput;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    borderBottomColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
