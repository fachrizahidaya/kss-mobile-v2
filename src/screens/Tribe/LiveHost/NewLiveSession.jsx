import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Keyboard, TouchableWithoutFeedback, Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";

import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import NewLiveSessionForm from "../../../components/Tribe/LiveHost/LiveSession/NewLiveSessionForm";
import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import FormButton from "../../../styles/buttons/FormButton";
import JoinedSession from "../../../components/Tribe/Reminder/JoinedSession";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import AlertModal from "../../../styles/modals/AlertModal";

const NewLiveSession = () => {
  const [session, setSession] = useState(null);
  const [clock, setClock] = useState(null);
  const [endClock, setEndClock] = useState(null);
  const [brand, setBrand] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const { toggle: toggleModal, isOpen: modalIsOpen } = useDisclosure(false);

  const { isOpen: newJoinSessionModalIsOpen, toggle: toggleNewJoinSessionModal } =
    useDisclosure(false);

  const { isLoading, toggle } = useLoading(false);

  const { data: sessionsData } = useFetch("/hr/ecom-live-session");
  const { data: sessions } = useFetch("/hr/ecom-live-session/option");
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

  const handleSubmit = async () => {
    try {
      toggle();
      if (!isWithinAllowedTime) {
        toggle();
        setRequestType("error");
        setErrorMessage(`You can't join for now`);
      } else {
        const res = await axiosInstance.post(
          `/hr/ecom-live-history/session/${session}/join`,
          {
            live_session_id: session,
            brand_id: brand,
          }
        );
        setRequestType("post");
        toggle();
      }

      toggleNewJoinSessionModal();
      refetchJoined();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggle();
    }
  };

  const handleConfirmReturnToHome = () => {
    toggleModal();
    navigation.navigate("Dashboard");
  };

  const handleReturn = () => {
    if (session || brand) {
      toggleModal();
    } else {
      navigation.goBack();
    }
  };

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
                  handleSubmit={handleSubmit}
                  handleSelect={setSession}
                  selected={session}
                  brands={brandOptions}
                  brandSelected={brand}
                  handleBrand={setBrand}
                  joinedSession={joined?.data}
                  handleSelectClock={setClock}
                  handleSelectEndClock={setEndClock}
                />
                <FormButton
                  isSubmitting={isLoading}
                  disabled={!session || !brand}
                  onPress={handleSubmit}
                >
                  <Text style={{ color: Colors.fontLight }}>Submit</Text>
                </FormButton>
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
