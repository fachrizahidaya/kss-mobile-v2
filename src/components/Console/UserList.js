import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native";
import UserListItem from "./UserListItem";

const UserList = ({
  data,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  handleFetchMore,
  refetch,
  isFetching,
  isLoading,
  setInputShow,
  setSearchInput,
  handleSearch,
  handleClearSearch,
  navigation,
}) => {
  return (
    <FlashList
      data={data}
      estimatedItemSize={200}
      onEndReachedThreshold={0.1}
      keyExtractor={(item, index) => index}
      refreshing={true}
      renderItem={({ item, index }) => (
        <UserListItem key={index} index={index} length={data?.length} />
      )}
    />
  );
};

export default UserList;
