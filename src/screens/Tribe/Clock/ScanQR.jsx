import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import Screen from "../../../layouts/Screen";
import { useFetch } from "../../../hooks/useFetch";
<<<<<<< HEAD
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
=======
>>>>>>> 3a5fb5d5 (fix: location status)

const ScanQR = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

<<<<<<< HEAD
  const { location, locationOn, locationPermission } = route.params;
=======
  const { location } = route.params;
>>>>>>> 3a5fb5d5 (fix: location status)
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
