import { Image, View, Text, Pressable } from "react-native";

import { useDisclosure } from "../hooks/useDisclosure";
import UserPreviewModal from "./modals/UserPreviewModal";
import { Colors } from "./Color";

const AvatarPlaceholder = ({ image, name, email, size = "sm", isThumb = true, isPressable, style }) => {
  const { isOpen, toggle } = useDisclosure(false);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const userInitialGenerator = () => {
    const nameArray = name?.split(" ");
    let alias = "";

    if (nameArray?.length >= 2) {
      alias = nameArray[0][0] + nameArray[1][0];
    } else {
      alias = nameArray[0][0];
    }

    return alias;
  };

  const handlePress = () => {
    if (isPressable) {
      toggle();
    }
  };

  return (
    <>
      {image ? (
        <>
          {isPressable ? (
            <Pressable onPress={handlePress} style={style}>
              <Image
                source={{
                  uri: isThumb
                    ? `${process.env.EXPO_PUBLIC_API}/image/${image}/thumb`
                    : `${process.env.EXPO_PUBLIC_API}/image/${image}`,
                }}
                style={{
                  width: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  height: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  resizeMode: "contain",
                  backgroundColor: "transparent",
                  borderRadius: 50,
                }}
              />
            </Pressable>
          ) : (
            <Image
              source={{
                uri: isThumb
                  ? `${process.env.EXPO_PUBLIC_API}/image/${image}/thumb`
                  : `${process.env.EXPO_PUBLIC_API}/image/${image}`,
              }}
              size={size || "xs"}
              bg="transparent"
              style={[
                style,
                {
                  width: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  height: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  resizeMode: "contain",
                  backgroundColor: "transparent",
                  borderRadius: 50,
                },
              ]}
            />
          )}
        </>
      ) : (
        <>
          {isPressable ? (
            <Pressable onPress={handlePress} style={style}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  height: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  backgroundColor: stringToColor(name),
                  borderRadius: 50,
                }}
              >
                <Text
                  style={{
                    fontSize: size === "xs" ? 12 : size == "sm" ? 14 : size === "md" ? 16 : size == "xl" ? 20 : 18,
                    color: Colors.fontLight,
                    fontWeight: "bold",
                  }}
                >
                  {name ? userInitialGenerator() : "KSS"}
                </Text>
              </View>
            </Pressable>
          ) : (
            <View
              style={[
                style,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  width: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  height: size === "xs" ? 24 : size === "sm" ? 30 : size === "md" ? 40 : size === "xl" ? 80 : 50,
                  backgroundColor: stringToColor(name),
                  borderRadius: 50,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: size === "xs" ? 12 : size == "sm" ? 14 : size === "md" ? 16 : size == "xl" ? 20 : 18,
                  color: Colors.fontLight,
                  fontWeight: "bold",
                }}
              >
                {name ? userInitialGenerator() : "KSS"}
              </Text>
            </View>
          )}
        </>
      )}

      {isOpen ? (
        <UserPreviewModal
          isOpen={isOpen}
          toggle={toggle}
          name={name}
          image={image}
          email={email}
          stringToColor={stringToColor}
          userInitialGenerator={userInitialGenerator}
        />
      ) : null}
    </>
  );
};

export default AvatarPlaceholder;
