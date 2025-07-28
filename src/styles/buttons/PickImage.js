import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import CustomModal from "../modals/CustomModal";
import { Colors } from "../Color";

/**
 * Handle pick an image
 */
export const pickImageHandler = async (useCamera, setImage, sheetManager) => {
  let result;

  if (useCamera) {
    await ImagePicker.requestCameraPermissionsAsync();
    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
  } else {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (sheetManager) {
      SheetManager.hide("form-sheet");
    }
  }

  // Handling for name
  var filename = result.assets[0].uri.substring(
    result.assets[0].uri.lastIndexOf("/") + 1,
    result.assets[0].uri.length
  );

  const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri); // Handling for file information

  if (result) {
    setImage({
      name: filename,
      size: fileInfo.size,
      type: `${result.assets[0].type}/jpg`,
      webkitRelativePath: "",
      uri: result.assets[0].uri,
    });
  }
};

const PickImage = ({
  setImage,
  sheetManager,
  modalIsOpen,
  toggleModal,
  useGallery = true,
}) => {
  /**
   * Handle pick an image
   */
  const pickImageHandler = async (useCamera, setImage) => {
    let result;

    if (useCamera) {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      toggleModal();
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      toggleModal();
    }
    if (sheetManager) {
      SheetManager.hide("form-sheet");
    }

    // Handling for name
    var filename = result.assets[0].uri.substring(
      result.assets[0].uri.lastIndexOf("/") + 1,
      result.assets[0].uri.length
    );

    const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri); // Handling for file information

    if (result) {
      setImage({
        name: filename,
        size: fileInfo.size,
        type: `${result.assets[0].type}/jpg`,
        webkitRelativePath: "",
        uri: result.assets[0].uri,
      });
    }
  };

  return (
    <CustomModal isOpen={modalIsOpen} toggle={toggleModal}>
      <View style={{ gap: 5 }}>
        {!useGallery ? null : (
          <Button
            onPress={() => pickImageHandler(false, setImage)}
            backgroundColor={Colors.tertiary}
          >
            <Text style={[TextProps]}>Add from Galery</Text>
          </Button>
        )}
        <Button
          onPress={() => pickImageHandler(true, setImage)}
          backgroundColor={Colors.tertiary}
        >
          <Text style={[TextProps]}>Take an image</Text>
        </Button>
      </View>
    </CustomModal>
  );
};

export default PickImage;
