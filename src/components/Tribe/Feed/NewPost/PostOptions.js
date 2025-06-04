import dayjs from "dayjs";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import Button from "../../../../styles/forms/Button";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const PostOptions = ({
  formik,
  loggedEmployeeImage,
  loggedEmployeeName,
  checkAccess,
  reference,
}) => {
  const handlePress = () => {
    if (checkAccess) {
      reference.current?.show();
    } else {
      null;
    }
  };

  return (
    <View
      style={[
        styles.inputHeader,
        { alignItems: formik.values.type === "Public" ? "center" : "center" },
      ]}
    >
      <AvatarPlaceholder
        image={loggedEmployeeImage}
        name={loggedEmployeeName}
        size="lg"
        isThumb={false}
      />
      <View style={{ gap: 5 }}>
        <Button disabled={!checkAccess} onPress={handlePress} variant="outline">
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[{ fontSize: 10 }, TextProps]}>{formik.values.type}</Text>
            {checkAccess ? (
              <MaterialCommunityIcons
                name="chevron-down"
                color={Colors.iconDark}
                size={15}
              />
            ) : null}
          </View>
        </Button>
        {formik.values.type === "Public" ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <MaterialCommunityIcons
              name="clock-time-three-outline"
              color={Colors.iconDark}
            />
            <Text style={[{ fontSize: 12 }, TextProps]}>
              {!formik.values.end_date
                ? "Please select"
                : dayjs(formik.values.end_date).format("YYYY-MM-DD")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostOptions;

const styles = StyleSheet.create({
  inputHeader: {
    flexDirection: "row",
    gap: 5,
    marginHorizontal: 2,
    marginTop: 22,
  },
});
