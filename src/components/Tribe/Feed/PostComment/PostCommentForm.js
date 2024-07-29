import { useEffect } from "react";

import { StyleSheet, View, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { MentionInput } from "react-native-controlled-mentions";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FormButton from "../../../../styles/FormButton";
import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";

const PostCommentForm = ({
  loggedEmployeeImage,
  parentId,
  loggedEmployeeName,
  renderSuggestions,
  handleChange,
  formik,
}) => {
  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <AvatarPlaceholder isThumb={false} size="sm" image={loggedEmployeeImage} name={loggedEmployeeName} />
        <View style={styles.wrapper}>
          <MentionInput
            value={formik.values.comments}
            onChange={handleChange}
            partTypes={[
              {
                pattern:
                  /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
              },
              {
                trigger: "@",
                renderSuggestions: renderSuggestions,
                textStyle: { fontWeight: "400", color: "#377893" },
              },
            ]}
            multiline={false}
            placeholder={parentId ? "Add reply" : "Add comment"}
            style={{ alignItems: "center" }}
          />
        </View>

        <FormButton
          backgroundColor="white"
          onPress={formik.handleSubmit}
          isSubmitting={formik.isSubmitting}
          opacity={formik.values.comments === "" ? 0.5 : 1}
          padding={5}
          height={40}
          disabled={formik.values.comments === ""}
        >
          <MaterialIcons name="send" size={25} color="#8A9099" />
        </FormButton>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostCommentForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#DBDBDB",
    gap: 10,
    paddingBottom: Platform.OS === "ios" ? 30 : 14,
    paddingHorizontal: Platform.OS === "ios" ? 12 : 14,
    paddingVertical: Platform.OS === "ios" ? 6 : 6,
  },
  wrapper: {
    flex: 1,
  },
});
