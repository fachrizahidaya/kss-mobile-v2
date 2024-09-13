import * as DocumentPicker from "expo-document-picker";
import { SheetManager } from "react-native-actions-sheet";

/**
 * Handle select file
 */
export const selectFile = async (setFileAttachment, sheetManager, setRequestType, toggleAlert, setError) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });
    if (sheetManager) {
      SheetManager.hide("form-sheet");
    }

    // Check if there is selected file
    if (result) {
      if (result.assets[0].size < 3000001) {
        setFileAttachment({
          name: result.assets[0].name,
          size: result.assets[0].size,
          type: result.assets[0].mimeType,
          uri: result.assets[0].uri,
          webkitRelativePath: "",
        });
      } else {
        setRequestType("reject");
        setError("Max file size is 3MB");
        toggleAlert();
      }
    }
  } catch (err) {
    console.log(err);
    setRequestType("error");
    setError(err.response.data.message);
    toggleAlert();
  }
};
