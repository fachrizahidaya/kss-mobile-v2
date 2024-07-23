import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

import { FlashList } from "@shopify/flash-list";
import { Dimensions, Platform, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../../hooks/useFetch";
import MemberListItem from "./MemberListItem";
import FormButton from "../../../../styles/FormButton";
import Input from "../../../../styles/forms/Input";
import { TextProps } from "../../../../styles/CustomStylings";

const AddMemberModal = ({ isOpen, onClose, onPressHandler, multiSelect = true, header, toggleOtherModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputToShow, setInputToShow] = useState("");
  const [cumulativeData, setCumulativeData] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [forceRerender, setForceRerender] = useState(false);
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  const userFetchParameters = {
    page: currentPage,
    search: searchKeyword,
    limit: 10,
  };

  const { data, refetch } = useFetch("/setting/users", [currentPage, searchKeyword], userFetchParameters);

  const onBackdropPress = () => {
    if (!loadingIndicator) {
      onClose();
    }
  };

  const onModalHide = () => {
    if (!multiSelect) {
      toggleOtherModal();
    }
  };

  /**
   * Function that runs when user scrolled to the bottom of FlastList
   * Fetches more user data by incrementing currentPage by 1
   */
  const fetchMoreData = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchHandler = useCallback(
    _.debounce((value) => {
      setSearchKeyword(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleChange = (value) => {
    searchHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    setInputToShow("");
  };

  const handleSubmit = (setIsLoading) => {
    onPressHandler(selectedUsers, setIsLoading);
  };

  const addSelectedUserToArray = (userId) => {
    setSelectedUsers((prevState) => {
      if (!prevState.includes(userId)) {
        return [...prevState, userId];
      }
      return prevState;
    });
    setForceRerender((prev) => !prev);
  };

  const removeSelectedUserFromArray = (userId) => {
    const newUserArray = selectedUsers.filter((user) => {
      return user !== userId;
    });
    setSelectedUsers(newUserArray);
    setForceRerender((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, [isOpen]);

  useEffect(() => {
    setFilteredDataArray([]);
  }, [searchKeyword]);

  useEffect(() => {
    if (data?.data?.data?.length) {
      if (!searchKeyword) {
        setCumulativeData((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setCumulativeData([]);
      }
    }
  }, [data]);

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onBackdropPress}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      onModalHide={onModalHide}
    >
      <View style={{ borderWidth: 1, gap: 10, backgroundColor: "#FFFFFF", padding: 20, borderRadius: 10 }}>
        <View>
          <Text style={[{ fontWeight: "bold" }, TextProps]}>{header}</Text>
        </View>
        <View>
          <Input
            value={inputToShow}
            placeHolder="Search user"
            size="md"
            onChangeText={handleChange}
            endAdornment={
              inputToShow ? (
                <Pressable onPress={handleClearSearch}>
                  <MaterialCommunityIcons name="close" size={20} color="#3F434A" />
                </Pressable>
              ) : null
            }
          />
          <View style={{ height: 300, marginTop: 4 }}>
            <FlashList
              extraData={forceRerender}
              estimatedItemSize={200}
              data={cumulativeData.length ? cumulativeData : filteredDataArray}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMoreData}
              renderItem={({ item }) => (
                <MemberListItem
                  id={item?.id}
                  image={item?.image}
                  name={item?.name}
                  userType={item?.user_type}
                  selectedUsers={selectedUsers}
                  multiSelect={multiSelect}
                  onPressAddHandler={addSelectedUserToArray}
                  onPressRemoveHandler={removeSelectedUserFromArray}
                  onPressHandler={onPressHandler}
                />
              )}
            />
          </View>
        </View>

        {multiSelect ? (
          <View style={{ flexDirection: "row", gap: 4, justifyContent: "flex-end" }}>
            <FormButton
              onPress={onClose}
              disabled={loadingIndicator}
              color="transparent"
              variant="outline"
              backgroundColor={"#FFFFFF"}
              style={{ paddingHorizontal: 8 }}
            >
              <Text style={TextProps}>Cancel</Text>
            </FormButton>

            <FormButton
              onPress={handleSubmit}
              setLoadingIndicator={setLoadingIndicator}
              style={{ paddingHorizontal: 8 }}
            >
              <Text style={{ color: "#FFFFFF" }}>Submit</Text>
            </FormButton>
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

export default AddMemberModal;
