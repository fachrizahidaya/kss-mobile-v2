<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { PROVIDER_GOOGLE } from "react-native-maps";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Text, View, StyleSheet } from "react-native";
=======
import React from "react";
<<<<<<< HEAD
import { View, StyleSheet } from "react-native";
>>>>>>> ed94efae (fix: map location for ios)
import MapView from "react-native-maps";
=======
import { View, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
>>>>>>> 1d7969b3 (fix: adjust react native map)
import { PROVIDER_GOOGLE } from "react-native-maps";
=======
>>>>>>> 3c7c91a1 (chore: commnd necessary)
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
<<<<<<< HEAD
>>>>>>> 066d8525 (feat: map view)
=======

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
>>>>>>> ed94efae (fix: map location for ios)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
