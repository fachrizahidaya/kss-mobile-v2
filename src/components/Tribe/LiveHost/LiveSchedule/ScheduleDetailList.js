import { FlashList } from "@shopify/flash-list";
import { Dimensions, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import ScheduleDetailListItem from "./ScheduleDetailListItem";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";

const screenHeight = Dimensions.get("screen").height;

const ScheduleDetailList = ({ data, isLoading, refetch, setRequstType, setError, toggleAlert }) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  return (
    <View style={styles.wrapper}>
      {data?.length > 0 ? (
        <FlashList
          data={data}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          estimatedItemSize={70}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          renderItem={({ item, index }) => (
            <ScheduleDetailListItem
              key={index}
              index={index}
              id={item?.id}
              length={data?.length}
              begin_time={item?.begin_time}
              brand={item?.brand?.name}
              end_time={item?.end_time}
              min_achievement={currencyFormatter.format(item?.min_achievement)}
              real_achievement={item?.real_achievement}
              formatter={currencyFormatter}
              hosts={item?.host}
              refetch={refetch}
              setRequestType={setRequstType}
              setError={setError}
              toggle={toggleAlert}
            />
          )}
        />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
          <View style={styles.content}>
            <EmptyPlaceholder text="No data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ScheduleDetailList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 250,
  },
});
