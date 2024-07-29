import { memo, useEffect, useState } from "react";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import ContactItem from "./ContactItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import Input from "../../../styles/forms/Input";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const height = Dimensions.get("screen").height - 300;

const ContactList = ({
  data,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  handleFetchMoreContact,
  isFetching,
  isLoading,
  refetch,
  navigation,
  userSelector,
  tabValue,
  number,
  inputToShow,
  unattendData,
  attendData,
  alpaData,
  handleClearSearch,
  handleSearch,
}) => {
  const [previousTabValue, setPreviousTabValue] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const renderContent = () => {
    switch (tabValue) {
      case "Alpa":
        return alpaData?.length > 0 ? (
          <>
            <View style={styles.container}>
              <Input
                value={inputToShow}
                fieldName="search"
                startIcon="magnify"
                endIcon={inputToShow && "close-circle-outline"}
                onPressEndIcon={handleClearSearch}
                onChangeText={handleSearch}
                placeHolder="Search"
                height={40}
              />
            </View>
            <FlashList
              data={alpaData}
              onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={200}
              onEndReached={hasBeenScrolled ? handleFetchMoreContact : null}
              refreshing={true}
              refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
              ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
              renderItem={({ item, index }) => (
                <ContactItem
                  key={index}
                  id={item?.id}
                  name={item?.name}
                  position={item?.position_name}
                  image={item?.image}
                  phone={item?.phone_number}
                  email={item?.email}
                  user={item?.user}
                  user_id={item?.user?.id}
                  room_id={item?.chat_personal_id}
                  user_name={item?.user?.name}
                  user_type={item?.user?.user_type}
                  user_image={item?.user?.image}
                  loggedEmployeeId={userSelector?.user_role_id}
                  navigation={navigation}
                  leave_status={item?.is_leave_today}
                  attendanceToday={item?.attendance_today}
                />
              )}
            />
          </>
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder height={250} width={250} text="No Data" />
          </View>
        );
      case "Unattend":
        return unattendData?.length > 0 ? (
          <>
            <View style={styles.container}>
              <Input
                value={inputToShow}
                fieldName="search"
                startIcon="magnify"
                endIcon={inputToShow && "close-circle-outline"}
                onPressEndIcon={handleClearSearch}
                onChangeText={handleSearch}
                placeHolder="Search"
                height={40}
              />
            </View>
            <FlashList
              data={unattendData}
              onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={200}
              onEndReached={hasBeenScrolled ? handleFetchMoreContact : null}
              refreshing={true}
              refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
              ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
              renderItem={({ item, index }) => (
                <ContactItem
                  key={index}
                  id={item?.id}
                  name={item?.name}
                  position={item?.position_name}
                  image={item?.image}
                  phone={item?.phone_number}
                  email={item?.email}
                  user={item?.user}
                  user_id={item?.user?.id}
                  room_id={item?.chat_personal_id}
                  user_name={item?.user?.name}
                  user_type={item?.user?.user_type}
                  user_image={item?.user?.image}
                  loggedEmployeeId={userSelector?.user_role_id}
                  navigation={navigation}
                  leave_status={item?.is_leave_today}
                  attendanceToday={item?.attendance_today}
                />
              )}
            />
          </>
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder height={250} width={250} text="No Data" />
          </View>
        );
      case "Attend":
        return attendData?.length > 0 ? (
          <>
            <View style={styles.container}>
              <Input
                value={inputToShow}
                fieldName="search"
                startIcon="magnify"
                endIcon={inputToShow && "close-circle-outline"}
                onPressEndIcon={handleClearSearch}
                onChangeText={handleSearch}
                placeHolder="Search"
                height={40}
              />
            </View>
            <FlashList
              data={attendData}
              onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={200}
              onEndReached={hasBeenScrolled ? handleFetchMoreContact : null}
              refreshing={true}
              refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
              ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
              renderItem={({ item, index }) => (
                <ContactItem
                  key={index}
                  id={item?.id}
                  name={item?.name}
                  position={item?.position_name}
                  image={item?.image}
                  phone={item?.phone_number}
                  email={item?.email}
                  user={item?.user}
                  user_id={item?.user?.id}
                  room_id={item?.chat_personal_id}
                  user_name={item?.user?.name}
                  user_type={item?.user?.user_type}
                  user_image={item?.user?.image}
                  loggedEmployeeId={userSelector?.user_role_id}
                  navigation={navigation}
                  leave_status={item?.is_leave_today}
                  attendanceToday={item?.attendance_today}
                />
              )}
            />
          </>
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder height={250} width={250} text="No Data" />
          </View>
        );
      default:
        return (
          <>
            <View style={styles.container}>
              <Input
                value={inputToShow}
                fieldName="search"
                startIcon="magnify"
                endIcon={inputToShow && "close-circle-outline"}
                onPressEndIcon={handleClearSearch}
                onChangeText={handleSearch}
                placeHolder="Search"
                height={40}
              />
            </View>
            {data?.length > 0 || filteredData?.length ? (
              <FlashList
                data={data?.length ? data : filteredData}
                onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.1}
                estimatedItemSize={200}
                onEndReached={hasBeenScrolled ? handleFetchMoreContact : null}
                refreshing={true}
                refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
                ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
                renderItem={({ item, index }) => (
                  <ContactItem
                    key={index}
                    id={item?.id}
                    name={item?.name}
                    position={item?.position_name}
                    image={item?.image}
                    phone={item?.phone_number}
                    email={item?.email}
                    user={item?.user}
                    user_id={item?.user?.id}
                    room_id={item?.chat_personal_id}
                    user_name={item?.user?.name}
                    user_type={item?.user?.user_type}
                    user_image={item?.user?.image}
                    loggedEmployeeId={userSelector?.user_role_id}
                    navigation={navigation}
                    leave_status={item?.is_leave_today}
                    attendanceToday={item?.attendance_today}
                  />
                )}
              />
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
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>{renderContent()}</Animated.View>
    </View>
  );
};

export default memo(ContactList);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
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
