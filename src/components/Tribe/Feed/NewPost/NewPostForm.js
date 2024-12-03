import { StyleSheet, View, Pressable, Image, ActivityIndicator } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import NewPostInput from "./NewPostInput";
import FormButton from "../../../../styles/buttons/FormButton";
import { Colors } from "../../../../styles/Color";

const NewPostForm = ({ formik, image, setImage, employees, isLoading, handleAddImageOption, handleSubmit }) => {
  const handleClearImage = () => setImage(null);

  return (
    <View style={styles.container}>
      <View>
        <NewPostInput employees={employees} formik={formik} />

        <View style={styles.boxImage}>
          {image ? (
            <View style={{ alignSelf: "center" }}>
              <Image source={{ uri: image?.uri }} style={styles.image} alt="image selected" />
              <Pressable style={styles.close} onPress={handleClearImage}>
                <MaterialCommunityIcons name="close" size={20} color={Colors.iconLight} />
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.action}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={handleAddImageOption}>
            <MaterialCommunityIcons
              name="attachment"
              size={25}
              color={Colors.iconDark}
              style={{ transform: [{ rotate: "-35deg" }] }}
            />
          </Pressable>
        </View>

        <FormButton
          style={[
            styles.submit,
            {
              opacity:
                (formik.values.type === "Announcement" && formik.values.end_date == "") ||
                formik.values.content === "" ||
                isLoading
                  ? 0.5
                  : 1,
            },
          ]}
          isSubmitting={isLoading}
          onPress={
            (formik.values.type === "Announcement" && formik.values.end_date === "") || formik.values.content === ""
              ? null
              : handleSubmit
          }
          disabled={
            (formik.values.type === "Announcement" && formik.values.end_date == "") ||
            formik.values.content === "" ||
            isLoading
              ? true
              : false
          }
          borderRadius={20}
          height={40}
          width={40}
        >
          <MaterialCommunityIcons
            name={formik.values.type === "Public" ? "send" : "bullhorn-variant"}
            size={20}
            color={Colors.iconLight}
            style={{ transform: [{ rotate: "-45deg" }] }}
          />
        </FormButton>
      </View>
    </View>
  );
};

export default NewPostForm;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dfdfdf",
    marginTop: 20,
  },
  close: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "#4b4f53",
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  boxImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    flex: 1,
    width: 350,
    height: 500,
    resizeMode: "contain",
    backgroundColor: Colors.secondary,
  },
});
