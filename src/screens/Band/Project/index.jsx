import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  Text,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import ProjectListItem from "../../../components/Band/Project/ProjectList/ProjectListItem";
import { useFetch } from "../../../hooks/useFetch";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import ProjectSkeleton from "../../../components/Band/Project/ProjectList/ProjectSkeleton";
import useCheckAccess from "../../../hooks/useCheckAccess";
import ProjectFilter from "../../../components/Band/Project/ProjectFilter/ProjectFilter";
import Tabs from "../../../layouts/Tabs";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import FloatingButton from "../../../styles/buttons/FloatingButton";
import { Colors } from "../../../styles/Color";
import AlertModal from "../../../styles/modals/AlertModal";
import { useDisclosure } from "../../../hooks/useDisclosure";

const ProjectList = () => {
  const [ownerName, setOwnerName] = useState("");
  const [status, setStatus] = useState("On Progress");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [deadlineSort, setDeadlineSort] = useState("asc");
  const [previousTabValue, setPreviousTabValue] = useState(0);
  const [number, setNumber] = useState(1);
  const [tabValue, setTabValue] = useState("Finish");
  const [openProject, setOpenProject] = useState([]);
  const [finishProject, setFinishProject] = useState([]);
  const [currentPageOpen, setCurrentPageOpen] = useState(1);
  const [currentPageFinish, setCurrentPageFinish] = useState(1);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [hasBeenScrolledFinish, setHasBeenScrolledFinish] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [hideCreateIcon, setHideCreateIcon] = useState(false);

  const navigation = useNavigation();
  const firstTimeRef = useRef(true);
  const filterSheetRef = useRef(null);

  const createActionCheck = useCheckAccess("create", "Projects");

  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);

  const dependencies = [
    status,
    currentPage,
    searchInput,
    selectedPriority,
    deadlineSort,
    ownerName,
  ];

  const params = {
    page: currentPage,
    search: searchInput,
    status: status !== "Archived" ? status : "",
    archive: status !== "Archived" ? 0 : 1,
    limit: 500,
    priority: selectedPriority,
    sort_deadline: deadlineSort,
    owner_name: ownerName,
  };
  const { data, isLoading, isFetching, refetch } = useFetch(
    "/pm/projects",
    dependencies,
    params
  );

  const {
    data: open,
    refetch: refetchOpen,
    isLoading: openIsLoading,
  } = useFetch(
    "/pm/projects",
    [status, currentPage, searchInput, selectedPriority, deadlineSort, ownerName],
    {
      page: currentPageOpen,
      search: searchInput,
      status: tabValue,
      archive: tabValue !== "Archived" ? 0 : 1,
      limit: 10,
      priority: selectedPriority,
      sort_deadline: deadlineSort,
      owner_name: ownerName,
    }
  );

  const {
    data: finish,
    refetch: refetchFinish,
    isLoading: finishIsLoading,
  } = useFetch(
    "/pm/projects",
    [status, currentPage, searchInput, selectedPriority, deadlineSort, ownerName],
    {
      page: currentPageFinish,
      search: searchInput,
      status: tabValue,
      archive: tabValue !== "Archived" ? 0 : 1,
      limit: 10,
      priority: selectedPriority,
      sort_deadline: deadlineSort,
      owner_name: ownerName,
    }
  );

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const fetchMoreOpen = () => {
    if (currentPageOpen < openProject?.data?.last_page) {
      setCurrentPageOpen(currentPageOpen + 1);
    }
  };

  const fetchMoreFinish = () => {
    if (currentPageFinish < finishProject?.data?.last_page) {
      setCurrentPageFinish(currentPageFinish + 1);
    }
  };

  const tabs = useMemo(() => {
    return [
      { title: `Open`, value: "Open", number: 1 },
      { title: `On Progress`, value: "On Progress", number: 2 },
      { title: `Finish`, value: "Finish", number: 3 },
      { title: `Archived`, value: "Archived", number: 4 },
    ];
  }, []);

  const onChangeNumber = (value) => {
    setNumber(value);
  };

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "Open") {
    } else if (tabValue === "On Progress") {
      setFinishProject([]);
      setCurrentPageOpen(1);
    } else if (tabValue === "Finish") {
      setOpenProject([]);
      setCurrentPageFinish(1);
    } else {
    }
  };

  const renderContent = () => {
    switch (tabValue) {
      case "Open":
        return null;
      case "Finish":
        return (
          <>
            {finishProject?.length > 0 ? (
              <FlashList
                data={finishProject}
                onEndReachedThreshold={0.1}
                onScrollBeginDrag={() => setHasBeenScrolledFinish(!hasBeenScrolledFinish)}
                onEndReached={hasBeenScrolledFinish === true ? fetchMoreFinish : null}
                keyExtractor={(item, index) => index}
                estimatedItemSize={70}
                refreshing={true}
                refreshControl={
                  <RefreshControl
                    refreshing={finishIsLoading}
                    onRefresh={refetchFinish}
                  />
                }
                ListFooterComponent={() =>
                  hasBeenScrolledFinish && finishIsLoading && <ActivityIndicator />
                }
                renderItem={({ item, index }) => (
                  <View>
                    <Text>{item?.title}</Text>
                  </View>
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
      case "Archived":
        return null;
      default:
        return (
          <>
            {openProject?.length > 0 ? (
              <FlashList
                data={openProject}
                onEndReachedThreshold={0.1}
                onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
                onEndReached={hasBeenScrolled === true ? fetchMoreOpen : null}
                keyExtractor={(item, index) => index}
                estimatedItemSize={70}
                refreshing={true}
                refreshControl={
                  <RefreshControl refreshing={openIsLoading} onRefresh={refetchOpen} />
                }
                ListFooterComponent={() =>
                  hasBeenScrolled && openIsLoading && <ActivityIndicator />
                }
                renderItem={({ item, index }) => (
                  <View>
                    <Text>{item?.title}</Text>
                  </View>
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
    }
  };

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 2; i++) {
      skeletons.push(<ProjectSkeleton key={i} />);
    }
    return skeletons;
  };

  const renderFlashList = () => {
    return data?.data?.data?.length > 0 ? (
      <>
        <View style={{ flex: 1, backgroundColor: Colors.backgroundLight }}>
          <FlashList
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            data={data?.data.data}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            estimatedItemSize={77}
            renderItem={({ item, index }) => (
              <ProjectListItem
                id={item.id}
                title={item.title}
                status={item.status}
                deadline={item.deadline}
                isArchive={item.archive}
                image={item.owner_image}
                ownerName={item.owner?.name}
                ownerEmail={item.owner?.email}
                index={index}
                length={data?.data?.data?.length}
                navigation={navigation}
              />
            )}
          />
        </View>
      </>
    ) : (
      <EmptyPlaceholder text="No project" />
    );
    // !isLoading ?
    // )
    // :
    // (
    //   <View style={{ paddingHorizontal: 2, gap: 2 }}>{renderSkeletons()}</View>
  };

  const renderScene = SceneMap({
    open: renderFlashList,
    onProgress: renderFlashList,
    finish: renderFlashList,
    archive: renderFlashList,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "open", title: "Open" },
    { key: "onProgress", title: "On Progress" },
    { key: "finish", title: "Finish" },
    { key: "archive", title: "Archived" },
  ]);

  const renderTabBar = (props) => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.secondary,
        padding: Platform.OS === "ios" ? 8 : 10,
      }}
    >
      {props.navigationState.routes.map((route, i) => (
        <Pressable
          key={i}
          style={{
            flex: 1,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            marginBottom: 8,
            // borderBottomWidth: 2,
            // borderBottomColor: index === i ? "#176688" : "#E8E9EB",
            backgroundColor: index === i ? Colors.primary : null,
          }}
          onPress={() => {
            setIndex(i);
            setStatus(route.title);
          }}
        >
          <Text style={{ color: index === i ? Colors.fontLight : Colors.fontDark }}>
            {route.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const handleChange = (index) => {
    setIndex(index);
    switch (index) {
      case 0:
        setStatus("Open");
        break;
      case 1:
        setStatus("On Progress");
        break;
      case 2:
        setStatus("Finish");
        break;
      case 3:
        setStatus("Archived");
        break;
      default:
        setStatus("Open");
    }
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  // useEffect(() => {
  //   if (open?.data?.data?.length) {
  //     setOpenProject((prevData) => [...prevData, ...open?.data?.data]);
  //   }
  // }, [open?.data?.data?.length]);

  // useEffect(() => {
  //   if (finish?.data?.data?.length) {
  //     setFinishProject((prevData) => [...prevData, ...finish?.data?.data]);
  //   }
  // }, [finish?.data?.data?.length]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [status, searchInput, selectedPriority, deadlineSort, ownerName]);

  // useEffect(() => {
  //   if (previousTabValue !== number) {
  //     const direction = previousTabValue < number ? -1 : 1;
  //     translateX.value = withTiming(direction * width, { duration: 300, easing: Easing.out(Easing.cubic) }, () => {
  //       translateX.value = 0;
  //     });
  //   }
  //   setPreviousTabValue(number);
  // }, [number]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );

  return (
    <Screen
      screenTitle="My Project"
      childrenHeader={
        <CustomFilter toggle={handleOpenSheet} filterAppear={selectedPriority} />
      }
    >
      <View style={styles.searchContainer}>
        <ProjectFilter
          setSearchInput={setSearchInput}
          setDeadlineSort={setDeadlineSort}
          setSelectedPriority={setSelectedPriority}
          setOwnerName={setOwnerName}
          ownerName={ownerName}
          deadlineSort={deadlineSort}
          selectedPriority={selectedPriority}
          reference={filterSheetRef}
        />
      </View>
      <View style={{ flex: 1 }}>
        {/* <View style={{ paddingHorizontal: 16 }}>
            <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} onChangeNumber={onChangeNumber} />
          </View> */}

        {/* <View style={{ flex: 1 }}>
            <Animated.View style={[styles.animatedContainer, animatedStyle]}>{renderContent()}</Animated.View>
          </View> */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={handleChange}
          initialLayout={{ height: 0, width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>

      {createActionCheck ? (
        <FloatingButton
          icon="plus"
          handlePress={() =>
            navigation.navigate("Project Form", {
              projectData: null,
              toggleSuccess: toggleSuccess,
              setRequestType: setRequestType,
              setErrorMessage: setErrorMessage,
            })
          }
        />
      ) : null}
      <AlertModal
        isOpen={isSuccess}
        toggle={toggleSuccess}
        title={
          requestType === "post"
            ? "Project created!"
            : requestType === "patch"
            ? "Changes saved!"
            : "Process error!"
        }
        description={
          requestType === "post"
            ? "Thank you for initiating this project"
            : requestType === "patch"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={
          requestType === "post" ? "info" : requestType === "patch" ? "success" : "danger"
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});

export default ProjectList;
