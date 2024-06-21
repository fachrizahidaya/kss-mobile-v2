import { ActivityIndicator, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import Input from "../../shared/Forms/Input";
import UserListItem from "./UserListItem";

const PersonalChatList = ({
  tabValue,
  cumulativeData,
  unattendCumulativeData,
  attendCumulativeData,
  alpaCumulativeData,
  filteredDataArray,
  inputToShow,
  searchHandler,
  setInputToShow,
  setSearchKeyword,
  isLoading,
  hasBeenScrolled,
  setHasBeenScrolled,
  fetchMoreData,
  navigation,
  userSelector,
}) => {
  return (
    <View style={{ flex: 1, gap: 15 }}>
      {tabValue === "All" ? (
        <>
          <View style={{ paddingHorizontal: 16, gap: 15 }}>
            <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
            <Input
              fieldName="search"
              value={inputToShow}
              placeHolder="Search..."
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
          </View>

          <FlashList
            data={cumulativeData.length ? cumulativeData : filteredDataArray}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            onEndReached={fetchMoreData}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <UserListItem
                  user={item}
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
                  userSelector={userSelector}
                  position={item?.employee?.position?.position?.name}
                />
              </View>
            )}
          />
        </>
      ) : tabValue === "Unattend" ? (
        <>
          <View style={{ paddingHorizontal: 16, gap: 15 }}>
            <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
          </View>
          <FlashList
            data={unattendCumulativeData?.length && unattendCumulativeData}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <UserListItem
                  user={item}
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
                  userSelector={userSelector}
                  position={item?.employee?.position?.position?.name}
                />
              </View>
            )}
          />
        </>
      ) : tabValue === "Attend" ? (
        <>
          <View style={{ paddingHorizontal: 16, gap: 15 }}>
            <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
          </View>
          <FlashList
            data={attendCumulativeData?.length && attendCumulativeData}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <UserListItem
                  user={item}
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
                  userSelector={userSelector}
                  position={item?.employee?.position?.position?.name}
                />
              </View>
            )}
          />
        </>
      ) : (
        <>
          <View style={{ paddingHorizontal: 16, gap: 15 }}>
            <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
          </View>
          <FlashList
            data={alpaCumulativeData?.length && alpaCumulativeData}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <UserListItem
                  user={item}
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
                  userSelector={userSelector}
                  position={item?.employee?.position?.position?.name}
                />
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default PersonalChatList;
