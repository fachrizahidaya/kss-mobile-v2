import { memo, useState } from "react";

import { View, Text, useWindowDimensions, TouchableOpacity, StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";

import TaskListItem from "./TaskListItem/TaskListItem";
import TaskSkeleton from "./TaskSkeleton";
import { TextProps } from "../../../../styles/CustomStylings";

const TaskList = ({
  tasks,
  isLoading,
  openCloseTaskConfirmation,
  isFetching,
  refetch,
  setSelectedStatus,
  setHideIcon,
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "open", title: "Open" },
    { key: "onProgress", title: "On Progress" },
    { key: "finish", title: "Finish" },
  ]);

  const todoTasks = tasks?.filter((task) => {
    return task.status === "Open";
  });
  const onProgressTasks = tasks?.filter((task) => {
    return task.status === "On Progress";
  });

  const finishTasks = tasks?.filter((task) => {
    return task.status === "Finish" || task.status === "Closed";
  });

  const renderFlashList = (data = []) => {
    return (
      <View style={{ gap: 10, flex: 1, backgroundColor: "#f8f8f8" }}>
        {!isLoading ? (
          data.length > 0 ? (
            <FlashList
              refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
              data={data}
              keyExtractor={(item) => item.id}
              estimatedItemSize={97}
              onEndReachedThreshold={0.1}
              onScrollBeginDrag={() => setHideIcon(true)}
              onScrollEndDrag={() => setHideIcon(false)}
              renderItem={({ item }) => (
                <TaskListItem
                  id={item.id}
                  no={item.task_no}
                  task={item}
                  title={item.title}
                  image={item.responsible_image}
                  deadline={item.deadline}
                  priority={item.priority}
                  totalAttachments={item.total_attachment}
                  totalChecklists={item.total_checklist}
                  totalChecklistsDone={item.total_checklist_finish}
                  totalComments={item.total_comment}
                  status={item.status}
                  responsible={item.responsible_name}
                  responsibleId={item.responsible_id}
                  openCloseTaskConfirmation={openCloseTaskConfirmation}
                />
              )}
            />
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <Text style={TextProps}>No task available</Text>
            </View>
          )
        ) : (
          <TaskSkeleton />
        )}
      </View>
    );
  };

  const Open = () => renderFlashList(todoTasks);

  const OnProgress = () => renderFlashList(onProgressTasks);

  const Finish = () => renderFlashList(finishTasks);

  const renderScene = SceneMap({
    open: Open,
    onProgress: OnProgress,
    finish: Finish,
  });

  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", paddingHorizontal: 14 }}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.container, { backgroundColor: index === i ? "#176688" : null }]}
          onPress={() => setIndex(i)}
        >
          <Text style={{ color: index === i ? "#FFFFFF" : "#000000" }}>{route.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default memo(TaskList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 8,
  },
});
