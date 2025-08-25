import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Button from "../../../styles/forms/Button";
import Screen from "../../../layouts/Screen";
import { useFetch } from "../../../hooks/useFetch";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const GenerateQR = () => {
  const [qrData, setQrData] = useState(null);
  const [canRegenerate, setCanRegenerate] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const navigation = useNavigation();
  const route = useRoute();

  const { locationOn, locationPermission } = route.params;

  const { data: attendance } = useFetch("/hr/timesheets/personal/attendance-today");

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleGenerateQR = () => {
    const data = {
      time_in: attendance?.data?.time_in
        ? attendance?.data?.time_in
        : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      time_out: attendance?.data?.time_in
        ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : null,
    };
    setQrData(data);
    setCanRegenerate(false);
    setCountdown(30);
  };

  useEffect(() => {
    handleGenerateQR();
  }, []);

  useEffect(() => {
    if (!canRegenerate && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setCanRegenerate(true);
            setQrData(null);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, canRegenerate]);

  return (
    <Screen
      screenTitle={attendance?.data?.time_in ? "Clock Out" : "Clock In"}
      returnButton={true}
      onPress={handleReturn}
    >
      {!locationOn || !locationPermission ? (
        <EmptyPlaceholder text="Please activate or allow your location" />
      ) : (
        <View style={styles.wrapper}>
          {qrData ? (
            <QRCode value={JSON.stringify(qrData)} size={200} />
          ) : canRegenerate ? (
            <Text style={[TextProps, { color: Colors.danger, marginBottom: 10 }]}>
              QR Code is expired
            </Text>
          ) : null}
          {!canRegenerate && (
            <Text
              style={[
                TextProps,
                { color: Colors.fontDark, marginBottom: 10, marginTop: 10 },
              ]}
            >
              Regenerate in {countdown}s
            </Text>
          )}
          <Button
            onPress={canRegenerate ? handleGenerateQR : null}
            disabled={!canRegenerate}
          >
            <Text style={[TextProps, { color: Colors.fontLight }]}>Generate QR</Text>
          </Button>
        </View>
      )}
    </Screen>
  );
};

export default GenerateQR;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
