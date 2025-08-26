import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import Screen from "../../../layouts/Screen";
import { useFetch } from "../../../hooks/useFetch";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
=======
>>>>>>> 3a5fb5d5 (fix: location status)
=======
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
>>>>>>> f2d1297b (fix: scan QR)
=======
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
>>>>>>> 859eea89 (first commit)

const ScanQR = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const { location, locationOn, locationPermission } = route.params;
=======
  const { location } = route.params;
>>>>>>> 3a5fb5d5 (fix: location status)
=======
  const { location, locationOn, locationPermission } = route.params;
>>>>>>> f2d1297b (fix: scan QR)
=======
  const { location, locationOn, locationPermission } = route.params;
>>>>>>> 859eea89 (first commit)
  const { data: attendance } = useFetch("/hr/timesheets/personal/attendance-today");

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {};

  useEffect(() => {
    const getBarcodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarcodeScannerPermissions();
  }, []);

  return (
    <Screen
      screenTitle={attendance?.data?.time_in ? "Clock Out" : "Clock In"}
      returnButton={true}
      onPress={handleReturn}
    >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f2d1297b (fix: scan QR)
=======
>>>>>>> 859eea89 (first commit)
      {!locationOn || !locationPermission ? (
        <EmptyPlaceholder text="Please activate or allow your location" />
      ) : (
        <View style={styles.wrapper}>
          {hasPermission === false ? (
            <Text>Access denied</Text>
          ) : hasPermission === null ? (
            <Text>Please grant camera access</Text>
          ) : (
            <>
              <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={handleSubmit}
              />
            </>
          )}
        </View>
      )}
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <View style={styles.wrapper}>
        {hasPermission === false ? (
          <Text>Access denied</Text>
        ) : hasPermission === null ? (
          <Text>Please grant camera access</Text>
        ) : (
          <>
            <BarCodeScanner
              style={StyleSheet.absoluteFillObject}
              onBarCodeScanned={handleSubmit}
            />
          </>
        )}
      </View>
>>>>>>> 3a5fb5d5 (fix: location status)
=======
>>>>>>> f2d1297b (fix: scan QR)
=======
>>>>>>> 859eea89 (first commit)
    </Screen>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
});
