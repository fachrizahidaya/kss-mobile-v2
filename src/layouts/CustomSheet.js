import { StyleSheet, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

const CustomSheet = ({
  reference,
  children,
  handleClose,
  closeOnPressBack,
  closeOnTouchBackdrop,
  containerStyle,
  moduleScreenSheet,
  commentSheet,
}) => {
  var renderStyle;
  if (moduleScreenSheet) {
    renderStyle = styles.containerAdd;
  } else if (commentSheet) {
    renderStyle = null;
  } else {
    renderStyle = styles.container;
  }

  return (
    <ActionSheet
      ref={reference}
      onClose={handleClose}
      closeOnPressBack={closeOnPressBack}
      closeOnTouchBackdrop={closeOnTouchBackdrop}
      containerStyle={containerStyle}
    >
      <View style={renderStyle}>{children}</View>
    </ActionSheet>
  );
};

export default CustomSheet;

const styles = StyleSheet.create({
  container: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  containerAdd: {
    paddingBottom: 40,
  },
});
