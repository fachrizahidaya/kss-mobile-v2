import { FlashList } from "@shopify/flash-list";
<<<<<<< HEAD
<<<<<<< HEAD
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import UserListItem from "./UserListItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;
=======
import { Text } from "react-native";

import UserListItem from "./UserListItem";
>>>>>>> 2075a560 (feat: new user)
=======
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import UserListItem from "./UserListItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;
>>>>>>> 5ef7bde9 (fix: new user, contact list)

const UserList = ({
  data,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  handleFetchMore,
  refetch,
  isFetching,
  isLoading,
<<<<<<< HEAD
<<<<<<< HEAD
  navigation,
}) => {
  return data?.length > 0 || filteredData?.length > 0 ? (
    <FlashList
      data={data?.length > 0 ? data : filteredData}
      onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
      estimatedItemSize={200}
      onEndReachedThreshold={0.1}
      onEndReached={hasBeenScrolled ? handleFetchMore : null}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      keyExtractor={(item, index) => index}
      refreshing={true}
      ListFooterComponent={() => hasBeenScrolled && isFetching && <ActivityIndicator />}
=======
  setInputShow,
  setSearchInput,
  handleSearch,
  handleClearSearch,
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
  navigation,
}) => {
  return data?.length > 0 || filteredData?.length > 0 ? (
    <FlashList
      data={data?.length > 0 ? data : filteredData}
      onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
      estimatedItemSize={200}
      onEndReachedThreshold={0.1}
      onEndReached={hasBeenScrolled ? handleFetchMore : null}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      keyExtractor={(item, index) => index}
      refreshing={true}
<<<<<<< HEAD
>>>>>>> 2075a560 (feat: new user)
=======
      ListFooterComponent={() => hasBeenScrolled && isFetching && <ActivityIndicator />}
>>>>>>> 5ef7bde9 (fix: new user, contact list)
      renderItem={({ item, index }) => (
        <UserListItem
          key={index}
          index={index}
          length={data?.length}
          name={item?.name}
          role={item?.user_role_id}
          role_name={item?.user_right_name}
          type={item?.user_type}
        />
      )}
    />
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
  ) : (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
    >
      <View style={styles.wrapper}>
        <EmptyPlaceholder text="No Data" />
      </View>
    </ScrollView>
<<<<<<< HEAD
=======
>>>>>>> 2075a560 (feat: new user)
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
  );
};

export default UserList;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
<<<<<<< HEAD
=======
>>>>>>> 2075a560 (feat: new user)
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
