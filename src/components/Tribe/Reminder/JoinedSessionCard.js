import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../../styles/Color";

const JoinedSessionCard = ({ children, index, length }) => {
  return (
    <Pressable
      style={[
        styles.wrapper,
        {
          marginLeft: 16,
          marginRight: index === length - 1 ? 16 : null,
          backgroundColor: Colors.backgroundLight,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default JoinedSessionCard;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 80,
    gap: 12,
    width: 250,
  },
});
