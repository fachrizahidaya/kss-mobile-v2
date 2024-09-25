import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import _ from "lodash";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import Input from "../../../styles/forms/Input";
import { useFetch } from "../../../hooks/useFetch";
import UserListItem from "../../../components/Chat/Forward/UserListItem";
import PersonalSection from "../../../components/Chat/Forward/PersonalSection";
import GroupSection from "../../../components/Chat/Forward/GroupSection";
import Tabs from "../../../layouts/Tabs";
import Screen from "../../../layouts/Screen";

const Forward = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputToShow, setInputToShow] = useState("");
  const [cumulativeData, setCumulativeData] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [tabValue, setTabValue] = useState("Group");

  const navigation = useNavigation();

  const route = useRoute();

  const { message, project, task, file_path, file_name, file_size, mime_type } = route.params;

  const userFetchParameters = {
    page: currentPage,
    search: searchKeyword,
    limit: 20,
  };

  const { data: personalChat } = useFetch("/chat/personal");
  const { data: groupChat } = useFetch("/chat/group");
  const { data: contact, isLoading: contactIsLoading } = useFetch(
    "/chat/user",
    [currentPage, searchKeyword],
    userFetchParameters
  );

  const tabs = useMemo(() => {
    return [
      { title: `Group`, value: "Group" },
      { title: `Personal`, value: "Personal" },
      { title: `People`, value: "People" },
    ];
  }, []);

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  /**
   * Function that runs when user scrolled to the bottom of FlastList
   * Fetches more user data by incrementing currentPage by 1
   */
  const fetchMoreData = () => {
    if (currentPage < contact?.data?.last_page) {
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

  const handleSearch = (value) => {
    searchHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    setInputToShow("");
  };

  useEffect(() => {
    setFilteredDataArray([]);
  }, [searchKeyword]);

  useEffect(() => {
    if (contact?.data?.data?.length) {
      if (!searchKeyword) {
        setCumulativeData((prevData) => [...prevData, ...contact?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...contact?.data?.data]);
        setCumulativeData([]);
      }
    }
  }, [contact]);

  return (
    <Screen screenTitle="Send to" returnButton={true} onPress={() => navigation.goBack()} backgroundColor="#FFFFFF">
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
        </View>

        <View style={{ flex: 1 }}>
          {tabValue === "Group" ? (
            <GroupSection
              groupChats={groupChat?.data}
              navigation={navigation}
              message={message}
              project={project}
              task={task}
              file_path={file_path}
              file_name={file_name}
              file_size={file_size}
              mime_type={mime_type}
              forwardScreen={true}
            />
          ) : tabValue === "Personal" ? (
            <PersonalSection
              personalChats={personalChat?.data}
              navigation={navigation}
              message={message}
              project={project}
              task={task}
              file_path={file_path}
              file_name={file_name}
              file_size={file_size}
              mime_type={mime_type}
              forwardScreen={true}
            />
          ) : (
            <>
              <View style={{ marginHorizontal: 16, marginBottom: 14 }}>
                <Input
                  fieldName="search"
                  value={inputToShow}
                  placeHolder="Search"
                  onChangeText={(value) => handleSearch(value)}
                  startIcon="magnify"
                  endIcon={inputToShow && "close"}
                  onPressEndIcon={handleClearSearch}
                />
              </View>
              <FlashList
                ListFooterComponent={contactIsLoading && <ActivityIndicator />}
                estimatedItemSize={200}
                data={cumulativeData.length ? cumulativeData : filteredDataArray}
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.1}
                onEndReached={fetchMoreData}
                renderItem={({ item, index }) => (
                  <UserListItem
                    roomId={item?.chat_personal_id}
                    id={item?.id}
                    image={item?.image}
                    name={item?.name}
                    userType={item?.user_type}
                    multiSelect={false}
                    email={item?.email}
                    type="personal"
                    active_member={0}
                    navigation={navigation}
                    message={message}
                    project={project}
                    task={task}
                    file_path={file_path}
                    file_name={file_name}
                    file_size={file_size}
                    mime_type={mime_type}
                    index={index}
                    length={cumulativeData?.length ? cumulativeData?.length : filteredDataArray?.length}
                  />
                )}
              />
            </>
          )}
        </View>
      </View>
    </Screen>
  );
};

export default Forward;

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
