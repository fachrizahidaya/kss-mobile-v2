import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import MyTeamLeaveRequestItem from "./MyTeamLeaveRequestItem";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const MyTeamLeaveRequestList = ({
  data,
  hasBeenScrolled,
  setHasBeenScrolled,
  fetchMore,
  isFetching,
  refetch,
  refetchTeam,
  isLoading,
  formik,
  isSubmitting,
  handleResponse,
}) => {
  const handleRefresh = () => {
    refetch();
    refetchTeam();
  };

  return data.length > 0 ? (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        onEndReachedThreshold={0.1}
        onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
        onEndReached={hasBeenScrolled === true ? fetchMore : null}
        keyExtractor={(item, index) => index}
        estimatedItemSize={200}
        refreshing={true}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
        ListFooterComponent={() => hasBeenScrolled && isFetching && <ActivityIndicator />}
        renderItem={({ item, index }) => (
          <MyTeamLeaveRequestItem
            item={item}
            key={index}
            leave_name={item?.leave?.name}
            reason={item?.reason}
            days={item?.days}
            begin_date={item?.begin_date}
            end_date={item?.end_date}
            status={item?.status}
            employee_name={item?.employee?.name}
            employee_image={item?.employee?.image}
            handleResponse={handleResponse}
            isSubmitting={isSubmitting}
            formik={formik}
            index={index}
            length={data?.length}
          />
        )}
      />
    </View>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.emptyScreen}>
        <EmptyPlaceholder text="No Data" />
      </View>
    </ScrollView>
  );
};

export default MyTeamLeaveRequestList;

const styles = StyleSheet.create({
  emptyScreen: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
});
