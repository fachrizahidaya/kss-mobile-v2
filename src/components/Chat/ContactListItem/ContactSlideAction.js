import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
const AnimatedText = Animated.createAnimatedComponent(Text);

const ContactSlideAction = ({ isPinned, handleLeftSlide, handleRightSlide }) => {
  return (
    <View style={styles.backgroundAction}>
      <Pressable onPress={handleLeftSlide} style={{ alignItems: "center", paddingLeft: isPinned?.pin_chat ? 5 : 10 }}>
        <AnimatedIcon name="pin" color="#ffffff" size={20} />
        <AnimatedText style={{ color: "#FFFFFF" }}>{isPinned?.pin_chat ? "Unpin" : "Pin"}</AnimatedText>
      </Pressable>

      <Pressable onPress={handleRightSlide} style={{ alignItems: "center", paddingRight: 5 }}>
        <AnimatedIcon name="dots-horizontal" color="#ffffff" size={20} />
        <AnimatedText style={{ color: "#ffffff" }}>More</AnimatedText>
      </Pressable>
    </View>
  );
};

export default ContactSlideAction;

const styles = StyleSheet.create({
  backgroundAction: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
