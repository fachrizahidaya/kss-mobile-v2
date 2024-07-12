import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import Input from "../../../styles/forms/Input";
import UserListItem from "./UserListItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

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
          </View>
          {cumulativeData?.length > 0 ? (
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
                    attendanceToday={item?.employee?.attendance_today}
                  />
                </View>
              )}
            />
          ) : (
            <View style={styles.wrapper}>
              <EmptyPlaceholder height={250} width={250} text="No Data" />
            </View>
          )}
        </>
      ) : tabValue === "Unattend" ? (
        <>
          {unattendCumulativeData?.length > 0 ? (
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
                    attendanceToday={item?.employee?.attendance_today}
                  />
                </View>
              )}
            />
          ) : (
            <View style={styles.wrapper}>
              <EmptyPlaceholder height={250} width={250} text="No Data" />
            </View>
          )}
        </>
      ) : tabValue === "Attend" ? (
        <>
          {attendCumulativeData?.length > 0 ? (
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
                    attendanceToday={item?.employee?.attendance_today}
                  />
                </View>
              )}
            />
          ) : (
            <View style={styles.wrapper}>
              <EmptyPlaceholder height={250} width={250} text="No Data" />
            </View>
          )}
        </>
      ) : (
        <>
          {alpaCumulativeData?.length > 0 ? (
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
                    attendanceToday={item?.employee?.attendance_today}
                  />
                </View>
              )}
            />
          ) : (
            <View style={styles.wrapper}>
              <EmptyPlaceholder height={250} width={250} text="No Data" />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default PersonalChatList;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
