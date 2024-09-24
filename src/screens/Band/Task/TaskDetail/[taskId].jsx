import { memo, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import RenderHtml from "react-native-render-html";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions, Platform, Text, View } from "react-native";

import { useFetch } from "../../../../hooks/useFetch";
import ChecklistSection from "../../../../components/Band/Task/TaskDetail/ChecklistSection/ChecklistSection";
import CostSection from "../../../../components/Band/Task/TaskDetail/CostSection/CostSection";
import LabelSection from "../../../../components/Band/Task/TaskDetail/LabelSection/LabelSection";
import PeopleSection from "../../../../components/Band/Task/TaskDetail/PeopleSection/PeopleSection";
import DeadlineSection from "../../../../components/Band/Task/TaskDetail/DeadlineSection/DeadlineSection";
import ControlSection from "../../../../components/Band/Task/TaskDetail/ControlSection/ControlSection";
import AttachmentSection from "../../../../components/Band/Task/TaskDetail/AttachmentSection/AttachmentSection";
import CommentInput from "../../../../components/Band/shared/CommentInput/CommentInput";
import MenuSection from "../../../../components/Band/Task/TaskDetail/MenuSection/MenuSection";
import { hyperlinkConverter } from "../../../../helpers/hyperlinkConverter";
import axiosInstance from "../../../../config/api";
import { useLoading } from "../../../../hooks/useLoading";
import { TextProps } from "../../../../styles/CustomStylings";
import useCheckAccess from "../../../../hooks/useCheckAccess";
import AlertModal from "../../../../styles/modals/AlertModal";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import Screen from "../../../../layouts/Screen";

const TaskDetailScreen = ({ route }) => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { width } = Dimensions.get("screen");
  const navigation = useNavigation();
  const { taskId } = route.params;

  const userSelector = useSelector((state) => state.auth);
  const loggedUser = userSelector.id;

  const editTaskAccess = useCheckAccess("update", "Tasks");

  const { data: selectedTask, refetch: refetchSelectedTask } = useFetch(taskId && `/pm/tasks/${taskId}`);
  const { data: observers, refetch: refetchObservers } = useFetch(taskId && `/pm/tasks/${taskId}/observer`);
  const { data: responsible, refetch: refetchResponsible } = useFetch(taskId && `/pm/tasks/${taskId}/responsible`);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isLoading: statusIsLoading, toggle: toggleLoading } = useLoading(false);

  const taskUserRights = [selectedTask?.data?.project_owner_id, selectedTask?.data?.responsible_id];
  const inputIsDisabled = !taskUserRights.includes(loggedUser);

  const onOpenTaskForm = () => {
    navigation.navigate("Task Form", { taskData: selectedTask?.data, refetch: refetchSelectedTask });
  };

  /**
   * Handles take task as responsible
   */
  const takeTask = async () => {
    try {
      if (!selectedTask.data.responsible_id) {
        await axiosInstance.post("/pm/tasks/responsible", {
          task_id: selectedTask.data.id,
          user_id: loggedUser,
        });
      } else {
        // Update the responsible user if it already exists
        await axiosInstance.patch(`/pm/tasks/responsible/${responsible.data[0].id}`, {
          user_id: loggedUser,
        });
      }
      refetchResponsible();
      refetchSelectedTask();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };

  /**
   * Handles change task status
   */
  const changeTaskStatus = async (status) => {
    try {
      toggleLoading();
      await axiosInstance.post(`/pm/tasks/${status}`, {
        id: selectedTask.data.id,
      });

      toggleLoading();
      refetchSelectedTask();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      toggleLoading();
    }
  };

  const baseStyles = useMemo(
    () => ({
      color: "#3F434A",
    }),
    []
  );

  const { routes } = navigation.getState();

  const handleReturn = () => {
    const previousScreenIndex = routes.length - 2;
    const screenToRedirect = routes.length - 3;
    if (routes[previousScreenIndex].name === "Task Form") {
      // If previous screen is task form, redirect to the screen before task form
      navigation.navigate(`${routes[screenToRedirect].name}`, {
        projectId: routes[screenToRedirect].params?.projectId,
      });
    } else {
      // If previous screen is not task form, go back to previous screen
      navigation.goBack();
    }
  };

  return (
    <Screen
      screenTitle={selectedTask?.data?.title}
      returnButton={true}
      onPress={handleReturn}
      childrenHeader={
        !inputIsDisabled ? (
          <MenuSection
            selectedTask={selectedTask?.data}
            onTakeTask={takeTask}
            openEditForm={onOpenTaskForm}
            disabled={inputIsDisabled}
          />
        ) : null
      }
      backgroundColor="#FFFFFF"
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <View style={{ gap: 20, marginVertical: 14 }}>
          <View style={{ marginHorizontal: 16 }}>
            <ControlSection
              taskStatus={selectedTask?.data?.status}
              selectedTask={selectedTask?.data}
              onChangeStatus={changeTaskStatus}
              isLoading={statusIsLoading}
            />
          </View>

          {/* Reponsible, Creator and Observer section */}
          <PeopleSection
            observers={observers?.data}
            responsibleArr={responsible?.data}
            ownerId={selectedTask?.data?.owner_id}
            ownerImage={selectedTask?.data?.owner_image}
            ownerName={selectedTask?.data?.owner_name}
            ownerEmail={selectedTask?.data?.owner_email}
            refetchObservers={refetchObservers}
            refetchTask={refetchSelectedTask}
            disabled={inputIsDisabled}
            selectedTask={selectedTask?.data}
            refetchResponsible={refetchResponsible}
          />

          {/* Labels */}
          <LabelSection projectId={selectedTask?.data?.project_id} taskId={taskId} disabled={inputIsDisabled} />

          {/* Due date and cost */}
          <View style={{ justifyContent: "space-between", gap: 20, marginHorizontal: 16 }}>
            <DeadlineSection
              deadline={selectedTask?.data?.deadline}
              projectDeadline={selectedTask?.data?.project_deadline}
              disabled={inputIsDisabled || !editTaskAccess}
              taskId={taskId}
            />

            <CostSection taskId={taskId} disabled={inputIsDisabled} />
          </View>

          {/* Description */}
          <View style={{ gap: 10, marginHorizontal: 16 }}>
            <Text style={[{ fontWeight: "500" }, TextProps]}>DESCRIPTION</Text>

            <RenderHtml
              contentWidth={width}
              baseStyle={baseStyles}
              source={{ html: hyperlinkConverter(selectedTask?.data?.description) || "" }}
            />
          </View>
          {/* Checklists */}
          <ChecklistSection taskId={taskId} disabled={inputIsDisabled} />

          {/* Attachments */}
          <AttachmentSection taskId={taskId} disabled={inputIsDisabled} />

          {/* Comments */}
          <View style={{ gap: 10, marginHorizontal: 16 }}>
            <Text style={[{ fontWeight: "500" }, TextProps]}>COMMENTS</Text>
            <CommentInput taskId={taskId} data={selectedTask?.data} />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "post" ? "Task assigned" : "Process error!"}
        description={requestType === "post" ? "Data successfully saved" : errorMessage || "Please try again later"}
        type={requestType === "post" ? "info" : "danger"}
      />
    </Screen>
  );
};

export default memo(TaskDetailScreen);
