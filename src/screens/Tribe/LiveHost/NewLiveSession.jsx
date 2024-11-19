import { useState, useMemo } from "react";

import { Keyboard, TouchableWithoutFeedback, Text } from "react-native";

import Screen from "../../../layouts/Screen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../styles/Color";
import NewLiveSessionForm from "../../../components/Tribe/LiveHost/LiveSession/NewLiveSessionForm";
import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";

const NewLiveSession = () => {
  const [session, setSession] = useState(null);
  const [hostType, setHostType] = useState(1);

  const route = useRoute();
  const navigation = useNavigation();

  const { setRequestType, setError, toggleAlert } = route.params;

  const { isLoading, toggle } = useLoading(false);
  const { data } = useFetch("/hr/ecom-live-schedule/session/today");

  const handleSubmit = async () => {
    try {
      toggle();
      const res = await axiosInstance.post(`/hr/ecom-live-schedule/session/${session}/join`, {
        host_type: hostType === 1 ? "Reguler" : "Training",
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

  const sessionOptions = data?.data?.map((item) => ({
    value: item?.id,
    label: `Session: ${item?.session} ${item?.begin_time} ${item?.brand?.name}`,
  }));

  const hostTypeRadioButtons = useMemo(
    () => [
      {
        id: 1,
        value: "Reguler",
        label: "Reguler",
      },
      {
        id: 2,
        value: "Training",
        label: "Training",
      },
    ],
    []
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen
        screenTitle="Join Live Session"
        returnButton={true}
        onPress={() => navigation.goBack()}
        backgroundColor={Colors.secondary}
      >
        <NewLiveSessionForm
          items={sessionOptions}
          value={session}
          handleChange={setSession}
          handlePress={setHostType}
          selectedId={hostType}
          radioButtons={hostTypeRadioButtons}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NewLiveSession;
