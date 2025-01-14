import dayjs from "dayjs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Skeleton } from "moti/skeleton";
import { FlashList } from "@shopify/flash-list";

import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import JoinedSessionItem from "./JoinedSessionItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import { Colors } from "../../../styles/Color";

const JoinedSession = ({ refetch, isFetching, data }) => {
  return (
    <View style={{ gap: 10, marginTop: 14, marginBottom: 8 }}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 16 }, TextProps]}>Joined Sessions</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable onPress={refetch} style={styles.refresh}>
            <MaterialCommunityIcons
              name="refresh"
              size={15}
              color={Colors.iconDark}
            />
          </Pressable>
        </View>
      </View>

      {
        // !isFetching ? (
        data?.length > 0 ? (
          <FlashList
            data={data}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            refreshing={true}
            estimatedItemSize={80}
            renderItem={({ item, index }) => (
              <JoinedSessionItem
                key={index}
                index={index}
                length={data?.length}
                session_name={item?.session_name}
                begin_time={item?.begin_time}
                end_time={item?.end_time}
                date={dayjs(item?.date).format("DD MMM YYYY")}
                brand={item?.brand?.name}
                host={item?.host}
                host_name={item?.host?.employee?.name}
                host_type={item?.host?.host_type}
              />
            )}
          />
        ) : (
          <EmptyPlaceholder text="No data" />
        )
        // )
        // :
        // (
        //   <View style={{ marginHorizontal: 14 }}>
        //     <Skeleton width="100%" height={80} radius="square" {...SkeletonCommonProps} />
        //   </View>
        // )
      }
    </View>
  );
};

export default JoinedSession;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  refresh: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.backgroundLight,
  },
});
