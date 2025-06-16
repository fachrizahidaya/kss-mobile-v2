import { useRef } from "react";
import { View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Colors } from "../styles/Color";

const TextEditor = ({ handleChange, handlePreProcessContent, values }) => {
  const richText = useRef();

  return (
    <View>
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.setStrikethrough,
          actions.setUnderline,
        ]}
        iconTint={Colors.iconDark}
        selectedIconTint={Colors.primary}
      />

      <View style={{ flex: 1 }}>
        <RichEditor
          ref={richText}
          onChange={handleChange}
          initialContentHTML={handlePreProcessContent(values)}
          style={{
            flex: 1,
            borderWidth: 0.5,
            borderRadius: 10,
            borderColor: Colors.borderGrey,
          }}
          editorStyle={{
            contentCSSText: `
              display: flex; 
              flex-direction: column; 
              min-height: 200px; 
              position: absolute; 
              top: 0; right: 0; bottom: 0; left: 0;`,
          }}
        />
      </View>
    </View>
  );
};

export default TextEditor;
