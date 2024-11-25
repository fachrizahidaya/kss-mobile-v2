import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Keyboard, TouchableWithoutFeedback, Text } from "react-native";

import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import NewLiveSessionForm from "../../../components/Tribe/LiveHost/LiveSession/NewLiveSessionForm";
import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";

const NewLiveSession = () => {
  const [session, setSession] = useState(null);
  const [brand, setBrand] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const { toggle: toggleModal, isOpen: modalIsOpen } = useDisclosure(false);

  const { setRequestType, setError, toggleAlert } = route.params;

  const { isLoading, toggle } = useLoading(false);
  const { data: sessions } = useFetch("/hr/ecom-live-history/today");
  const { data: brands } = useFetch("/hr/ecom-brand");

  const handleSubmit = async () => {
    try {
      toggle();
      const res = await axiosInstance.post(`/hr/ecom-live-history/session/${session}/join`, {
        live_session_id: session,
        brand_id: brand,
      });
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

  const sessionOptions = sessions?.data?.map((item) => ({
    value: item?.id,
    label: `Session: ${item?.session} | ${item?.begin_time} - ${item?.end_time}`,
  }));

  const brandOptions = brands?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen
        screenTitle="Join Live Session"
        returnButton={true}
        onPress={handleReturn}
        backgroundColor={Colors.secondary}
      >
        <NewLiveSessionForm
          items={sessionOptions}
          value={session}
          handleChange={setSession}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleSelect={handleSelect}
          selected={session}
          brands={brandOptions}
          brand={brand}
          handleBrand={handleBrand}
        />
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
