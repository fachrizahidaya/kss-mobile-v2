import { useEffect, useState } from "react";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import UserListItem from "./UserListItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const PersonalChatList = ({
  tabValue,
  number,
  cumulativeData,
  unattendCumulativeData,
  attendCumulativeData,
  alpaCumulativeData,
  filteredDataArray,
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

  const renderContent = () => {
    switch (tabValue) {
      case "Unattend":
        return unattendCumulativeData?.length > 0 ? (
          <FlashList
            data={unattendCumulativeData?.length && unattendCumulativeData}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
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
            )}
          />
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder text="No Data" />
          </View>
        );
      case "Attend" || "Present":
        return attendCumulativeData?.length > 0 ? (
          <FlashList
            data={attendCumulativeData?.length && attendCumulativeData}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
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
            )}
          />
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder text="No Data" />
          </View>
        );
      case "Alpa" || "Absent":
        return alpaCumulativeData?.length > 0 ? (
          <FlashList
            data={alpaCumulativeData?.length && alpaCumulativeData}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
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
            )}
          />
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder text="No Data" />
          </View>
        );
      default:
        return cumulativeData?.length > 0 || filteredDataArray?.length > 0 ? (
          <FlashList
            data={cumulativeData.length ? cumulativeData : filteredDataArray}
            ListFooterComponent={hasBeenScrolled && isLoading && <ActivityIndicator />}
            estimatedItemSize={200}
            keyExtractor={(item, index) => index}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            onEndReachedThreshold={0.1}
            onEndReached={fetchMoreData}
            renderItem={({ item }) => (
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
            )}
          />
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder text="No Data" />
          </View>
        );
    }
  };

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(
        direction * width,
        { duration: 300, easing: Easing.out(Easing.cubic) },
        () => {
          translateX.value = 0;
        }
      );
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <View style={{ flex: 1, gap: 15 }}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        {renderContent()}
      </Animated.View>
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
  },
});
