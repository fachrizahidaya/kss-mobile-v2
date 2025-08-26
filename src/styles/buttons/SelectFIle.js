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
  setError
) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });

    if (result) {
      if (result.assets[0].mimeType === "image/jpeg") {
        const imageUri = result.assets[0].uri;
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 500 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        // const resizedImage = await ImageResizer.createResizedImage(
        //   imageUri,
        //   500,
        //   500,
        //   "JPEG",
        //   70,
        //   0
        // );

        setFileAttachment({
          name: result.assets[0].name,
          size: result.assets[0].size,
          type: result.assets[0].mimeType,
          uri: result.assets[0].uri,
          webkitRelativePath: "",
        });
      } else {
        if (result) {
          setFileAttachment({
            name: result.assets[0].name,
            size: result.assets[0].size,
            type: result.assets[0].mimeType,
            uri: result.assets[0].uri,
            webkitRelativePath: "",
          });
        }
      }
    }

    if (sheetManager) {
      SheetManager.hide("form-sheet");
    }
  } catch (err) {
    console.log(err);
    setRequestType("error");
    setError(err.response.data.message);
    toggleAlert();
  }
};
