import { Text, View } from "react-native";
import { TextProps } from "../../../../styles/CustomStylings";
import Reason from "./shared/Reason";
import { Colors } from "../../../../styles/Color";

const HolidayLeave = ({ type, formik, reasonValue, fieldName }) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={{ gap: 10 }}>
        <Text style={[{ fontSize: 14 }, TextProps]}>Unattendance Type</Text>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.borderGrey,
          }}
        >
          <Text style={[{ fontSize: 14 }, TextProps]}>{type}</Text>
        </View>
      </View>
      {reasonValue && (
        <Reason formik={formik} value={reasonValue} fieldName={fieldName} />
      )}
    </View>
  );
};

export default HolidayLeave;
