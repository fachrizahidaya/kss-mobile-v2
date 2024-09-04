import { Pressable, StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { FlashList } from "@shopify/flash-list";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../../../styles/forms/Input";
import { TextProps } from "../../../styles/CustomStylings";

const AWBScannedList = ({ reference, items, handleSearch, filteredData, searchQuery, handleClearSearch }) => {
  const handleClose = () => {
    reference.current?.hide();
    handleClearSearch();
  };

  return (
    <Pressable style={styles.wrapper} onPress={() => reference.current?.show()}>
      <MaterialCommunityIcons name="format-list-bulleted" size={30} color="#FFFFFF" />

      <ActionSheet ref={reference} onClose={handleClose} containerStyle={{ height: 550 }}>
        <View style={styles.content}>
          <Input
            value={searchQuery}
            fieldName="search"
            startIcon="magnify"
            endIcon={searchQuery && "close-circle-outline"}
            onPressEndIcon={handleClearSearch}
            onChangeText={(value) => handleSearch(value)}
            placeHolder="Search"
            height={40}
          />
          {searchQuery ? (
            filteredData?.map((awb, index) => {
              return <Text key={index}>{awb}</Text>;
            })
          ) : (
            <FlashList
              data={items}
              estimatedItemSize={50}
              onEndReachedThreshold={0.1}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <Pressable key={index} style={{ marginVertical: 5 }}>
                  <Text style={[TextProps]}>{item}</Text>
                </Pressable>
              )}
            />
          )}
          {/* {filteredData?.map((awb, index) => {
            return <Text key={index}>{awb}</Text>;
          })} */}
        </View>
      </ActionSheet>
    </Pressable>
  );
};

export default AWBScannedList;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#377893",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    right: 15,
    zIndex: 2,
    borderRadius: 30,
    shadowOffset: 0,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 21,
    paddingBottom: 40,
    flex: 1,
  },
});
