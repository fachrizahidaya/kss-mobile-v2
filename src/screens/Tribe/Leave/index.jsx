import _ from "lodash";

import { Text } from "react-native";

import Button from "../../../styles/forms/Button";
import PersonalLeaveRequest from "../../../components/Tribe/Leave/PersonalLeaveRequest/PersonalLeaveRequest";
import FilterLeave from "../../../components/Tribe/Leave/PersonalLeaveRequest/FilterLeave";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import { useLeave } from "./hooks/useLeave";

const PersonalLeave = () => {
  const {
    hasBeenScrolledPending,
    hasBeenScrolledApproved,
    hasBeenScrolledRejected,
    hasBeenScrolledCanceled,
    pendingList,
    approvedList,
    rejectedList,
    canceledList,
    filterYear,
    filterType,
    errorMessage,
    number,
    setHasBeenScrolledPending,
    setHasBeenScrolledApproved,
    setHasBeenScrolledRejected,
    setHasBeenScrolledCanceled,
    setFilterYear,
    setFilterType,
    navigation,
    approvalLeaveRequestCheckAccess,
    cancelModalIsOpen,
    toggleCancelModal,
    alertIsOpen,
    toggleAlert,
    refetchPendingLeaveRequest,
    cancelLeaveRequestIsLoading,
    pendingLeaveRequestIsFetching,
    pendingLeaveRequestIsLoading,
    refetchCanceledLeaveRequest,
    canceledLeaveRequestIsFetching,
    canceledLeaveRequestIsLoading,
    refetchRejectedLeaveRequest,
    rejectedLeaveRequestIsFetching,
    rejectedLeaveRequestIsLoading,
    refetchApprovedLeaveRequest,
    approvedLeaveRequestIsFetching,
    approvedLeaveRequestIsLoading,
    teamLeaveRequestData,
    refetchPersonalLeaveRequest,
    tabs,
    fetchMorePending,
    fetchMoreApproved,
    fetchMoreRejected,
    fetchMoreCanceled,
    handleOpenSelectedLeave,
    handleChangeNumber,
    handleCloseSelectedLeave,
    handleChangeTab,
    handleCancelRequest,
    tabValue,
    setTabValue,
  } = useLeave();

  return (
    <Screen
      screenTitle="My Leave Request"
      childrenHeader={
        <>
          {/* <FilterLeave
            filterType={filterType}
            filterYear={filterYear}
            setFilterType={setFilterType}
            setFilterYear={setFilterYear}
          /> */}
          {teamLeaveRequestData?.data?.length > 0 && approvalLeaveRequestCheckAccess && (
            <Button onPress={() => navigation.navigate("Team Leave Request")}>
              <Text style={{ color: Colors.fontLight }}>My Team</Text>
            </Button>
          )}
        </>
      }
    >
      {/* Content here */}
      <PersonalLeaveRequest
        openSelectedHandler={handleOpenSelectedLeave}
        pendingList={pendingList}
        approvedList={approvedList}
        rejectedList={rejectedList}
        canceledList={canceledList}
        pendingLeaveRequestIsFetching={pendingLeaveRequestIsFetching}
        approvedLeaveRequestIsFetching={approvedLeaveRequestIsFetching}
        rejectedLeaveRequestIsFetching={rejectedLeaveRequestIsFetching}
        canceledLeaveRequestIsFetching={canceledLeaveRequestIsFetching}
        pendingLeaveRequestIsLoading={pendingLeaveRequestIsLoading}
        approvedLeaveRequestIsLoading={approvedLeaveRequestIsLoading}
        rejectedLeaveRequestIsLoading={rejectedLeaveRequestIsLoading}
        canceledLeaveRequestIsLoading={canceledLeaveRequestIsLoading}
        refetchPendingLeaveRequest={refetchPendingLeaveRequest}
        refetchApprovedLeaveRequest={refetchApprovedLeaveRequest}
        refetchRejectedLeaveRequest={refetchRejectedLeaveRequest}
        refetchCanceledLeaveRequest={refetchCanceledLeaveRequest}
        hasBeenScrolled={hasBeenScrolledRejected}
        setHasBeenScrolled={setHasBeenScrolledRejected}
        hasBeenScrolledPending={hasBeenScrolledPending}
        setHasBeenScrolledPending={setHasBeenScrolledPending}
        hasBeenScrolledApproved={hasBeenScrolledApproved}
        setHasBeenScrolledApproved={setHasBeenScrolledApproved}
        hasBeenScrolledCanceled={hasBeenScrolledCanceled}
        setHasBeenScrolledCanceled={setHasBeenScrolledCanceled}
        fetchMorePending={fetchMorePending}
        fetchMoreApproved={fetchMoreApproved}
        fetchMoreRejected={fetchMoreRejected}
        fetchMoreCanceled={fetchMoreCanceled}
        tabValue={tabValue}
        number={number}
        setTabValue={setTabValue}
        tabs={tabs}
        onChangeTab={handleChangeTab}
        onChangeNumber={handleChangeNumber}
        refetchPersonalLeaveRequest={refetchPersonalLeaveRequest}
        teamLeaveRequestData={teamLeaveRequestData?.data.length}
      />

      <RemoveConfirmationModal
        isOpen={cancelModalIsOpen}
        toggle={handleCloseSelectedLeave}
        description="Are you sure to cancel this request?"
        isLoading={cancelLeaveRequestIsLoading}
        onPress={handleCancelRequest}
      />
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type="danger"
        title="Process error!"
        description={errorMessage || "Please try again later"}
      />
    </Screen>
  );
};

export default PersonalLeave;
