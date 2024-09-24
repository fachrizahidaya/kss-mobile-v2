import { Pressable, StyleSheet } from "react-native";

const CustomCard = ({ backgroundColor, handlePress, children, index, length, gap }) => {
  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ? backgroundColor : "#FFFFFF",
          marginBottom: index === length - 1 ? 14 : null,
          gap: gap ? gap : null,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 14,
    marginHorizontal: 16,
  },
});
