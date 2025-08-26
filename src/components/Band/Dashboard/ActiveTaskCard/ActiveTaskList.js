import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

import ActiveTaskListItem from "./ActiveTaskListItem";
import Button from "../../../../styles/forms/Button";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const ActiveTaskList = ({
  tasks,
  buttons,
  handleOpenTask,
  onToggleModal,
  status,
  isLoading,
}) => {
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
              <Text
                style={{
                  color: status === item.value ? Colors.fontLight : Colors.fontDark,
                }}
              >
                {item.title}
              </Text>
            </Button>
          );
        })}
      </View>

      {tasks?.length > 0 ? (
        <FlashList
          data={tasks}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.1}
          estimatedItemSize={200}
          horizontal
          renderItem={({ item, index }) => (
            <ActiveTaskListItem
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
              length={tasks?.length}
            />
          )}
        />
      ) : (
        // Image here
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={TextProps}>You have no tasks.</Text>
        </View>
      )}
    </View>
  );
};

export default ActiveTaskList;

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
