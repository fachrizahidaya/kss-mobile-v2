import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useFormik } from "formik";

<<<<<<< HEAD
<<<<<<< HEAD:src/screens/Tribe/LiveHost/Session/NewLiveSession.jsx
import { Keyboard, TouchableWithoutFeedback, StyleSheet, View } from "react-native";
=======
import { Keyboard, TouchableWithoutFeedback, Text, StyleSheet, View } from "react-native";
>>>>>>> 2f2a1a97 (fix: clock in reminder):src/screens/Tribe/LiveHost/NewLiveSession.jsx
=======
import { Keyboard, TouchableWithoutFeedback, StyleSheet, View } from "react-native";
>>>>>>> eda236e3 (fix: new live session)
import { ScrollView } from "react-native";

import Screen from "../../../../layouts/Screen";
import { Colors } from "../../../../styles/Color";
import NewLiveSessionForm from "../../../../components/Tribe/LiveHost/LiveSession/NewLiveSessionForm";
import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useLoading } from "../../../../hooks/useLoading";
>>>>>>> eda236e3 (fix: new live session)
=======
>>>>>>> a69b89cd (fix: live session)
import { useDisclosure } from "../../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../../styles/modals/ReturnConfirmationModal";
import JoinedSession from "../../../../components/Tribe/Reminder/JoinedSession";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import AlertModal from "../../../../styles/modals/AlertModal";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useFormik } from "formik";
>>>>>>> eda236e3 (fix: new live session)
=======
>>>>>>> a69b89cd (fix: live session)

const NewLiveSession = () => {
  const [clock, setClock] = useState(null);
  const [endClock, setEndClock] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const { toggle: toggleModal, isOpen: modalIsOpen } = useDisclosure(false);
<<<<<<< HEAD
<<<<<<< HEAD:src/screens/Tribe/LiveHost/Session/NewLiveSession.jsx
  const { isOpen: newJoinSessionModalIsOpen, toggle: toggleNewJoinSessionModal } =
    useDisclosure(false);
=======

  const { isOpen: newJoinSessionModalIsOpen, toggle: toggleNewJoinSessionModal } =
    useDisclosure(false);

  const { isLoading, toggle } = useLoading(false);
>>>>>>> 2f2a1a97 (fix: clock in reminder):src/screens/Tribe/LiveHost/NewLiveSession.jsx
=======
  const { isOpen: newJoinSessionModalIsOpen, toggle: toggleNewJoinSessionModal } =
    useDisclosure(false);

<<<<<<< HEAD
  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);
>>>>>>> eda236e3 (fix: new live session)

=======
>>>>>>> a69b89cd (fix: live session)
  const { data: sessionsData } = useFetch("/hr/ecom-live-session");
  const { data: brands } = useFetch("/hr/ecom-brand");
  const {
    data: joined,
    refetch: refetchJoined,
    isFetching: joinedIsFetching,
  } = useFetch("/hr/ecom-live-history/today");

  const updatedDataSessions = sessionsData?.data?.map((item) => ({
    ...item,
    value: item?.session,
    label: `${item.name} ${item.begin_time}-${item.end_time}`,
  }));

  const currentTime = dayjs();
  const endTimeFilteredSessions = updatedDataSessions?.filter((s) =>
    dayjs(`${dayjs().format("YYYY-MM-DD")} ${s?.end_time}`, "YYYY-MM-DD HH:mm").isAfter(
      currentTime
    )
  );

  const filteredSessions = endTimeFilteredSessions?.filter((s) => {
    const correspondingItem = joined?.data?.find((j) => j?.session === s?.id);
    return !correspondingItem;
  });

  const activeSessionChecker = joined?.data?.some((item) => item?.status === "Active");

  const brandOptions = brands?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const beforeBeginTime = dayjs(
    `${dayjs().format("YYYY-MM-DD")} ${clock}`,
    "YYYY-MM-DD HH:mm"
  ).subtract(60, "minute");
  const clockTime = dayjs(`${dayjs().format("YYYY-MM-DD")} ${clock}`, "YYYY-MM-DD HH:mm");
  const endClockTime = dayjs(
    `${dayjs().format("YYYY-MM-DD")} ${endClock}`,
    "YYYY-MM-DD HH:mm"
  ).subtract(1, "minute");
  const isWithinAllowedTime =
    currentTime.isAfter(beforeBeginTime) && currentTime.isBefore(endClockTime);

  const handleSubmit = async (data, setSubmitting, setStatus) => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      if (!isWithinAllowedTime) {
=======
      toggleProcess();
      if (!isWithinAllowedTime) {
        toggleProcess();
>>>>>>> eda236e3 (fix: new live session)
=======
      if (!isWithinAllowedTime) {
>>>>>>> a69b89cd (fix: live session)
        setRequestType("danger");
        setErrorMessage(`You can't join for now`);
      } else {
        const res = await axiosInstance.post(
<<<<<<< HEAD
<<<<<<< HEAD
          `/hr/ecom-live-history/session/${formik.values.live_session_id}/join`,
          data
        );
        setSubmitting(false);
        setStatus("success");
      }
      toggleNewJoinSessionModal();
=======
          `/hr/ecom-live-history/session/${session}/join`,
          // data
          {
            live_session_id: session,
            brand_id: brand,
          }
=======
          `/hr/ecom-live-history/session/${formik.values.live_session_id}/join`,
          data
>>>>>>> a69b89cd (fix: live session)
        );
        setSubmitting(false);
        setStatus("success");
      }
<<<<<<< HEAD
>>>>>>> eda236e3 (fix: new live session)
=======
      toggleNewJoinSessionModal();
>>>>>>> a69b89cd (fix: live session)
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      setStatus("error");
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleNewJoinSessionModal();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD:src/screens/Tribe/LiveHost/Session/NewLiveSession.jsx
=======
      toggle();
>>>>>>> a17dc642 (fix: alert modal live session, clock in clock out if already submitted):src/screens/Tribe/LiveHost/NewLiveSession.jsx
=======
      toggleProcess();
      // setSubmitting(false);
      // setStatus("error");
>>>>>>> eda236e3 (fix: new live session)
=======
>>>>>>> a69b89cd (fix: live session)
    }
  };

  const formik = useFormik({
    initialValues: {
      live_session_id: "",
      brand_id: "",
    },
<<<<<<< HEAD
<<<<<<< HEAD
    onSubmit: (values, { setSubmitting, setStatus }) => {
=======
    onSubmit: (values, { resetForm, setSubmitting, setStatus }) => {
>>>>>>> eda236e3 (fix: new live session)
=======
    onSubmit: (values, { setSubmitting, setStatus }) => {
>>>>>>> cd6e400d (chore: remove resetForm)
      setStatus("processing");
      handleSubmit(values, setSubmitting, setStatus);
    },
  });

  const handleConfirmReturnToHome = () => {
    toggleModal();
    navigation.navigate("Dashboard");
  };

  const handleReturn = () => {
    if (formik.values.live_session_id || formik.values.brand_id) {
      toggleModal();
    } else {
      navigation.goBack();
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
<<<<<<< HEAD
=======
  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
>>>>>>> a69b89cd (fix: live session)
=======
>>>>>>> cd6e400d (chore: remove resetForm)
      setRequestType("post");
      refetchJoined();
    }
  }, [formik.isSubmitting, formik.status]);
<<<<<<< HEAD
=======
  // useEffect(() => {
  //   if (!formik.isSubmitting && formik.status === "success") {
  //     refetchJoined();
  //     navigation.goBack();
  //   }
  // }, [formik.isSubmitting, formik.status]);
>>>>>>> eda236e3 (fix: new live session)
=======
>>>>>>> a69b89cd (fix: live session)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen
        screenTitle="Join Live Session"
        returnButton={true}
        onPress={handleReturn}
        backgroundColor={Colors.secondary}
      >
        {joined?.data?.length > 0 ? (
          <JoinedSession
            data={joined?.data}
            isFetching={joinedIsFetching}
            refetch={refetchJoined}
          />
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {activeSessionChecker === true ? (
              <EmptyPlaceholder text="You already have an active session" />
            ) : (
              <>
                <NewLiveSessionForm
                  sessions={filteredSessions}
                  brands={brandOptions}
                  handleSelectClock={setClock}
                  handleSelectEndClock={setEndClock}
                  formik={formik}
                />
              </>
            )}
          </View>
        </ScrollView>
        <ReturnConfirmationModal
          isOpen={modalIsOpen}
          toggle={toggleModal}
          onPress={handleConfirmReturnToHome}
          description="Are you sure want to exit? It will be deleted"
        />
        <AlertModal
          isOpen={newJoinSessionModalIsOpen}
          toggle={toggleNewJoinSessionModal}
          type={requestType === "post" ? "info" : "danger"}
          title={requestType === "post" ? "Session submitted!" : "Process error!"}
          description={
            requestType === "post"
              ? "You joined the online session"
              : errorMessage || "Please try again later"
          }
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NewLiveSession;

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
});
