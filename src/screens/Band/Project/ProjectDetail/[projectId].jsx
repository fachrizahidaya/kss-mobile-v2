import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SheetManager } from "react-native-actions-sheet";

import { useFetch } from "../../../../hooks/useFetch";
import Tabs from "../../../../layouts/Tabs";
import ConfirmationModal from "../../../../styles/modals/ConfirmationModal";
import MemberSection from "../../../../components/Band/Project/ProjectDetail/MemberSection";
import StatusSection from "../../../../components/Band/Project/ProjectDetail/StatusSection";
import FileSection from "../../../../components/Band/Project/ProjectDetail/FileSection";
import CommentInput from "../../../../components/Band/shared/CommentInput/CommentInput";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import AddMemberModal from "../../../../components/Band/shared/AddMemberModal/AddMemberModal";
import axiosInstance from "../../../../config/api";
import useCheckAccess from "../../../../hooks/useCheckAccess";
import Description from "../../../../components/Band/Project/ProjectDetail/Description";
import Button from "../../../../styles/forms/Button";
import { TextProps } from "../../../../styles/CustomStylings";
import AlertModal from "../../../../styles/modals/AlertModal";
import Acvtivity from "../../../../components/Band/Project/ProjectDetail/Acvtivity";
import Screen from "../../../../layouts/Screen";
import OptionActions from "../../../../components/Band/Project/ProjectDetail/OptionActions";
import { Colors } from "../../../../styles/Color";

const ProjectDetailScreen = ({ route }) => {
  const [tabValue, setTabValue] = useState("comments");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [number, setNumber] = useState(1);
  const [previousTabValue, setPreviousTabValue] = useState(0);

  const userSelector = useSelector((state) => state.auth);

  const { projectId } = route.params;
  const { width } = Dimensions.get("screen");
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const deleteCheckAccess = useCheckAccess("delete", "Projects");
  const editCheckAccess = useCheckAccess("update", "Projects");

  const { isOpen: removeAlertIsOpen, toggle: toggleRemoveAlert } =
    useDisclosure(false);
  const { isOpen: delegateAlertIsOpen, toggle: toggleDelegateAlert } =
    useDisclosure(false);
  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } =
    useDisclosure(false);
  const { isOpen: userModalIsOpen, toggle: toggleUserModal } =
    useDisclosure(false);
  const { isOpen: confirmationModalIsOpen, toggle: toggleConfirmationModal } =
    useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const tabs = useMemo(() => {
    return [
      { title: "comments", value: "comments", number: 1 },
      { title: "activity", value: "activity", number: 2 },
    ];
  }, []);

  const {
    data: projectData,
    isLoading,
    refetch,
  } = useFetch(`/pm/projects/${projectId}`);
  const { data: activities } = useFetch("/pm/logs/", [], {
    project_id: projectId,
  });
  const { data: members, refetch: refetchMember } = useFetch(
    `/pm/projects/${projectId}/member`
  );

  const isAllowed = projectData?.data?.owner_id === userSelector.id;

  const renderEditProjectOption = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <OptionActions
            toggleUserModal={toggleUserModal}
            toggleDeleteModal={toggleDeleteModal}
            editCheckAccess={editCheckAccess}
            projectData={projectData}
            refetch={refetch}
            deleteCheckAccess={deleteCheckAccess}
            navigation={navigation}
            setRequestType={setRequestType}
            setErrorMessage={setErrorMessage}
          />
        ),
      },
    });

  const renderContent = () => {
    switch (tabValue) {
      case "activity":
        return <Acvtivity data={activities?.data} navigation={navigation} />;

      default:
        return <CommentInput projectId={projectId} data={projectData?.data} />;
    }
  };

  const handleDeleteProjectSuccess = () => {
    setTimeout(() => navigation.navigate("Projects"), 1000);
  };

  const onDelegateSuccess = async () => {
    try {
      await axiosInstance.post("/pm/projects/member", {
        project_id: projectId,
        user_id: selectedUserId,
      });
      refetch();
      refetchMember();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };

  /**
   * Handles project status change
   * @param {*} status - selected status
   */
  const changeProjectStatusHandler = async (status) => {
    try {
      await axiosInstance.post(`/pm/projects/${status.toLowerCase()}`, {
        id: projectId,
      });
      refetch();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };

  const onChangeNumber = (value) => {
    setNumber(value);
  };

  const onChangeTab = useCallback((value) => {
    setTabValue(value);
  }, []);

  const onPressUserToDelegate = (userId) => {
    toggleUserModal();
    setSelectedUserId(userId);
  };

  const closeUserModal = () => {
    toggleUserModal();
    setSelectedUserId(null);
  };

  useEffect(() => {
    return () => {
      setTabValue("comments");
    };
  }, [projectId]);

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(
        direction * width,
        { duration: 300, easing: Easing.out(Easing.cubic) },
        () => {
          translateX.value = 0;
        }
      );
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <Screen
      screenTitle={projectData?.data?.title}
      returnButton={true}
      isLoading={isLoading}
      withLoading={true}
      onPress={() => navigation.navigate("Projects")}
      childrenHeader={
        isAllowed ? (
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color={Colors.iconDark}
            onPress={renderEditProjectOption}
          />
        ) : null
      }
      backgroundColor={Colors.secondary}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <View style={{ gap: 15, marginVertical: 13 }}>
          <View style={{ flexDirection: "row", gap: 8, marginHorizontal: 16 }}>
            <StatusSection
              projectData={projectData?.data}
              onChange={changeProjectStatusHandler}
            />

            <Button
              variant="outline"
              onPress={() =>
                navigation.navigate("Project Task", {
                  projectId: projectId,
                  view: "Task List",
                })
              }
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={20}
                  color={Colors.iconDark}
                />
                <Text style={TextProps}>Task List</Text>
              </View>
            </Button>
          </View>

          <Description description={projectData?.data?.description} />

          <FileSection projectId={projectId} isAllowed={isAllowed} />

          <MemberSection
            projectId={projectId}
            projectData={projectData?.data}
            members={members}
            refetchMember={refetchMember}
            isAllowed={isAllowed}
          />
          <View style={styles.tabContainer}>
            <Tabs
              tabs={tabs}
              value={tabValue}
              onChange={onChangeTab}
              onChangeNumber={onChangeNumber}
            />
            <Animated.View style={[styles.animatedContainer, animatedStyle]}>
              {renderContent()}
            </Animated.View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* Add member modal */}
      <AddMemberModal
        header="New Project Owner"
        isOpen={userModalIsOpen}
        onClose={closeUserModal}
        multiSelect={false}
        onPressHandler={onPressUserToDelegate}
        toggleOtherModal={toggleConfirmationModal}
      />

      {/* Delegate project confirmation modal */}
      <ConfirmationModal
        isDelete={false}
        isOpen={confirmationModalIsOpen}
        toggle={toggleConfirmationModal}
        apiUrl={"/pm/projects/delegate"}
        body={{ id: projectId, user_id: selectedUserId }}
        header="Change Project Ownership"
        description="Are you sure want to change ownership of this project?"
        hasSuccessFunc={true}
        onSuccess={onDelegateSuccess}
        toggleOtherModal={toggleDelegateAlert}
        setRequestType={setRequestType}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
      />

      {/* Delete confirmation modal */}
      <ConfirmationModal
        isOpen={deleteModalIsOpen}
        toggle={toggleDeleteModal}
        apiUrl={`/pm/projects/${projectId}`}
        color="red.600"
        hasSuccessFunc={true}
        onSuccess={handleDeleteProjectSuccess}
        header="Delete Project"
        description="Are you sure want to delete this project?"
        otherModal={true}
        toggleOtherModal={toggleRemoveAlert}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
      />

      <AlertModal
        isOpen={removeAlertIsOpen}
        toggle={toggleRemoveAlert}
        title={requestType === "remove" ? "Project deleted!" : "Process error!"}
        description={
          requestType === "remove"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={requestType === "remove" ? "success" : "danger"}
      />

      <AlertModal
        isOpen={delegateAlertIsOpen}
        toggle={toggleDelegateAlert}
        title={requestType === "post" ? "Delegate moved!" : "Process error!"}
        description={
          requestType === "post"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={requestType === "post" ? "info" : "danger"}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title="Process error!"
        description={errorMessage || "Please try again later"}
        type="danger"
      />
    </Screen>
  );
};

export default ProjectDetailScreen;

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10,
  },
});
