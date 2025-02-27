import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";
import ApprovalItem from "./ApprovalItem";

const Approval = ({ data, refetch, isFetching, forSick, navigation }) => {
  const length = data?.length;

  return (
    <View style={{ gap: 10, marginTop: 14, marginBottom: !forSick ? 8 : null }}>
      {!forSick ? (
        <View style={styles.header}>
          <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>
            Pending Approval
          </Text>
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
      ) : null}

      {data?.length > 0 ? (
        <FlashList
          data={data}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          refreshing={true}
          estimatedItemSize={80}
          renderItem={({ item, index }) => (
            <ApprovalItem
              key={index}
              index={index}
              due_date={item?.transaction_date}
              description={item?.object}
              status={item?.status}
              length={length}
              request={item?.message}
              date={item?.created_at}
              type={item?.object_type}
              forSick={forSick}
              navigation={navigation}
              kind={item?.object}
              approvalCreator={item?.request_by}
            />
          )}
        />
      ) : (
        <EmptyPlaceholder text="No data" />
      )}
    </View>
  );
};

export default Approval;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  showMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.secondary,
  },
  refresh: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.secondary,
  },
});
