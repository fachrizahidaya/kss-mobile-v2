import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
} from "react-native";
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

const NewLiveSession = () => {
  const [session, setSession] = useState(null);
  const [brand, setBrand] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const { toggle: toggleModal, isOpen: modalIsOpen } = useDisclosure(false);

  const { setRequestType, setError, toggleAlert } = route.params;

  const { isLoading, toggle } = useLoading(false);

  const { data: sessions } = useFetch("/hr/ecom-live-session/option");
  const { data: brands } = useFetch("/hr/ecom-brand");
  const {
    data: joined,
    refetch: refetchJoined,
    isFetching: joinedIsFetching,
  } = useFetch("/hr/ecom-live-history/today");

  const filteredSessions = sessions?.data?.filter((s) => {
    const correspondingItem = joined?.data?.find(
      (j) => j?.session === s?.value
    );
    return !correspondingItem;
  });

  const activeSessionChecker = joined?.data?.some(
    (item) => item?.status === "Active"
  );

  const brandOptions = brands?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const handleSubmit = async () => {
    try {
      toggle();
      const res = await axiosInstance.post(
        `/hr/ecom-live-history/session/${session}/join`,
        {
          live_session_id: session,
          brand_id: brand,
        }
      );
      setRequestType("post");
      toggleAlert();
      navigation.goBack();
      toggle();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setError(err.response.data.message);
      toggle();
    }
  };

  const handleSelect = (value) => {
    setSession(value);
  };

  const handleBrand = (value) => {
    setBrand(value);
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
                  handleSelect={handleSelect}
                  selected={session}
                  brands={brandOptions}
                  brandSelected={brand}
                  handleBrand={handleBrand}
                  joinedSession={joined?.data}
                />
                <View style={{ marginHorizontal: 16 }}>
                  <FormButton
                    isSubmitting={isLoading}
                    disabled={!session}
                    onPress={handleSubmit}
                  >
                    <Text style={{ color: Colors.fontLight }}>Submit</Text>
                  </FormButton>
                </View>
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
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NewLiveSession;

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    gap: 10,
  },
});
