import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../../../styles/forms/Input";
import { Colors } from "../../../styles/Color";

const GroupData = ({ onAddImage, image, formik }) => {
  return (
    <View style={styles.groupData}>
      <Pressable style={styles.groupImage} onPress={() => onAddImage()}>
        {image ? (
          <Image style={{ height: 150, width: 150, borderRadius: 80 }} alt="group-image" source={{ uri: image.uri }} />
        ) : (
          <View style={{ alignItems: "center", gap: 5 }}>
            <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF" }}>Add group icon</Text>
          </View>
        )}
      </Pressable>

      <Input
        placeHolder="Group name"
        value={formik.values.name}
        onChangeText={(value) => formik.setFieldValue("name", value)}
      />
      {formik.errors.name && <Text style={{ fontSize: 12, color: "#F44336" }}>{formik.errors.name}</Text>}
    </View>
  );
};

export default GroupData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupImage: {
    borderRadius: 80,
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#176688",
  },
  groupData: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 16,
  },
  checkButton: {
    padding: 20,
    shadowOffset: 0,
    borderWidth: 5,
    borderColor: Colors.borderWhite,
    borderRadius: 40,
  },
});
