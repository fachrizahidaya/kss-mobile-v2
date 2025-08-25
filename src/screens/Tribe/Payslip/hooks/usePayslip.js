import { useRef, useState } from "react";
import { Linking } from "react-native";
import _ from "lodash";

import useCheckAccess from "../../../../hooks/useCheckAccess";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";

export const usePayslip = () => {
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
  const handleUpdatePayslipPassword = async (data, setSubmitting, setStatus) => {
    try {
      await axiosInstance.patch(`/hr/payslip/change-password`, data);
      setRequestType("patch");
      toggleAlert();
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

  return {
    hideNewPassword,
    setHideNewPassword,
    hideOldPassword,
    setHideOldPassword,
    hideConfirmPassword,
    setHideConfirmPassword,
    hasBeenScrolled,
    setHasBeenScrolled,
    selectedPayslip,
    setSelectedPayslip,
    currentPage,
    setCurrentPage,
    payslips,
    requestType,
    errorMessage,
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
    setPayslips,
    setRequestType,
    setErrorMessage,
  };
};
