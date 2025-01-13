import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  BackHandler,
  ToastAndroid,
  Text,
} from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";

import ProgressChartCard from "../../../components/Band/Dashboard/ProgressChartCard/ProgressChartCard";
import ProjectAndTaskCard from "../../../components/Band/Dashboard/ProjectAndTaskCard/ProjectAndTaskCard";
import ActiveTaskList from "../../../components/Band/Dashboard/ActiveTaskCard/ActiveTaskList";
import { useFetch } from "../../../hooks/useFetch";
import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const BandDashboard = () => {
  const [status, setStatus] = useState("week");
  const [selectedTask, setSelectedTask] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const userSelector = useSelector((state) => state.auth);

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
          ? [
              openTasks / sumAllTasks,
              onProgressTasks / sumAllTasks,
              finishTasks / sumAllTasks,
            ]
          : [0, 0, 0],
      colors: [Colors.primary, "#fcd241", "#FF965D"],
    };
  }, [openTasks, onProgressTasks, finishTasks, sumAllTasks]);

  /**
   * Handle double press back to exit app
   */
  useEffect(() => {
    if (route.name === "Dashboard" && isFocused) {
      const backAction = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }
        setBackPressedOnce(true);
        ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000); // Reset backPressedOnce after 2 seconds
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }
  }, [backPressedOnce, route, isFocused]);

  return (
    <Screen
      screenTitle="Work"
      mainScreen={true}
      companyName={userSelector?.company}
      childrenHeader={
        <Text style={[{ fontSize: 16 }, TextProps]}> Overview</Text>
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={
              projectIsFetching && taskIsFetching && tasksThisYearIsFetching
            }
            onRefresh={refetchEverything}
          />
        }
      >
        <View style={styles.container}>
          <ProjectAndTaskCard
            projects={projects?.data}
            tasks={tasks?.data}
            projectIsLoading={projectIsLoading}
            taskIsLoading={taskIsLoading}
            navigation={navigation}
          />

          {/* {!tasksThisYearIsLoading ? ( */}
          <ProgressChartCard
            data={data}
            open={openTasks}
            onProgress={onProgressTasks}
            finish={finishTasks}
            navigation={navigation}
          />
          {/* ) : (
            <View style={{ marginHorizontal: 14 }}>
              <Skeleton width="100%" height={300} radius={20} {...SkeletonCommonProps} />
            </View>
          )} */}

          <ActiveTaskList
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
        description={
          requestType === "post"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={requestType === "post" ? "info" : "danger"}
      />
    </Screen>
  );
};

export default BandDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 14,
    marginVertical: 14,
  },
});
