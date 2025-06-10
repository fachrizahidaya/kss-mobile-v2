import { Text, View } from "react-native";

import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import Select from "../../../../styles/forms/Select";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const NewLiveSessionForm = ({
  sessions,
  handleSelectClock,
  handleSelectEndClock,
  brands,
  formik,
}) => {
  const disabled =
    !sessions?.length !== 0 ||
    brands?.length !== 0 ||
    formik.errors.live_session_id ||
    formik.errors.brand_id;

  return (
    <View style={{ gap: 10 }}>
      {sessions?.length > 0 ? (
        <Select
          title="Session"
          items={sessions}
          value={formik.values.live_session_id}
          placeHolder="Select session"
          onChange={(value) => formik.setFieldValue("live_session_id", value)}
          needMoreFunction={true}
          onChangeClock={handleSelectClock}
          onChangeEndClock={handleSelectEndClock}
          fieldName="live_session_id"
          formik={formik}
        />
      ) : sessions?.length < 0 ? (
        <EmptyPlaceholder text="You already have an active session" />
      ) : (
        <EmptyPlaceholder text="No Data" />
      )}

      {brands?.length > 0 ? (
        <Select
          title="Brand"
          items={brands}
          value={formik.values.brand_id}
          placeHolder="Select brand"
          onChange={(value) => formik.setFieldValue("brand_id", value)}
          formik={formik}
          fieldName="brand_id"
        />
      ) : (
        <EmptyPlaceholder text="No Data" />
      )}

      <FormButton
        isSubmitting={formik.isSubmitting}
        disabled={disabled}
        onPress={formik.handleSubmit}
      >
        <Text style={[TextProps, { color: Colors.fontLight }]}>Submit</Text>
      </FormButton>
    </View>
  );
};

export default NewLiveSessionForm;
