import { ActivityIndicator, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import KPIListItem from "./KPIListItem";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";

const KPI = ({
  tabValue,
  ongoingList,
  archived,
  isFetching,
  refetch,
  archivedIsFetching,
  height,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {tabValue === "Ongoing" ? (
        ongoingList?.length > 0 ? (
          <FlashList
            data={ongoingList}
            estimatedItemSize={50}
            onEndReachedThreshold={0.1}
            refreshing={true}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            keyExtractor={(item, index) => index}
            ListFooterComponent={() => isFetching && <ActivityIndicator />}
            renderItem={({ item, index }) => (
              <KPIListItem
                key={index}
                id={item?.id}
                start_date={item?.review?.begin_date}
                end_date={item?.review?.end_date}
                navigation={navigation}
                name={item?.review?.description}
                target={item?.target_name}
                isExpired={false}
                target_level={item?.target_level}
                status="ongoing"
                index={index}
                length={ongoingList?.length}
              />
            )}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          >
            <View
              style={{ alignItems: "center", justifyContent: "center", height: height }}
            >
              <EmptyPlaceholder text="No Data" />
            </View>
          </ScrollView>
        )
      ) : archived?.data?.length > 0 ? (
        <FlashList
          data={archived?.data}
          estimatedItemSize={50}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index}
          ListFooterComponent={() => archivedIsFetching && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <KPIListItem
              key={index}
              id={item?.id}
              start_date={item?.review?.begin_date}
              end_date={item?.review?.end_date}
              navigation={navigation}
              name={item?.review?.description}
              target={item?.target_name}
              isExpired={true}
              status="archived"
            />
          )}
        />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", height: height }}
          >
            <EmptyPlaceholder text="No Data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default KPI;
