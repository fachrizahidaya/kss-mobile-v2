import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

import { FlashList } from "@shopify/flash-list";
import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../../hooks/useFetch";
import MemberListItem from "./MemberListItem";
import FormButton from "../../../../styles/buttons/FormButton";
import Input from "../../../../styles/forms/Input";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomModal from "../../../../styles/modals/CustomModal";
import { Colors } from "../../../../styles/Color";

const AddMemberModal = ({ isOpen, onClose, onPressHandler, multiSelect = true, header, toggleOtherModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputToShow, setInputToShow] = useState("");
  const [cumulativeData, setCumulativeData] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [forceRerender, setForceRerender] = useState(false);
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const userFetchParameters = {
    page: currentPage,
    search: searchKeyword,
    limit: 10,
  };

  const { data, refetch } = useFetch("/setting/users", [currentPage, searchKeyword], userFetchParameters);

  const handleBackdropPress = () => {
    if (!loadingIndicator) {
      onClose();
    }
  };

  const handleModalHide = () => {
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
    <CustomModal isOpen={isOpen} toggle={handleBackdropPress} handleAfterModalHide={handleModalHide}>
      <View style={{ gap: 10 }}>
        <Text style={[{ fontWeight: "bold" }, TextProps]}>{header}</Text>
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

        {multiSelect ? (
          <View style={{ flexDirection: "row", gap: 4, justifyContent: "flex-end" }}>
            <FormButton
              onPress={onClose}
              disabled={loadingIndicator}
              variant="outline"
              backgroundColor={Colors.secondary}
              padding={10}
            >
              <Text style={TextProps}>Cancel</Text>
            </FormButton>

            <FormButton onPress={handleSubmit} setLoadingIndicator={setLoadingIndicator} padding={10}>
              <Text style={{ color: Colors.fontLight }}>Submit</Text>
            </FormButton>
          </View>
        ) : null}
      </View>
    </CustomModal>
  );
};

export default AddMemberModal;
