<<<<<<< HEAD
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { PROVIDER_GOOGLE } from "react-native-maps";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import { Colors } from "../../../styles/Color";

const MapLocation = React.forwardRef(
  ({ latitude, longitude, onRegionChange, locationOn, locationPermission }, ref) => {
    const INITIAL_REGION = {
      latitude: latitude,
      longitude: longitude,
      /** For zoom ratio */
      latitudeDelta: 0.032,
      longitudeDelta: 0.032,
    };

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: !locationOn || !locationPermission ? Colors.iconGrey : null,
          },
        ]}
      >
        {
          !locationOn ||
            (!locationPermission && (
              <EmptyPlaceholder text="Please activate or allow your location" />
            ))
          // : (
          //   <MapView
          //     provider={PROVIDER_GOOGLE}
          //     initialRegion={INITIAL_REGION}
          //     style={styles.map}
          //     showsUserLocation
          //     showsMyLocationButton
          //     ref={ref}
          //     region={INITIAL_REGION}
          //     mapType={"standard"}
          //     zoomEnabled
          //     scrollEnabled
          //   >
          //     <Marker coordinate={INITIAL_REGION} />
          //   </MapView>
          // )
        }
      </View>
    );
  }
);

export default MapLocation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 14,
    flex: 1,
    borderRadius: 6,
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 6,
  },
});
=======
import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

const MapLocation = ({ latitude, longitude }) => {
  const INITIAL_REGION = {
    latitude: -6.220477517768054,
    longitude: 106.59195420814262,
    latitudeDelta: 0.0,
    longitudeDelta: 0.0,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};

export default MapLocation;
>>>>>>> 066d8525 (feat: map view)
