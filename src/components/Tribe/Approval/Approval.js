<<<<<<< HEAD
<<<<<<< HEAD
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

=======
import { Pressable, StyleSheet, Text, View } from "react-native";
=======
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
>>>>>>> f8bd7d2f (fix: isLoading indicator, condition login)
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
>>>>>>> 27c0a3f5 (feat: pending approval)
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";
import ApprovalItem from "./ApprovalItem";

<<<<<<< HEAD
const Approval = ({
  data,
  refetch,
  isFetching,
  forSick,
  navigation,
  loggedInEmployee,
  handleSelectApproval,
}) => {
=======
const Approval = ({ data, refetch, isFetching, forSick, navigation }) => {
>>>>>>> 27c0a3f5 (feat: pending approval)
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
<<<<<<< HEAD
<<<<<<< HEAD
              <MaterialCommunityIcons name="refresh" size={15} color={Colors.iconDark} />
=======
              <MaterialCommunityIcons
                name="refresh"
                size={15}
                color={Colors.iconDark}
              />
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
              <MaterialCommunityIcons name="refresh" size={15} color={Colors.iconDark} />
>>>>>>> f8bd7d2f (fix: isLoading indicator, condition login)
            </Pressable>
          </View>
        </View>
      ) : null}

<<<<<<< HEAD
<<<<<<< HEAD
      {isFetching ? (
        <ActivityIndicator />
      ) : (
=======
      {data?.length > 0 ? (
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
      {isFetching ? (
        <ActivityIndicator />
      ) : (
>>>>>>> f8bd7d2f (fix: isLoading indicator, condition login)
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
<<<<<<< HEAD
              id={item?.id}
              due_date={item?.transaction_date}
              description={item?.object}
=======
              due_date={item?.transaction_date}
<<<<<<< HEAD
              description={item?.reason}
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
              description={item?.object}
>>>>>>> 8d10428a (fix: pending approval)
              status={item?.status}
              length={length}
              request={item?.message}
              date={item?.created_at}
              type={item?.object_type}
              forSick={forSick}
              navigation={navigation}
              kind={item?.object}
<<<<<<< HEAD
<<<<<<< HEAD
              approvalCreator={item?.request_by_id}
              loggedInEmployee={loggedInEmployee}
              handleSelectApproval={handleSelectApproval}
            />
          )}
        />
=======
=======
              approvalCreator={item?.request_by}
>>>>>>> f2850a25 (fix: pending approval, add section task)
            />
          )}
        />
<<<<<<< HEAD
      ) : (
        <EmptyPlaceholder text="No data" />
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
>>>>>>> f8bd7d2f (fix: isLoading indicator, condition login)
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
    paddingVertical: 14,
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
<<<<<<< HEAD
    paddingVertical: 6,
    paddingHorizontal: 6,
=======
    paddingVertical: 4,
    paddingHorizontal: 8,
>>>>>>> 27c0a3f5 (feat: pending approval)
    backgroundColor: Colors.secondary,
  },
});
