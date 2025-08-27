import { FlashList } from "@shopify/flash-list";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import UserListItem from "./UserListItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  ) : (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
    >
      <View style={styles.wrapper}>
        <EmptyPlaceholder text="No Data" />
      </View>
    </ScrollView>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2075a560 (feat: new user)
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  );
};

export default UserList;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2075a560 (feat: new user)
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
