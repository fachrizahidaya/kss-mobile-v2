import { useCallback } from "react";
import _ from "lodash";

import { View } from "react-native";

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
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Input
        innerRef={searchFormRef}
        placeHolder="Search..."
        startIcon="magnify"
        endIcon={globalKeyword && "close"}
        onPressEndIcon={handleClearSearch}
        onChangeText={(value) => keywordSearchHandler(value)}
      />
    </View>
  );
};

export default GlobalSearchInput;
