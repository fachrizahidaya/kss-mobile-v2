import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { SafeAreaView, StyleSheet, View } from "react-native";

import PageHeader from "../../../../styles/PageHeader";
import { useFetch } from "../../../../hooks/useFetch";
import Tabs from "../../../../styles/Tabs";
import AppraisalReviewList from "../../../../components/Tribe/Performance/Review/AppraisalReviewList";
import CommentList from "../../../../components/Tribe/Performance/Review/CommentList";
import KPIReviewList from "../../../../components/Tribe/Performance/Review/KPIReviewList";

const KPIAppraisalReview = () => {
  const [tabValue, setTabValue] = useState("KPI");
  const [kpiList, setKpiList] = useState([]);
  const [appraisalList, setAppraisalList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [currentPageKPI, setCurrentPageKPI] = useState(1);
  const [currentPageAppraisal, setCurrentPageAppraisal] = useState(1);
  const [currentPageComment, setCurrentPageComment] = useState(1);
  const [reloadKpi, setReloadKpi] = useState(false);
  const [reloadAppraisal, setReloadAppraisal] = useState(false);
  const [reloadComment, setReloadComment] = useState(false);
  const [kpiHasBeenScrolled, setKpiHasBeenScrolled] = useState(false);
  const [appraisalHasBeenScrolled, setAppraisalHasBeenScrolled] = useState(false);
  const [commentHasBeenScrolled, setCommentHasBeenScrolled] = useState(false);

  const navigation = useNavigation();

  const fetchKpiParameters = {
    page: currentPageKPI,
    limit: 10,
  };

  const fetchAppraisalParameters = {
    page: currentPageAppraisal,
    limit: 10,
  };

  const fetchCommentParameters = {
    page: currentPageComment,
    limit: 10,
  };

  const {
    data: kpi,
    refetch: refetchKpi,
    isFetching: kpiIsFetching,
    isLoading: kpiIsLoading,
  } = useFetch(
    tabValue == "KPI" && "/hr/employee-review/kpi",
    [currentPageKPI, reloadKpi, tabValue],
    fetchKpiParameters
  );

  const {
    data: appraisal,
    refetch: refetchAppraisal,
    isFetching: appraisalIsFetching,
    isLoading: appraisalIsLoading,
  } = useFetch(
    tabValue == "Appraisal" && "/hr/employee-review/appraisal",
    [tabValue, currentPageAppraisal, reloadAppraisal],
    fetchAppraisalParameters
  );

  const {
    data: comment,
    refetch: refetchComment,
    isFetching: commentIsFetching,
    isLoading: commentIsLoading,
  } = useFetch(
    tabValue == "Comment" && "/hr/employee-review/comment",
    [tabValue, currentPageComment, reloadComment],
    fetchCommentParameters
  );

  const { data: kpiData } = useFetch("/hr/employee-review/kpi");
  const { data: appraisalData } = useFetch("/hr/employee-review/appraisal");
  const { data: commentData } = useFetch("/hr/employee-review/comment");

  const tabs = useMemo(() => {
    return [
      { title: `KPI`, value: "KPI" },
      {
        title: `Appraisal`,
        value: "Appraisal",
      },
      {
        title: `Comment`,
        value: "Comment",
      },
    ];
  }, [kpi, appraisal, comment, kpiData, appraisalData, commentData]);

  /**
   * Handle fetch more kpi, appraisal, comment
   */
  const fetchMoreKpi = () => {
    if (currentPageKPI < kpi?.data?.last_page) {
      setCurrentPageKPI(currentPageKPI + 1);
      setReloadKpi(!reloadKpi);
    }
  };
  const fetchMoreAppraisal = () => {
    if (currentPageAppraisal < appraisal?.data?.last_page) {
      setCurrentPageAppraisal(currentPageAppraisal + 1);
      setReloadAppraisal(!reloadAppraisal);
    }
  };
  const fetchMoreComment = () => {
    if (currentPageComment < comment?.data?.last_page) {
      setCurrentPageComment(currentPageComment + 1);
      setReloadComment(!reloadComment);
    }
  };

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "KPI") {
      setAppraisalList([]);
      setCommentList([]);
      setCurrentPageKPI(1);
    } else if (tabValue === "Appraisal") {
      setKpiList([]);
      setCommentList([]);
      setCurrentPageAppraisal(1);
    } else {
      setAppraisalList([]);
      setCommentList([]);
      setCurrentPageComment(1);
    }
  };

  useEffect(() => {
    if (kpi?.data?.data.length) {
      setKpiList((prevData) => [...prevData, ...kpi?.data?.data]);
    }
  }, [kpi?.data?.data.length, tabValue]);

  useEffect(() => {
    if (appraisal?.data?.data.length) {
      setAppraisalList((prevData) => [...prevData, ...appraisal?.data?.data]);
    }
  }, [appraisal?.data?.data.length, tabValue]);

  useEffect(() => {
    if (comment?.data?.data.length) {
      setCommentList((prevData) => [...prevData, ...comment?.data?.data]);
    }
  }, [comment?.data?.data.length, tabValue]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Employee Review" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      {tabValue == "KPI" ? (
        <KPIReviewList
          data={kpiList}
          hasBeenScrolled={kpiHasBeenScrolled}
          setHasBeenScrolled={setKpiHasBeenScrolled}
          fetchMore={fetchMoreKpi}
          isFetching={kpiIsFetching}
          isLoading={kpiIsLoading}
          refetch={refetchKpi}
          navigation={navigation}
          dayjs={dayjs}
        />
      ) : tabValue === "Appraisal" ? (
        <AppraisalReviewList
          data={appraisalList}
          hasBeenScrolled={appraisalHasBeenScrolled}
          setHasBeenScrolled={setAppraisalHasBeenScrolled}
          fetchMore={fetchMoreAppraisal}
          isFetching={appraisalIsFetching}
          isLoading={appraisalIsLoading}
          refetch={refetchAppraisal}
          navigation={navigation}
          dayjs={dayjs}
        />
      ) : (
        <CommentList
          data={commentList}
          hasBeenScrolled={commentHasBeenScrolled}
          setHasBeenScrolled={setCommentHasBeenScrolled}
          fetchMore={fetchMoreComment}
          isFetching={commentIsFetching}
          isLoading={commentIsLoading}
          refetch={refetchComment}
          navigation={navigation}
          dayjs={dayjs}
        />
      )}
    </SafeAreaView>
  );
};

export default KPIAppraisalReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
