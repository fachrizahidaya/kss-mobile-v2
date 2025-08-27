import * as DocumentPicker from "expo-document-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { SheetManager } from "react-native-actions-sheet";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import * as ImageManipulator from "expo-image-manipulator";
>>>>>>> 75de7cd1 (fix: logout if token expired, resize picture)
=======
>>>>>>> c01d4696 (feat: manipulator image)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
      if (result.assets[0].mimeType === "image/jpeg") {
        const imageUri = result.assets[0].uri;
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 500 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        const resizedImage = await ImageResizer.createResizedImage(
          imageUri,
          500,
          500,
          "JPEG",
          70,
          0
        );
=======
=======
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
        // const resizedImage = await ImageResizer.createResizedImage(
        //   imageUri,
        //   500,
        //   500,
        //   "JPEG",
        //   70,
        //   0
        // );
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> e9f1a448 (fix: attachment)

>>>>>>> c01d4696 (feat: manipulator image)
        setFileAttachment({
          name: result.assets[0].name,
          size: result.assets[0].size,
          type: result.assets[0].mimeType,
<<<<<<< HEAD
<<<<<<< HEAD
          uri: manipulatedImage.uri ?? result.assets[0].uri,
          webkitRelativePath: "",
        });
      } else {
=======

>>>>>>> 859eea89 (first commit)
=======

>>>>>>> c3ae17e7 (new branch)
        setFileAttachment({
          name: result.assets[0].name,
          size: result.assets[0].size,
          type: result.assets[0].mimeType,
          uri: result.assets[0].uri,
          webkitRelativePath: "",
        });
<<<<<<< HEAD
<<<<<<< HEAD
=======
          uri: manipulatedImage.uri,
=======
          uri: result.assets[0].uri,
>>>>>>> e9f1a448 (fix: attachment)
          webkitRelativePath: "",
        });
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c01d4696 (feat: manipulator image)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
