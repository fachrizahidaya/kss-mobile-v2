import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import _ from "lodash";

import { Text } from "react-native";

import Button from "../../../styles/forms/Button";
import PayslipPasswordEdit from "../../../components/Tribe/Payslip/PayslipPasswordEdit";
import PayslipDownload from "../../../components/Tribe/Payslip/PayslipDownload";
import PayslipList from "../../../components/Tribe/Payslip/PayslipList";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import { usePayslip } from "./hooks/usePayslip";

const Payslip = () => {
  const {
    hideNewPassword,
    setHideNewPassword,
    hideOldPassword,
    setHideOldPassword,
    hideConfirmPassword,
    setHideConfirmPassword,
    hasBeenScrolled,
    setHasBeenScrolled,
    payslips,
    requestType,
    errorMessage,
    setPayslips,
    payslipDownloadScreenSheetRef,
    payslipPasswordEditScreenSheetRef,
    firstTimeRef,
    downloadPayslipCheckAccess,
    alertIsOpen,
    toggleAlert,
    payslip,
    refetchPayslip,
    payslipIsFetching,
    payslipIsLoading,
    fetchMorePayslip,
    openSelectedPayslip,
    closeSelectedPayslip,
    handleUpdatePayslipPassword,
    handleDownloadPayslip,
  } = usePayslip();

  useEffect(() => {
    if (payslip?.data?.data.length) {
      setPayslips((prevData) => [...prevData, ...payslip?.data?.data]);
    }
  }, [payslip?.data]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchPayslip();
    }, [refetchPayslip])
  );

  return (
    <Screen
      screenTitle="My Payslip"
      childrenHeader={
        <Button onPress={() => payslipPasswordEditScreenSheetRef.current?.show()}>
          <Text style={{ color: Colors.fontLight }}>Change PIN</Text>
        </Button>
      }
    >
      <PayslipPasswordEdit
        reference={payslipPasswordEditScreenSheetRef}
        hideNewPassword={hideNewPassword}
        setHideNewPassword={setHideNewPassword}
        hideOldPassword={hideOldPassword}
        setHideOldPassword={setHideOldPassword}
        hideConfirmPassword={hideConfirmPassword}
        setHideConfirmPassword={setHideConfirmPassword}
        handleUpdatePassword={handleUpdatePayslipPassword}
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        requestType={requestType}
        refetch={refetchPayslip}
      />

      <PayslipList
        data={payslips}
        openSelectedPayslip={openSelectedPayslip}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        fetchMore={fetchMorePayslip}
        isFetching={payslipIsFetching}
        isLoading={payslipIsLoading}
        refetch={refetchPayslip}
        downloadAccess={downloadPayslipCheckAccess}
      />
      <PayslipDownload
        reference={payslipDownloadScreenSheetRef}
        toggleDownloadDialog={closeSelectedPayslip}
        handleDownloadPayslip={handleDownloadPayslip}
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        error={errorMessage}
      />
    </Screen>
  );
};

export default Payslip;
