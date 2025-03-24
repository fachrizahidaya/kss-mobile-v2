import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import { AppState, Platform, Text, TouchableOpacity, View } from "react-native";

import Screen from "../../../layouts/Screen";
import MapLocation from "../../../components/Tribe/Clock/MapLocation";
import { useDisclosure } from "../../../hooks/useDisclosure";
import SelfieLocation from "../../../components/Tribe/Clock/SelfieLocation";
import PickImage from "../../../styles/buttons/PickImage";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

const Clock = () => {
  const [location, setLocation] = useState({});
  const [locationOn, setLocationOn] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [attachment, setAttachment] = useState(null);

  const navigation = useNavigation();
  const mapRef = useRef(null);

  const { isOpen: locationIsEmptyIsOpen, toggle: toggleLocationIsEmpty } =
    useDisclosure(false);
  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } =
    useDisclosure(false);

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

  /**
   * Handle open setting to check location service
   */
  const openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  };

  /**
   * Handle modal to turn on location service
   */
  const showAlertToActivateLocation = () => {
    Alert.alert(
      "Activate location",
      "In order to clock-in or clock-out, you must turn the location on.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Go to Settings",
          onPress: () => openSetting(),
          style: "default",
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  /**
   * Handle modal to allow location permission
   */
  const showAlertToAllowPermission = () => {
    Alert.alert(
      "Permission needed",
      "In order to clock-in or clock-out, you must give permission to access the location. You can grant this permission in the Settings app.",
      [
        {
          text: "OK",
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation = async () => {
    try {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      setLocationOn(isLocationEnabled);

      if (!isLocationEnabled) {
        showAlertToActivateLocation();
        return;
      } else {
        const { granted } = await Location.getForegroundPermissionsAsync();
        setLocationPermission(granted);
        const lastKnownLocation = await Location.getLastKnownPositionAsync();
        const currentLocation = await Location.getCurrentPositionAsync({});

        if (!lastKnownLocation || !currentLocation) {
          checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
        } else {
          if (Platform.OS === "ios") {
            setLocation(lastKnownLocation?.coords);
          } else {
            setLocation(currentLocation?.coords);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturn = () => {
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

  useEffect(() => {
    const checkPermissionRequest = async () => {
      if (!locationPermission) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          showAlertToAllowPermission();
          return;
        }
      }
    };

    checkPermissionRequest();
  }, [locationPermission]);

  useEffect(() => {
    /**
     * Handle device state change
     * @param {*} nextAppState
     */
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState == "active") {
        checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
      } else {
        checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation(); // Initial run when the component mounts
  }, [locationOn, locationPermission]);

  return (
    <Screen screenTitle={"Clock In"} returnButton={true} onPress={handleReturn}>
      <MapLocation
        latitude={location?.latitude}
        longitude={location?.longitude}
        ref={mapRef}
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
        <FormButton disabled={!attachment || !location}>
          <Text style={{ color: Colors.fontLight }}>Submit</Text>
        </FormButton>
      </View>
    </Screen>
  );
};

export default Clock;
