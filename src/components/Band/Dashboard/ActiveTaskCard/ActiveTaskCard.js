import { View, Text, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { FlashList } from "@shopify/flash-list";

import ActiveTaskList from "./ActiveTaskList";
import Button from "../../../../styles/forms/Button";
import { SkeletonCommonProps, TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const ActiveTaskCard = ({ tasks, buttons, handleOpenTask, onToggleModal, status, isLoading }) => {
  const length = tasks?.length;

  return (
    <View style={{ gap: 10 }}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 20, fontWeight: "500" }, TextProps]}>Active Tasks</Text>
      </View>
      <View style={styles.wrapper}>
        {buttons?.map((item, index) => {
          return (
            <Button
              key={index}
              flex={1}
              backgroundColor={status === item.value ? Colors.primary : Colors.secondary}
              onPress={item.onPress}
            >
              <Text style={{ color: status === item.value ? Colors.fontLight : Colors.fontDark }}>{item.title}</Text>
            </Button>
          );
        })}
      </View>

      {!isLoading ? (
        tasks?.length > 0 ? (
          <FlashList
            data={tasks}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            estimatedItemSize={200}
            horizontal
            renderItem={({ item, index }) => (
              <ActiveTaskList
                key={index}
                index={index}
                id={item.id}
                task={item}
                title={item.title}
                responsible={item.responsible_name}
                image={item.responsible_image}
                status={item.status}
                priority={item.priority}
                onPress={onToggleModal}
                onPressItem={handleOpenTask}
                length={length}
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
        <View style={{ marginHorizontal: 14 }}>
          <Skeleton width="100%" height={80} radius="square" {...SkeletonCommonProps} />
        </View>
      )}
    </View>
  );
};

export default ActiveTaskCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});
