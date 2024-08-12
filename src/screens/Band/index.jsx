import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";

import ProgressChartCard from "../../components/Band/Dashboard/ProgressChartCard/ProgressChartCard";
import ProjectAndTaskCard from "../../components/Band/Dashboard/ProjectAndTaskCard/ProjectAndTaskCard";
import ActiveTaskCard from "../../components/Band/Dashboard/ActiveTaskCard/ActiveTaskCard";
import { useFetch } from "../../hooks/useFetch";
import { SkeletonCommonProps, TextProps } from "../../styles/CustomStylings";
import { useDisclosure } from "../../hooks/useDisclosure";
import ConfirmationModal from "../../styles/modals/ConfirmationModal";
import AlertModal from "../../styles/modals/AlertModal";

const BandDashboard = () => {
  const [status, setStatus] = useState("week");
  const [selectedTask, setSelectedTask] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();

  const { isOpen: taskIsOpen, toggle: toggleTask } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const activeTasksButtons = [
    { title: "Month", value: "month", onPress: () => setStatus("month") },
    { title: "Week", value: "week", onPress: () => setStatus("week") },
    { title: "Day", value: "day", onPress: () => setStatus("day") },
  ];

  const fetchParameters = {
    limit: 10,
    status: status,
  };

  const {
    data: projects,
    isLoading: projectIsLoading,
    refetch: refetchProjects,
    isFetching: projectIsFetching,
  } = useFetch("/pm/projects/total");

  const {
    data: tasks,
    isLoading: taskIsLoading,
    refetch: refetchTasks,
    isFetching: taskIsFetching,
  } = useFetch("/pm/tasks/total");

  const {
    data: tasksThisYear,
    isLoading: tasksThisYearIsLoading,
    refetch: refetchTasksThisYear,
    isFetching: tasksThisYearIsFetching,
  } = useFetch("/pm/tasks/year-tasks");

  const {
    data: activeTasks,
    isLoading: activeTasksIsLoading,
    refetch: refetchActiveTasks,
  } = useFetch(`/pm/tasks`, [status], fetchParameters);

  const refetchEverything = () => {
    refetchProjects();
    refetchTasks();
    refetchTasksThisYear();
    refetchActiveTasks();
  };

  const onPressTaskItem = (id) => {
    navigation.navigate("Task Detail", { taskId: id });
  };

  const openCloseModal = useCallback((task) => {
    setSelectedTask(task);
    toggleTask();
  }, []);

  const openTasks = tasksThisYear?.data?.total_open || 0;
  const onProgressTasks = tasksThisYear?.data?.total_onprogress || 0;
  const finishTasks = tasksThisYear?.data?.total_finish || 0;
  const sumAllTasks = openTasks + onProgressTasks + finishTasks;

  const data = useMemo(() => {
    return {
      labels: ["Open", "On Progress", "Finish"],
      // total tasks divided by task on that status length
      data:
        sumAllTasks !== 0
          ? [openTasks / sumAllTasks, onProgressTasks / sumAllTasks, finishTasks / sumAllTasks]
          : [0, 0, 0],
      colors: ["#176688", "#fcd241", "#FF965D"],
    };
  }, [openTasks, onProgressTasks, finishTasks, sumAllTasks]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexWrapper}>
        <View style={{ flexDirection: "row", gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 700, color: "#176688" }}>Work</Text>
          <Text style={[{ fontSize: 16 }, TextProps]}>Overview</Text>
        </View>

        <Text style={[{ fontWeight: 700 }, TextProps]}>PT Kolabora Group Indonesia</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={projectIsFetching && taskIsFetching && tasksThisYearIsFetching}
            onRefresh={refetchEverything}
          />
        }
      >
        <View style={styles.contentWrapper}>
          <ProjectAndTaskCard
            projects={projects?.data}
            tasks={tasks?.data}
            projectIsLoading={projectIsLoading}
            taskIsLoading={taskIsLoading}
          />

          {!tasksThisYearIsLoading ? (
            <ProgressChartCard data={data} open={openTasks} onProgress={onProgressTasks} finish={finishTasks} />
          ) : (
            <View style={{ marginHorizontal: 14 }}>
              <Skeleton width="100%" height={300} radius={20} {...SkeletonCommonProps} />
            </View>
          )}

          <ActiveTaskCard
            tasks={activeTasks?.data?.data}
            buttons={activeTasksButtons}
            handleOpenTask={onPressTaskItem}
            onToggleModal={openCloseModal}
            status={status}
            isLoading={activeTasksIsLoading}
          />
        </View>
      </ScrollView>

      <ConfirmationModal
        isDelete={false}
        isOpen={taskIsOpen}
        toggle={toggleTask}
        apiUrl={"/pm/tasks/close"}
        body={{ id: selectedTask?.id }}
        header="Close Task"
        description={`Are you sure to close task ${selectedTask?.title}?`}
        hasSuccessFunc
        onSuccess={refetchActiveTasks}
        toggleOtherModal={toggleAlert}
        setRequestType={setRequestType}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
      />
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "post" ? "Task closed!" : "Process error!"}
        description={requestType === "post" ? "Data successfully saved" : errorMessage || "Please try again later"}
        type={requestType === "post" ? "info" : "danger"}
      />
    </SafeAreaView>
  );
};

export default BandDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  flexWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  contentWrapper: {
    flex: 1,
    gap: 14,
    marginVertical: 14,
  },
});
