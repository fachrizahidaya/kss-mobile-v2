import { useDispatch, useSelector } from "react-redux";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { setModule } from "../../redux/reducer/module";
import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";

/**
 * @function ModuleSelectSheet
 * @param {boolean} isOpen - Whether the module selection slider is open or closed.
 */
const ModuleSelectSheet = (props) => {
  const dispatch = useDispatch();
  // Get user data from the Redux store
  const userSelector = useSelector((state) => state.auth);

  return (
    <CustomSheet moduleScreenSheet={true} reference={props.reference}>
      {userSelector?.user_module &&
        userSelector.user_module
          .filter(
            (item) =>
              item.module_name === "BAND" ||
              item.module_name === "TRIBE" ||
              // || item.module_name === "PIPE"
              item.module_name === "COIN" ||
              item.module_name === "SILO" ||
              item.module_name === "CONSOLE"
          )
          .map((item, idx) => {
            return (
              <Pressable
                key={idx}
                style={styles.wrapper}
                onPress={() => {
                  dispatch(setModule(item.module_name));
                  props.reference.current?.hide();
                }}
              >
                <View style={styles.flex}>
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_API}/image/${item.module_image}ICON.png`,
                    }}
                    alt={item.module_name}
                    style={styles.image}
                  />
                  <View style={styles.flex}>
                    <Text style={TextProps}>
                      {item.module_name.charAt(0).toUpperCase() +
                        item.module_name.slice(1).toLowerCase()}
                    </Text>
                    <Text style={TextProps}> | {item.module_label}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
    </CustomSheet>
  );
};

export default ModuleSelectSheet;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 50,
    resizeMode: "contain",
    marginRight: 15,
  },
  item: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
