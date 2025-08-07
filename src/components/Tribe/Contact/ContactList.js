import { memo, useEffect, useState } from "react";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import ContactListItem from "./ContactListItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

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
  unattendData,
  attendData,
  alpaData,
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
          <ContactListByAttendance
            data={alpaData}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            handleFetchMore={handleFetchMoreContact}
            isFetching={isFetching}
            isLoading={isLoading}
            refetch={refetch}
            userSelector={userSelector}
            navigation={navigation}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          >
            <View style={styles.wrapper}>
              <EmptyPlaceholder text="No Data" />
            </View>
          </ScrollView>
        );
      case "Unattend":
        return unattendData?.length > 0 ? (
          <ContactListByAttendance
            data={unattendData}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            handleFetchMore={handleFetchMoreContact}
            isFetching={isFetching}
            isLoading={isLoading}
            refetch={refetch}
            userSelector={userSelector}
            navigation={navigation}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          >
            <View style={styles.wrapper}>
              <EmptyPlaceholder text="No Data" />
            </View>
          </ScrollView>
        );
      case "Attend" || "Present":
        return attendData?.length > 0 ? (
          <ContactListByAttendance
            data={attendData}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            handleFetchMore={handleFetchMoreContact}
            isFetching={isFetching}
            isLoading={isLoading}
            refetch={refetch}
            userSelector={userSelector}
            navigation={navigation}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          >
            <View style={styles.wrapper}>
              <EmptyPlaceholder text="No Data" />
            </View>
          </ScrollView>
        );
      default:
        return (
          <>
            {data?.length > 0 || filteredData?.length ? (
              <ContactListByAttendance
                data={data?.length > 0 ? data : filteredData}
                hasBeenScrolled={hasBeenScrolled}
                setHasBeenScrolled={setHasBeenScrolled}
                handleFetchMore={handleFetchMoreContact}
                isFetching={isFetching}
                isLoading={isLoading}
                refetch={refetch}
                userSelector={userSelector}
                navigation={navigation}
              />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                }
              >
                <View style={styles.wrapper}>
                  <EmptyPlaceholder text="No Data" />
                </View>
              </ScrollView>
            )}
          </>
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
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        {renderContent()}
      </Animated.View>
    </View>
  );
};

export default memo(ContactList);

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

const ContactListByAttendance = ({
  data,
  hasBeenScrolled,
  setHasBeenScrolled,
  handleFetchMore,
  isFetching,
  isLoading,
  refetch,
  userSelector,
  navigation,
}) => {
  return (
    <FlashList
      data={data}
      onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
      keyExtractor={(item, index) => index}
      onEndReachedThreshold={0.1}
      estimatedItemSize={200}
      onEndReached={hasBeenScrolled ? handleFetchMore : null}
      refreshing={true}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      ListFooterComponent={() => hasBeenScrolled && isFetching && <ActivityIndicator />}
      renderItem={({ item, index }) => (
        <ContactListItem
          key={index}
          index={index}
          length={data?.length}
          id={item?.id}
          name={item?.name}
          position={item?.job_history?.position?.name}
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
  );
};
