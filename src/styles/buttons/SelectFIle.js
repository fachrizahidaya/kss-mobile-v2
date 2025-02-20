import * as DocumentPicker from "expo-document-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { SheetManager } from "react-native-actions-sheet";
import ImageResizer from "@bam.tech/react-native-image-resizer";

/**
 * Handle select file
 */
export const selectFile = async (
  setFileAttachment,
  sheetManager,
  setRequestType,
  toggleAlert,
  setError,
) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });

    if (result) {
      setFileAttachment({
        name: result.assets[0].name,
        size: result.assets[0].size,
        type: result.assets[0].mimeType,
        uri: result.assets[0].uri,
        webkitRelativePath: "",
      });
    }
  } catch (err) {
    console.log(err);
    setRequestType("error");
    setError(err.response.data.message);
    toggleAlert();
  }
};
