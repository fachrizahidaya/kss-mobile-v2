import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-root-toast";

import { useFetch } from "../../../hooks/useFetch";
import Input from "../../../styles/forms/Input";
import UserListItem from "../../../components/Chat/UserSelection/UserListItem";
import { SuccessToastProps } from "../../../styles/CustomStylings";
import SelectedUserList from "../../../components/Chat/UserSelection/SelectedUserList";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const AddGroupParticipant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputToShow, setInputToShow] = useState("");
  const [cumulativeData, setCumulativeData] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [forceRerender, setForceRerender] = useState(false);
  const [hideCreateIcon, setHideCreateIcon] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);

  const userSelector = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const scrollOffsetY = useRef(0);
  const SCROLL_THRESHOLD = 20;

  const userFetchParameters = {
    page: currentPage,
    search: searchKeyword,
    limit: 20,
  };

  const { data, isLoading } = useFetch(
    "/chat/user",
    [currentPage, searchKeyword],
    userFetchParameters
  );

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

  const addSelectedUserToArray = (user) => {
    setSelectedUsers((prevState) => {
      if (!prevState.find((val) => val.id === user.id)) {
        return [...prevState, { ...user, user_id: user?.id, is_admin: 0 }];
      }
      return prevState;
    });
    setForceRerender((prev) => !prev);
  };

  const removeSelectedUserFromArray = (user) => {
    const newUserArray = selectedUsers.filter((val) => {
      return val.id !== user.id;
    });
    setSelectedUsers(newUserArray);
    setForceRerender((prev) => !prev);
  };

  const onPressAddHandler = () => {
    if (!selectedUsers.length) {
      Toast.show("At least 1 user must be selected", SuccessToastProps);
    } else {
      navigation.navigate("Group Form", {
        userArray: selectedUsers,
      });
    }
  };

  const scrollHandler = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const offsetDifference = currentOffsetY - scrollOffsetY.current;

    if (Math.abs(offsetDifference) < SCROLL_THRESHOLD) {
      return; // Ignore minor scrolls
    }

    if (currentOffsetY > scrollOffsetY.current) {
      if (scrollDirection !== "down") {
        setHideCreateIcon(true); // Scrolling down
        setScrollDirection("down");
      }
    } else {
      if (scrollDirection !== "up") {
        setHideCreateIcon(false); // Scrolling up
        setScrollDirection("up");
      }
    }

    scrollOffsetY.current = currentOffsetY;
  };

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
    <Screen
      screenTitle="Add Group Participant"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor={Colors.secondary}
    >
      <View style={styles.searchContainer}>
        <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
        <Input
          fieldName="search"
          value={inputToShow}
          placeHolder="Search"
          onChangeText={(value) => {
            searchHandler(value);
            setInputToShow(value);
          }}
          startIcon="magnify"
          endIcon={inputToShow && "close"}
          onPressEndIcon={() => {
            setSearchKeyword("");
            setInputToShow("");
          }}
        />
        <View>
          <View style={styles.selectedList}>
            {selectedUsers?.length > 0 &&
              selectedUsers?.map((user, index) => {
                return (
                  <SelectedUserList
                    key={index}
                    name={user?.name}
                    id={user?.id}
                    image={user?.image}
                  />
                );
              })}
          </View>
        </View>
      </View>

      <FlashList
        data={cumulativeData.length ? cumulativeData : filteredDataArray}
        extraData={forceRerender}
        ListFooterComponent={
          hasBeenScrolled && isLoading && <ActivityIndicator />
        }
        estimatedItemSize={200}
        keyExtractor={(item, index) => index}
        onScrollBeginDrag={() => setHasBeenScrolled(true)}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        onScroll={scrollHandler}
        renderItem={({ item, index }) => (
          <UserListItem
            user={item}
            id={item?.id}
            image={item?.image}
            name={item?.name}
            userType={item?.user_type}
            selectedUsers={selectedUsers}
            multiSelect={true}
            email={item?.email}
            type="group"
            active_member={1}
            onPressAddHandler={addSelectedUserToArray}
            onPressRemoveHandler={removeSelectedUserFromArray}
            navigation={navigation}
            userSelector={userSelector}
            position={item?.employee?.position?.position?.name}
            index={index}
            length={
              cumulativeData?.length
                ? cumulativeData?.length
                : filteredDataArray?.length
            }
          />
        )}
      />
      {hideCreateIcon ? null : (
        <Pressable style={styles.addButton} onPress={onPressAddHandler}>
          <MaterialCommunityIcons
            name="arrow-right"
            size={25}
            color={Colors.iconLight}
          />
        </Pressable>
      )}
    </Screen>
  );
};

export default AddGroupParticipant;

const styles = StyleSheet.create({
  selectedList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 30,
    padding: 15,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.borderWhite,
    backgroundColor: Colors.primary,
  },
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
