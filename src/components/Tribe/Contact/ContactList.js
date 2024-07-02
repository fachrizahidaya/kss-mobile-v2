import { memo } from "react";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import ContactItem from "./ContactItem";
import EmptyPlaceholder from "../../shared/EmptyPlaceholder";
import Input from "../../shared/Forms/Input";

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
  inputToShow,
  setInputToShow,
  setSearchInput,
  searchContactHandler,
  unattendData,
  attendData,
  alpaData,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {tabValue === "All" ? (
        <>
          <View style={styles.container}>
            <Input
              value={inputToShow}
              fieldName="search"
              startIcon="magnify"
              endIcon={inputToShow && "close-circle-outline"}
              onPressEndIcon={() => {
                setInputToShow("");
                setSearchInput("");
              }}
              onChangeText={(value) => {
                searchContactHandler(value);
                setInputToShow(value);
              }}
              placeHolder="Search contact"
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
      ) : tabValue === "Unattend" ? (
        unattendData?.length > 0 ? (
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
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder height={250} width={250} text="No Data" />
          </View>
        )
      ) : tabValue === "Attend" ? (
        attendData?.length > 0 ? (
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
        ) : (
          <View style={styles.wrapper}>
            <EmptyPlaceholder height={250} width={250} text="No Data" />
          </View>
        )
      ) : alpaData?.length > 0 ? (
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
      ) : (
        <View style={styles.wrapper}>
          <EmptyPlaceholder height={250} width={250} text="No Data" />
        </View>
      )}
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
});
