import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Text, TouchableOpacity, View } from "react-native";

import Screen from "../../../layouts/Screen";
import MapLocation from "../../../components/Tribe/Clock/MapLocation";
import { useDisclosure } from "../../../hooks/useDisclosure";
import SelfieLocation from "../../../components/Tribe/Clock/SelfieLocation";
import PickImage from "../../../styles/buttons/PickImage";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";
import { useFetch } from "../../../hooks/useFetch";
import AlertModal from "../../../styles/modals/AlertModal";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";

const Clock = () => {
  const [attachment, setAttachment] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);

  const { location, locationOn, locationPermission } = route.params;
  const { data, refetch } = useFetch("/hr/timesheets/personal/attendance-today");

  const { isOpen: locationIsEmptyIsOpen, toggle: toggleLocationIsEmpty } =
    useDisclosure(false);
  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } =
    useDisclosure(false);
  const { isOpen: submissionSuccessIsOpen, toggle: toggleSubmissionSuccess } =
    useDisclosure(false);
  const { isOpen: confirmationIsOpen, toggle: toggleConfirmation } = useDisclosure(false);

  const focusMap = () => {
    if (mapRef.current) {
      const INITIAL_LOCATION = {
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      };

      mapRef.current.animateToRegion(INITIAL_LOCATION, 100);
    }
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    refetch();
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <Screen
      screenTitle={data?.data?.time_in ? "Clock Out" : "Clock In"}
      returnButton={true}
      onPress={handleReturn}
    >
      <MapLocation
        latitude={location?.latitude}
        longitude={location?.longitude}
        ref={mapRef}
        locationOn={locationOn}
        locationPermission={locationPermission}
      />

      <SelfieLocation
        toggle={toggleAddImageModal}
        handleAttachment={setAttachment}
        attachment={attachment}
      />
      <PickImage
        setImage={setAttachment}
        modalIsOpen={addImageModalIsOpen}
        toggleModal={toggleAddImageModal}
        useGallery={false}
      />
      <View style={{ marginHorizontal: 16, marginVertical: 14 }}>
        <FormButton onPress={toggleConfirmation} disabled={null} isSubmitting={null}>
          <Text style={{ color: Colors.fontLight }}>Submit</Text>
        </FormButton>
      </View>
      <AlertModal
        isOpen={submissionSuccessIsOpen}
        toggle={toggleSubmissionSuccess}
        type={requestType}
        title={`${data?.data?.time_in ? "Clock-out" : "Clock-in"} success!`}
        description={"test"}
      />
      <ConfirmationModal
        isOpen={confirmationIsOpen}
        toggle={toggleConfirmation}
        apiUrl={null}
        body={null}
        hasSuccessFunc={true}
        onSuccess={handleSubmit}
        toggleOtherModal={toggleSubmissionSuccess}
        setSuccess={setSuccess}
        success={success}
        setRequestType={setRequestType}
        description={`
      Are you sure want to ${data?.data?.time_in ? "Clock-out" : "Clock-in"}?`}
      />
    </Screen>
  );
};

export default Clock;
