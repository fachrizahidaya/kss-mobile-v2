import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../CustomStylings";
import { Colors } from "../Color";

const Input = ({
  formik,
  fieldName = "",
  placeHolder,
  title,
  defaultValue,
  value,
  secureTextEntry,
  startIcon,
  endIcon,
  onPressEndIcon,
  onChangeText,
  endAdornment,
  startAdornment,
  multiline,
  numberOfLines,
  style,
  editable = true,
  innerRef,
  height,
  setHeight,
  width,
  onTouchStart,
  keyboardType,
  borderColor,
  alignVertical,
  sizeChange = false,
  onChange,
}) => {
  return (
    <View style={styles.wrapper}>
      {title && <Text style={[{ marginBottom: 9 }, TextProps]}>{title}</Text>}

      <View style={styles.inputWrapper}>
        {startIcon && (
          <Pressable style={styles.startIcon} onPress={onPressEndIcon}>
            <MaterialCommunityIcons
              name={startIcon}
              size={20}
              color={Colors.iconDark}
            />
          </Pressable>
        )}

        {startAdornment && (
          <View style={styles.startIcon}>{startAdornment}</View>
        )}

        <TextInput
          keyboardType={keyboardType}
          ref={innerRef}
          editable={editable}
          selectTextOnFocus={editable}
          multiline={multiline}
          textAlignVertical={alignVertical ? alignVertical : null}
          numberOfLines={numberOfLines}
          placeholder={placeHolder}
          onTouchStart={onTouchStart}
          onChangeText={(value) => {
            if (onChangeText) {
              onChangeText(value);
            } else {
              formik?.setFieldValue(fieldName, value);
            }
          }}
          onChange={onChange}
          onContentSizeChange={
            sizeChange
              ? ({ nativeEvent: { contentSize: height } }) => {
                  setHeight(height);
                }
              : null
          }
          autoCapitalize="none"
          style={[
            styles.input,
            style,
            {
              borderColor: borderColor ? borderColor : Colors.borderGrey,
              paddingLeft: startAdornment || startIcon ? 35 : 10,
              height: height ? height : multiline ? 100 : 40,
              width: width || "100%",
              textAlignVertical: "top",
              color: !editable ? "#cbcbcb" : Colors.fontDark,
              opacity: !editable ? 0.5 : null,
            },
          ]}
          defaultValue={defaultValue}
          value={value}
          secureTextEntry={secureTextEntry}
        />

        {endIcon && (
          <Pressable style={styles.endIcon} onPress={onPressEndIcon}>
            <MaterialCommunityIcons
              name={endIcon}
              size={20}
              color={Colors.iconDark}
            />
          </Pressable>
        )}

        {endAdornment && <View style={styles.endIcon}>{endAdornment}</View>}
      </View>

      {formik?.errors[fieldName] && (
        <Text
          style={{
            color: Colors.error,
            marginTop: 9,
            marginLeft: 3,
            fontSize: 12,
          }}
        >
          {formik.errors[fieldName]}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    padding: 10,
  },
  startIcon: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  endIcon: {
    position: "absolute",
    right: 10,
    top: 11,
  },
});
