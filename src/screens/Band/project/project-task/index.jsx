import { useCallback, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  Dimensions,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../../hooks/useFetch";
import TaskList from "../../../../components/Band/Task/TaskList/TaskList";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import TaskFilter from "../../../../components/Band/shared/TaskFilter/TaskFilter";
import PageHeader from "../../../../styles/PageHeader";
import ConfirmationModal from "../../../../styles/modals/ConfirmationModal";
import useCheckAccess from "../../../../hooks/useCheckAccess";
import AlertModal from "../../../../styles/modals/AlertModal";

const ProjectTaskScreen = ({ route }) => {
  const [selectedStatus, setSelectedStatus] = useState("Open");
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [responsibleId, setResponsibleId] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [deadlineSort, setDeadlineSort] = useState("asc");
  const [selectedTask, setSelectedTask] = useState(null);
  const [hideCreateIcon, setHideCreateIcon] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestType, setRequestType] = useState("");

  const navigation = useNavigation();
  const firstTimeRef = useRef(true);
  const { width } = Dimensions.get("screen");
  const { projectId } = route.params;

  const { isOpen: closeConfirmationIsOpen, toggle: toggleCloseConfirmation } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const createCheckAccess = useCheckAccess("create", "Tasks");

  const params = {
    selectedStatus: selectedStatus,
    refetch: refetchTasks,
    projectId: projectId,
  };

  const fetchTaskParameters = {
    label_id: selectedLabelId,
    search: searchInput,
    responsible_id: responsibleId,
    priority: selectedPriority,
    sort_deadline: deadlineSort,
  };

  const { data, isLoading } = useFetch(`/pm/projects/${projectId}`);
  const {
    data: tasks,
    isLoading: taskIsLoading,
    isFetching: taskIsFetching,
    refetch: refetchTasks,
  } = useFetch(
    `/pm/tasks/project/${projectId}`,
    [selectedLabelId, searchInput, responsibleId, selectedPriority, deadlineSort],
    fetchTaskParameters
  );
  const { data: members } = useFetch(`/pm/projects/${projectId}/member`);
  const { data: labels } = useFetch(`/pm/projects/${projectId}/label`);

  const onOpenCloseConfirmation = useCallback((task) => {
    toggleCloseConfirmation();
    setSelectedTask(task);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchTasks();
    }, [refetchTasks])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ gap: 15, marginTop: 13, paddingHorizontal: 16 }}>
          <PageHeader
            title={data?.data.title}
            width={width - 65}
            withLoading
            isLoading={isLoading}
            onPress={() => navigation.navigate("Project Detail", { projectId: projectId })}
          />

          <View style={{ flexDirection: "row", marginTop: 11, marginBottom: 11 }}>
            <TaskFilter
              members={members?.data}
              labels={labels}
              responsibleId={responsibleId}
              deadlineSort={deadlineSort}
              selectedPriority={selectedPriority}
              selectedLabelId={selectedLabelId}
              setSelectedLabelId={setSelectedLabelId}
              setSearchInput={setSearchInput}
              setResponsibleId={setResponsibleId}
              setDeadlineSort={setDeadlineSort}
              setSelectedPriority={setSelectedPriority}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TaskList
        tasks={tasks?.data}
        isLoading={taskIsLoading}
        openCloseTaskConfirmation={onOpenCloseConfirmation}
        isFetching={taskIsFetching}
        refetch={refetchTasks}
        setSelectedStatus={setSelectedStatus}
        setHideIcon={setHideCreateIcon}
      />

      {!hideCreateIcon ? (
        createCheckAccess ? (
          <Pressable style={styles.hoverButton} onPress={() => navigation.navigate("Task Form", params)}>
            <MaterialCommunityIcons name="plus" size={30} color="white" />
          </Pressable>
        ) : null
      ) : null}

      <ConfirmationModal
        isDelete={false}
        isOpen={closeConfirmationIsOpen}
        toggle={toggleCloseConfirmation}
        apiUrl={"/pm/tasks/close"}
        body={{ id: selectedTask?.id }}
        header="Close Task"
        description={`Are you sure want to close task ${selectedTask?.title}?`}
        hasSuccessFunc
        onSuccess={refetchTasks}
        toggleOtherModal={toggleAlert}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
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

export default ProjectTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  hoverButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: "#176688",
    padding: 15,
    elevation: 0,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
});
