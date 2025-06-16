import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useDisclosure } from "../../../hooks/useDisclosure";
import { useFetch } from "../../../hooks/useFetch";
import TaskList from "../../../components/Band/Task/TaskList/TaskList";
import TaskFilter from "../../../components/Band/shared/TaskFilter/TaskFilter";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import useCheckAccess from "../../../hooks/useCheckAccess";
import { useLoading } from "../../../hooks/useLoading";
import AlertModal from "../../../styles/modals/AlertModal";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import TaskListItem from "../../../components/Band/Task/TaskList/TaskListItem/TaskListItem";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import FloatingButton from "../../../styles/buttons/FloatingButton";
import { Colors } from "../../../styles/Color";

const AdHoc = () => {
  const [fullResponsibleArr, setFullResponsibleArr] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Open");
  const [searchInput, setSearchInput] = useState("");
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const [responsibleId, setResponsibleId] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [deadlineSort, setDeadlineSort] = useState("asc");
  const [selectedTask, setSelectedTask] = useState(null);
  const [hideCreateIcon, setHideCreateIcon] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [tabValue, setTabValue] = useState("On Progress");
  const [number, setNumber] = useState(1);
  const [openTask, setOpenTask] = useState([]);
  const [onProgressTask, setOnProgressTask] = useState([]);
  const [finishTask, setFinishTask] = useState([]);
  const [hasBeenScrolledOpen, setHasBeenScrolledOpen] = useState(false);
  const [hasBeenScrolledOnProgress, setHasBeenScrolledOnProgress] = useState(false);
  const [hasBeenScrolledFinish, setHasBeenScrolledFinish] = useState(false);
  const [previousTabValue, setPreviousTabValue] = useState(0);

  const navigation = useNavigation();
  const firstTimeRef = useRef(true);
  const filterSheetRef = useRef(null);

  const createActionCheck = useCheckAccess("create", "Tasks");

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const { isOpen: closeConfirmationIsOpen, toggle: toggleCloseConfirmation } =
    useDisclosure(false);
  const { isLoading: isInitialized, toggle: toggleInitialize } = useLoading();
  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);

  const fetchTaskParameters = {
    label_id: selectedLabelId,
    search: searchInput,
    responsible_id: responsibleId,
    priority: selectedPriority,
    sort_deadline: deadlineSort,
  };

  const {
    data: tasks,
    isLoading: taskIsLoading,
    isFetching: taskIsFetching,
    refetch: refetchTasks,
  } = useFetch(
    `/pm/tasks`,
    [selectedLabelId, searchInput, responsibleId, selectedPriority, deadlineSort],
    fetchTaskParameters
  );

  const {
    data: onprogress,
    refetch: refetchOnprogress,
    isLoading: onprogressIsLoading,
    isFetching: onprogressIsFetching,
  } = useFetch(
    tabValue === "On Progress" && "/pm/tasks",
    [selectedLabelId, searchInput, responsibleId, selectedPriority, deadlineSort],
    {
      label_id: selectedLabelId,
      search: searchInput,
      responsible_id: responsibleId,
      priority: selectedPriority,
      sort_deadline: deadlineSort,
      status: tabValue,
    }
  );

  const {
    data: open,
    refetch: refetchOpen,
    isLoading: openIsLoading,
    isFetching: openIsFetching,
  } = useFetch(
    tabValue === "Open" && "/pm/tasks",
    [selectedLabelId, searchInput, responsibleId, selectedPriority, deadlineSort],
    {
      label_id: selectedLabelId,
      search: searchInput,
      responsible_id: responsibleId,
      priority: selectedPriority,
      sort_deadline: deadlineSort,
      status: tabValue,
    }
  );

  const {
    data: finish,
    refetch: refetchFinish,
    isLoading: finishIsLoading,
    isFetching: finishIsFetching,
  } = useFetch(
    tabValue === "Finish" && "/pm/tasks",
    [selectedLabelId, searchInput, responsibleId, selectedPriority, deadlineSort],
    {
      label_id: selectedLabelId,
      search: searchInput,
      responsible_id: responsibleId,
      priority: selectedPriority,
      sort_deadline: deadlineSort,
      status: tabValue,
    }
  );

  const { data: labels } = useFetch(`/pm/labels`);

  // Get every task's responsible with no duplicates
  const responsibleArr = tasks?.data?.map((val) => {
    return {
      responsible_name: val.responsible_name,
      responsible_id: val.responsible_id,
    };
  });

  const handleConfirmation = useCallback((task) => {
    toggleCloseConfirmation();
    setSelectedTask(task);
  }, []);

  const tabs = useMemo(() => {
    return [
      { title: `Open`, value: "Open", number: 1 },
      { title: `On Progress`, value: "On Progress", number: 2 },
      { title: `Finish`, value: "Finish", number: 3 },
    ];
  }, []);

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  const handleChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "Open") {
      setFinishTask([]);
      setOnProgressTask([]);
    } else if (tabValue === "On Progress") {
      setFinishTask([]);
      setOpenTask([]);
    } else {
      setOnProgressTask([]);
      setOpenTask([]);
    }
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  const renderContent = () => {
    switch (tabValue) {
      case "Open":
        return (
          <>
            {openTask?.length > 0 ? (
              <FlashList
                data={openTask}
                onEndReachedThreshold={0.1}
                onScrollBeginDrag={() => setHasBeenScrolledOpen(!hasBeenScrolledOpen)}
                keyExtractor={(item, index) => index}
                estimatedItemSize={70}
                refreshing={true}
                refreshControl={
                  <RefreshControl refreshing={openIsFetching} onRefresh={refetchOpen} />
                }
                ListFooterComponent={() =>
                  hasBeenScrolledOpen && openIsFetching && <ActivityIndicator />
                }
                renderItem={({ item, index }) => (
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
                    openCloseTaskConfirmation={handleConfirmation}
                    navigation={navigation}
                  />
                )}
              />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={openIsLoading} onRefresh={refetchOpen} />
                }
              >
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <EmptyPlaceholder text="No Data" />
                </View>
              </ScrollView>
            )}
          </>
        );
      case "Finish":
        return (
          <>
            {finishTask?.length > 0 ? (
              <FlashList
                data={finishTask}
                onEndReachedThreshold={0.1}
                onScrollBeginDrag={() => setHasBeenScrolledFinish(!hasBeenScrolledFinish)}
                keyExtractor={(item, index) => index}
                estimatedItemSize={70}
                refreshing={true}
                refreshControl={
                  <RefreshControl
                    refreshing={finishIsFetching}
                    onRefresh={refetchFinish}
                  />
                }
                ListFooterComponent={() =>
                  hasBeenScrolledFinish && finishIsFetching && <ActivityIndicator />
                }
                renderItem={({ item, index }) => (
                  <TaskListItem
                    id={item?.id}
                    no={item?.task_no}
                    task={item}
                    title={item?.title}
                    image={item?.responsible_image}
                    deadline={item?.deadline}
                    priority={item?.priority}
                    totalAttachments={item?.total_attachment}
                    totalChecklists={item?.total_checklist}
                    totalChecklistsDone={item?.total_checklist_finish}
                    totalComments={item?.total_comment}
                    status={item?.status}
                    responsible={item?.responsible_name}
                    responsibleId={item?.responsible_id}
                    openCloseTaskConfirmation={handleConfirmation}
                    navigation={navigation}
                  />
                )}
              />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={finishIsLoading}
                    onRefresh={refetchFinish}
                  />
                }
              >
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <EmptyPlaceholder text="No Data" />
                </View>
              </ScrollView>
            )}
          </>
        );

      default:
        return (
          <>
            {onProgressTask?.length > 0 ? (
              <FlashList
                data={onProgressTask}
                onEndReachedThreshold={0.1}
                onScrollBeginDrag={() =>
                  setHasBeenScrolledOnProgress(!hasBeenScrolledOnProgress)
                }
                keyExtractor={(item, index) => index}
                estimatedItemSize={70}
                refreshing={true}
                refreshControl={
                  <RefreshControl
                    refreshing={onprogressIsFetching}
                    onRefresh={refetchOnprogress}
                  />
                }
                ListFooterComponent={() =>
                  hasBeenScrolledOnProgress &&
                  onprogressIsFetching && <ActivityIndicator />
                }
                renderItem={({ item, index }) => (
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
                    openCloseTaskConfirmation={handleConfirmation}
                    navigation={navigation}
                  />
                )}
              />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={onprogressIsLoading}
                    onRefresh={refetchOnprogress}
                  />
                }
              >
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <EmptyPlaceholder text="No Data" />
                </View>
              </ScrollView>
            )}
          </>
        );
    }
  };

  // useEffect(() => {
  //   if (onprogress?.data?.length) {
  //     setOnProgressTask((prevData) => [...prevData, ...onprogress?.data]);
  //   }
  // }, [onprogress]);

  // useEffect(() => {
  //   if (open?.data?.length) {
  //     setOpenTask((prevData) => [...prevData, ...open?.data]);
  //   }
  // }, [open]);

  // useEffect(() => {
  //   if (finish?.data?.length) {
  //     setFinishTask((prevData) => [...prevData, ...finish?.data]);
  //   }
  // }, [finish]);

  // useEffect(() => {
  //   if (previousTabValue !== number) {
  //     const direction = previousTabValue < number ? -1 : 1;
  //     translateX.value = withTiming(direction * width, { duration: 300, easing: Easing.out(Easing.cubic) }, () => {
  //       translateX.value = 0;
  //     });
  //   }
  //   setPreviousTabValue(number);
  // }, [number]);

  useEffect(() => {
    // this operation will only be triggered everytime the array of responsible is at peak (maximum length).
    if (!isInitialized && responsibleArr?.length > 0) {
      const noDuplicateResponsibleArr = responsibleArr.reduce((acc, current) => {
        const isDuplicate = acc.some(
          (item) => item.responsible_id === current.responsible_id
        );

        if (!isDuplicate && current.responsible_name !== null) {
          acc.push(current);
        }

        return acc;
      }, []);

      // should only run if the state of initialized is true
      setFullResponsibleArr(noDuplicateResponsibleArr);
      toggleInitialize();
    }
  }, [tasks?.data, isInitialized]);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen
        screenTitle="Ad Hoc"
        childrenHeader={
          <CustomFilter
            toggle={handleOpenSheet}
            filterAppear={selectedLabelId || selectedPriority}
          />
        }
      >
        <View style={styles.searchContainer}>
          <TaskFilter
            members={fullResponsibleArr}
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
            reference={filterSheetRef}
          />
        </View>

        <TaskList
          tasks={tasks?.data}
          isLoading={taskIsLoading}
          openCloseTaskConfirmation={handleConfirmation}
          isFetching={taskIsFetching}
          refetch={refetchTasks}
          setSelectedStatus={setSelectedStatus}
          setHideIcon={setHideCreateIcon}
          // onChangeTab={onChangeTab}
          // onChangeNumber={onChangeNumber}
          // tabValue={tabValue}
          // tabs={tabs}
          // renderContent={renderContent}
          // animatedStyle={animatedStyle}
          navigation={navigation}
        />

        {!hideCreateIcon ? (
          createActionCheck ? (
            <FloatingButton
              icon="plus"
              handlePress={() =>
                navigation.navigate("Task Form", {
                  selectedStatus: selectedStatus,
                  refetch: refetchTasks,
                  taskData: null,
                  toggleSuccess: toggleSuccess,
                  setRequestType: setRequestType,
                  setErrorMessage: setErrorMessage,
                })
              }
            />
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
          toggleOtherModal={toggleSuccess}
          success={success}
          setSuccess={setSuccess}
          setError={setErrorMessage}
          setRequestType={setRequestType}
        />
        <AlertModal
          isOpen={isSuccess}
          toggle={toggleSuccess}
          title={requestType === "post" ? "Task closed!" : "Process error!"}
          description={
            requestType === "post"
              ? "Data successfully saved"
              : errorMessage || "Please try again later"
          }
          type={requestType === "post" ? "info" : "danger"}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default AdHoc;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
