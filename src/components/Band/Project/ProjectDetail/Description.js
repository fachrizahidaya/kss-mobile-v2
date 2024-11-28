import { memo } from "react";

import RenderHtml from "react-native-render-html";
import { Dimensions, View } from "react-native";

import { hyperlinkConverter } from "../../../../helpers/hyperlinkConverter";
import { Colors } from "../../../../styles/Color";

const Description = ({ description }) => {
  const { width } = Dimensions.get("screen");

  const baseStyles = {
    color: Colors.fontDark,
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <RenderHtml
        contentWidth={width}
        baseStyle={baseStyles}
        source={{ html: hyperlinkConverter(description) || "" }}
      />
    </View>
  );
};

export default memo(Description);
