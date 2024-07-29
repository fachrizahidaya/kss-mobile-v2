import { useEffect, useState } from "react";

import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Input from "../../../styles/forms/Input";
import UserListItem from "./UserListItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const PersonalChatList = ({
  tabValue,
  number,
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
  const [previousTabValue, setPreviousTabValue] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleChange = (value) => {
    searchHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    setInputToShow("");
  };

  const renderContent = () => {
    switch (tabValue) {
      case "Unattend":
        return (
          <>
            <View style={{ paddingHorizontal: 16, gap: 15, marginBottom: 10 }}>
              <Input
                fieldName="search"
                value={inputToShow}
                placeHolder="Search"
                onChangeText={handleChange}
                startIcon="magnify"
                endIcon={inputToShow && "close"}
                onPressEndIcon={handleClearSearch}
              />
            </View>
            {unattendCumulativeData?.length > 0 ? (
              <>
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
              </>
            ) : (
              <View style={styles.wrapper}>
                <EmptyPlaceholder height={250} width={250} text="No Data" />
              </View>
            )}
          </>
        );
      case "Attend":
        return (
          <>
            <View style={{ paddingHorizontal: 16, gap: 15, marginBottom: 10 }}>
              <Input
                fieldName="search"
                value={inputToShow}
                placeHolder="Search"
                onChangeText={handleChange}
                startIcon="magnify"
                endIcon={inputToShow && "close"}
                onPressEndIcon={handleClearSearch}
              />
            </View>
            {attendCumulativeData?.length > 0 ? (
              <>
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
              </>
            ) : (
              <View style={styles.wrapper}>
                <EmptyPlaceholder height={250} width={250} text="No Data" />
              </View>
            )}
          </>
        );
      case "Alpa":
        return (
          <>
            <View style={{ paddingHorizontal: 16, gap: 15, marginBottom: 10 }}>
              <Input
                fieldName="search"
                value={inputToShow}
                placeHolder="Search"
                onChangeText={handleChange}
                startIcon="magnify"
                endIcon={inputToShow && "close"}
                onPressEndIcon={handleClearSearch}
              />
            </View>
            {alpaCumulativeData?.length > 0 ? (
              <>
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
              </>
            ) : (
              <View style={styles.wrapper}>
                <EmptyPlaceholder height={250} width={250} text="No Data" />
              </View>
            )}
          </>
        );
      default:
        return (
          <>
            <View style={{ paddingHorizontal: 16, gap: 15, marginBottom: 10 }}>
              <Input
                fieldName="search"
                value={inputToShow}
                placeHolder="Search"
                onChangeText={handleChange}
                startIcon="magnify"
                endIcon={inputToShow && "close"}
                onPressEndIcon={handleClearSearch}
              />
            </View>
            {cumulativeData?.length > 0 || filteredDataArray?.length > 0 ? (
              <>
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
              </>
            ) : (
              <View style={styles.wrapper}>
                <EmptyPlaceholder height={250} width={250} text="No Data" />
              </View>
            )}
          </>
        );
    }
  };

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(direction * width, { duration: 300, easing: Easing.out(Easing.cubic) }, () => {
        translateX.value = 0;
      });
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <View style={{ flex: 1, gap: 15 }}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>{renderContent()}</Animated.View>
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
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
});
