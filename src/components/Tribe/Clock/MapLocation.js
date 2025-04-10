import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

const MapLocation = React.forwardRef(({ latitude, longitude, onRegionChange }, ref) => {
  const INITIAL_REGION = {
    latitude: latitude,
    longitude: longitude,
    /** For zoom ratio */
    latitudeDelta: 0.032,
    longitudeDelta: 0.032,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        ref={ref}
        region={INITIAL_REGION}
        mapType={"standard"}
        zoomEnabled
        scrollEnabled
      >
        <Marker coordinate={INITIAL_REGION} />
      </MapView>
    </View>
  );
});

export default MapLocation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 14,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 6,
  },
});
