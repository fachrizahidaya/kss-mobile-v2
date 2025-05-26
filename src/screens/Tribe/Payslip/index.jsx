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
<<<<<<< HEAD
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
=======
    data: payslip,
    refetch: refetchPayslip,
    isFetching: payslipIsFetching,
    isLoading: payslipIsLoading,
  } = useFetch("/hr/payslip", [currentPage], fetchPayslipParameters);

  const fetchMorePayslip = () => {
    if (currentPage < payslip?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Handle selected payslip to download
   * @param {*} data
   */
  const openSelectedPayslip = (data) => {
    setSelectedPayslip(data);
    payslipDownloadScreenSheetRef.current?.show();
  };
  const closeSelectedPayslip = () => {
    setSelectedPayslip(null);
    payslipDownloadScreenSheetRef.current?.hide();
  };

  /**
   * Handle update Document Password update
   * @param {*} data
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const handleUpdatePayslipPassword = async (data, setSubmitting, setStatus) => {
    try {
      await axiosInstance.patch(`/hr/payslip/change-password`, data);
      setRequestType("patch");
      toggleAlert();
      refetchPayslip();
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleAlert();
      setSubmitting(false);
      setStatus("error");
    }
  };

  /**
   * Handle download payslip
   * @param {*} data
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const handleDownloadPayslip = async (data, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.get(
        `/hr/payslip/${selectedPayslip}/download?password=${data?.password}`
      );
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${res?.data?.data}`);
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      setSubmitting(false);
      setStatus("error");
    }
  };
>>>>>>> 33ce77b1 (fix:)

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
