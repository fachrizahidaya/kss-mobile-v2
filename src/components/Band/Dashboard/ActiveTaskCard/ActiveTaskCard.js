import { View, Text, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { FlashList } from "@shopify/flash-list";

import ActiveTaskList from "./ActiveTaskList";
import { card } from "../../../../styles/Card";
import Button from "../../../../styles/forms/Button";
import { SkeletonCommonProps, TextProps } from "../../../../styles/CustomStylings";

const ActiveTaskCard = ({ tasks, buttons, handleOpenTask, onToggleModal, status, isLoading }) => {
  return (
    <>
      <View style={[card.card]}>
        <View style={{ gap: 10 }}>
          <Text style={[{ fontSize: 20, fontWeight: 500 }, TextProps]}>Active Tasks</Text>
          <View style={styles.wrapper}>
            {buttons?.map((item, index) => {
              return (
                <Button
                  key={index}
                  flex={1}
                  backgroundColor={status === item.value ? "#176688" : "#fff"}
                  onPress={item.onPress}
                >
                  <Text style={{ color: status === item.value ? "#fff" : "#3F434A" }}>{item.title}</Text>
                </Button>
              );
            })}
          </View>

          {!isLoading ? (
            tasks?.length > 0 ? (
              <FlashList
                data={tasks}
                keyExtractor={(item) => item.id}
                onEndReachedThreshold={0.1}
                estimatedItemSize={200}
                horizontal
                renderItem={({ item }) => (
                  <ActiveTaskList
                    key={item.id}
                    id={item.id}
                    task={item}
                    title={item.title}
                    responsible={item.responsible_name}
                    image={item.responsible_image}
                    status={item.status}
                    priority={item.priority}
                    onPress={onToggleModal}
                    onPressItem={handleOpenTask}
                  />
                )}
              />
            ) : (
              // Image here
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={TextProps}>You have no tasks.</Text>
              </View>
            )
          ) : (
            <Skeleton width={120} height={20} radius="round" {...SkeletonCommonProps} />
          )}
        </View>
      </View>
    </>
  );
};

export default ActiveTaskCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 0.5,
    borderColor: "#E8E9EB",
  },
});
