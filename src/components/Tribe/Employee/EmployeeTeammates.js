import { memo } from "react";

import { StyleSheet, View, Text, Platform } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { FlashList } from "@shopify/flash-list";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import Input from "../../../styles/forms/Input";

const EmployeeTeammates = ({ teammates, reference, handleSearch, inputToShow, setInputToShow, setSearchInput }) => {
  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleChange = (value) => {
    handleSearch(value);
    setInputToShow(value);
  };

  return (
    <ActionSheet ref={reference} onClose={() => reference.current?.hide()}>
      <View style={styles.container}>
        <Input
          value={inputToShow}
          fieldName="teammates"
          startIcon="magnify"
          endIcon={inputToShow && "close-circle-outline"}
          onPressEndIcon={handleClearSearch}
          onChangeText={handleChange}
          placeHolder="Search"
          height={40}
        />
        <View style={{ height: 250 }}>
          <FlashList
            data={teammates}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.contentTeammmates}>
                <AvatarPlaceholder
                  image={item?.image}
                  name={item?.name}
                  size="md"
                  borderRadius="full"
                  isThumb={false}
                />
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "500", color: "#3F434A" }}>
                    {item?.name.length > 30 ? item?.name.split(" ")[0] : item?.name}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: "400", color: "#20A144" }}>{item?.position_name}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default memo(EmployeeTeammates);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 21,
    paddingBottom: Platform.OS === "android" ? 40 : null,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E9EB",
  },
  contentTeammmates: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
  },
});
