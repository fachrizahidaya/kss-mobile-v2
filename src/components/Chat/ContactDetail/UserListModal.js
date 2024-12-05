import { useState } from "react";
import { useSelector } from "react-redux";

import { View, Pressable, ActivityIndicator, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";

import UserListItemModal from "./UserListItemModal";
import Input from "../../../styles/forms/Input";
import { TextProps } from "../../../styles/CustomStylings";
import CustomModal from "../../../styles/modals/CustomModal";
import { Colors } from "../../../styles/Color";

const UserListModal = ({
  roomId,
  memberListIsopen,
  handleToggleMemberList,
  handleToggleAddMember,
  handleSearch,
  inputToShow,
  setInputToShow,
  setSearchInput,
  fetchMoreData,
  cumulativeData,
  filteredDataArray,
  userListIsLoading,
  handlePressAdd,
  handlePressRemove,
  selectedUsers,
  forceRerender,
  handleAddMoreMember,
  addMemberIsLoading,
}) => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const userSelector = useSelector((state) => state.auth);

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const searchHandler = (value) => {
    handleSearch(value);
    setInputToShow(value);
  };

  return (
    <CustomModal isOpen={memberListIsopen} toggle={handleToggleMemberList}>
      <Text style={[{ fontSize: 12 }, TextProps]}>Choose User</Text>
      <Input
        value={inputToShow}
        placeHolder="Search user"
        endIcon="close-circle-outline"
        onPressEndIcon={handleClearSearch}
        onChangeText={(value) => searchHandler(value)}
      />
      <View style={{ height: 300, marginTop: 5 }}>
        <FlashList
          data={cumulativeData.length ? cumulativeData : filteredDataArray}
          extraData={forceRerender}
          estimatedItemSize={100}
          keyExtractor={(item, index) => index}
          onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
          onEndReached={hasBeenScrolled ? fetchMoreData : null}
          onEndReachedThreshold={0.1}
          ListFooterComponent={hasBeenScrolled && userListIsLoading && <ActivityIndicator />}
          renderItem={({ item }) => (
            <UserListItemModal
              id={item?.id}
              user={item}
              name={item?.name}
              userType={item?.user_type}
              image={item?.image}
              multiSelect={true}
              handlePressAdd={handlePressAdd}
              handlePressRemove={handlePressRemove}
              userSelector={userSelector}
              selectedUsers={selectedUsers}
            />
          )}
        />
      </View>
      <Pressable
        style={styles.addMember}
        onPress={() => handleAddMoreMember(roomId, selectedUsers, handleToggleAddMember)}
      >
        {addMemberIsLoading ? (
          <ActivityIndicator />
        ) : (
          <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.fontLight} />
        )}
      </Pressable>
    </CustomModal>
  );
};

export default UserListModal;

const styles = StyleSheet.create({
  addMember: {
    position: "absolute",
    right: 10,
    bottom: 20,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    shadowOffset: 0,
    padding: 20,
    borderWidth: 3,
    borderColor: Colors.borderWhite,
  },
});
