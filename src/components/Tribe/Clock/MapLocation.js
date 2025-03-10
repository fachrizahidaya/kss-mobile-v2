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
