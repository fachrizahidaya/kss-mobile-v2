import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

const MapLocation = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView provider={PROVIDER_GOOGLE} />
      <Text>MapLocation</Text>
    </View>
  );
};

export default MapLocation;
