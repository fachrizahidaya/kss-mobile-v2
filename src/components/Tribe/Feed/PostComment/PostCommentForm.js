import { useEffect } from "react";

import {
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MentionInput } from "react-native-controlled-mentions";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FormButton from "../../../../styles/buttons/FormButton";
import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { Colors } from "../../../../styles/Color";

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
        <AvatarPlaceholder
          isThumb={false}
          size="sm"
          image={loggedEmployeeImage}
          name={loggedEmployeeName}
        />
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
                textStyle: { fontWeight: "400", color: Colors.primary },
              },
            ]}
            multiline={false}
            placeholder={parentId ? "Add reply" : "Add comment"}
            style={{ alignItems: "center" }}
          />
        </View>

        <FormButton
          backgroundColor={Colors.secondary}
          onPress={formik.handleSubmit}
          isSubmitting={formik.isSubmitting}
          disabled={!formik.values.comments}
        >
          <MaterialIcons name="send" size={20} color={"grey"} />
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
