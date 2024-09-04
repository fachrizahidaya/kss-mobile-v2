import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../../hooks/useFetch";
import Tabs from "../../../../styles/Tabs";
import PerformanceList from "../../../../components/Tribe/Performance/Result/PerformanceList";
import CardSkeleton from "../../../../components/Coin/shared/CardSkeleton";
import Screen from "../../../../styles/Screen";

const PerformanceListScreen = () => {
  const [personalList, setPersonalList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [currentPagePersonal, setCurrentPagePersonal] = useState(1);
  const [currentPageMyTeam, setCurrentPageMyTeam] = useState(1);
  const [reloadPersonal, setReloadPersonal] = useState(false);
  const [reloadMyTeam, setReloadMyTeam] = useState(false);
  const [personalHasBeenScrolled, setPersonalHasBeenScrolled] = useState(false);
  const [myTeamHasBeenScrolled, setMyTeamHasBeenScrolled] = useState(false);

  const navigation = useNavigation();

  // const fetchPersonalParameters = {
  //   page: currentPagePersonal,
  //   limit: 10,
  // };

  // const fetchMyTeamParameters = {
  //   page: currentPageMyTeam,
  //   limit: 10,
  // };

  const {
    data: personalCommentList,
    refetch: refetchPersonalCommentList,
    isFetching: personalCommentListIsFetching,
    isLoading: personalCommentListIsLoading,
  } = useFetch(
    "/hr/performance-result/personal"
    // [currentPagePersonal, reloadPersonal],
    // fetchPersonalParameters
  );

  const {
    data: teamCommentList,
    refetch: refetchTeamCommentList,
    isFetching: teamCommentListIsFetching,
    isLoading: teamCommentListIsLoading,
  } = useFetch(
    "/hr/performance-result/my-team"
    // [currentPageMyTeam, reloadMyTeam],
    // fetchMyTeamParameters
  );

  var tabs = useMemo(() => {
    if (teamCommentList?.data?.length > 0) {
      return [
        {
          title: `Personal`,
          value: "Personal",
        },
        {
          title: `My Team`,
          value: "My Team",
        },
      ];
    } else {
      return [
        {
          title: `Personal`,
          value: "Personal",
        },
      ];
    }
  }, [teamCommentList, personalCommentList]);

  const [tabValue, setTabValue] = useState(teamCommentList?.data?.length > 0 ? "My Team" : "Personal");

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "My Team") {
      setPersonalList([]);
    } else {
      setTeamList([]);
    }
  };

  // const fetchMorePersonal = () => {
  //   if (currentPagePersonal < personalCommentList?.data?.last_page) {
  //     setCurrentPagePersonal(currentPagePersonal + 1);
  //     setReloadPersonal(!reloadPersonal);
  //   }
  // };

  // const fetchMoreMyTeam = () => {
  //   if (currentPageMyTeam < teamCommentList?.data?.last_page) {
  //     setCurrentPageMyTeam(currentPageMyTeam + 1);
  //     setReloadMyTeam(!reloadMyTeam);
  //   }
  // };

  useEffect(() => {
    if (personalCommentList?.data.length) {
      setPersonalList((prevData) => [...prevData, ...personalCommentList?.data]);
    }
  }, [personalCommentList?.data.length, tabValue]);

  useEffect(() => {
    if (teamCommentList?.data.length) {
      setTeamList((prevData) => [...prevData, ...teamCommentList?.data]);
    }
  }, [teamCommentList?.data.length, tabValue]);

  return (
    <Screen screenTitle="Performance Result" returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      <View style={{ flex: 1 }}>
        {tabValue === "My Team" ? (
          <PerformanceList
            data={teamList}
            isFetching={teamCommentListIsFetching}
            isLoading={teamCommentListIsLoading}
            refetch={refetchTeamCommentList}
            navigation={navigation}
            dayjs={dayjs}
          />
        ) : (
          <PerformanceList
            data={personalList}
            isFetching={personalCommentListIsFetching}
            isLoading={personalCommentListIsLoading}
            refetch={refetchPersonalCommentList}
            navigation={navigation}
            dayjs={dayjs}
          />
        )}
      </View>
    </Screen>
  );
};

export default PerformanceListScreen;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
