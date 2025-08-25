import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import UserListItem from "./UserListItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const UserList = ({
  data,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  handleFetchMore,
  refetch,
  isFetching,
  isLoading,
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
  ) : (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
    >
      <View style={styles.wrapper}>
        <EmptyPlaceholder text="No Data" />
      </View>
    </ScrollView>
  );
};

export default UserList;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
