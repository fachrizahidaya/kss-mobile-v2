import { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import _ from "lodash";

import { Linking, Text } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import { useDisclosure } from "../../../hooks/useDisclosure";
import Button from "../../../styles/forms/Button";
import axiosInstance from "../../../config/api";
import useCheckAccess from "../../../hooks/useCheckAccess";
import PayslipPasswordEdit from "../../../components/Tribe/Payslip/PayslipPasswordEdit";
import PayslipDownload from "../../../components/Tribe/Payslip/PayslipDownload";
import PayslipList from "../../../components/Tribe/Payslip/PayslipList";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const Payslip = () => {
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [payslips, setPayslips] = useState([]);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const payslipDownloadScreenSheetRef = useRef(null);
  const payslipPasswordEditScreenSheetRef = useRef(null);
  const firstTimeRef = useRef(null);

  const downloadPayslipCheckAccess = useCheckAccess("download", "Payslip");

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const fetchPayslipParameters = {
    page: currentPage,
    limit: 10,
  };

  const {
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
  const payslipPasswordUpdateHandler = async (data, setSubmitting, setStatus) => {
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
  const payslipDownloadHandler = async (data, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.get(`/hr/payslip/${selectedPayslip}/download`, {
        params: data,
      });
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
        handleUpdatePassword={payslipPasswordUpdateHandler}
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        requestType={requestType}
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
      />
      <PayslipDownload
        reference={payslipDownloadScreenSheetRef}
        toggleDownloadDialog={closeSelectedPayslip}
        handleDownloadPayslip={payslipDownloadHandler}
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        error={errorMessage}
      />
    </Screen>
  );
};

export default Payslip;
