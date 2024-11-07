import { SafeAreaView, StyleSheet } from "react-native";
import ScreenHeader from "./ScreenHeader";
import PageHeader from "./PageHeader";
import { Colors } from "../styles/Color";

const Screen = ({
  screenTitle,
  mainScreen,
  companyName,
  children,
  childrenHeader,
  returnButton,
  subTitle,
  withLoading,
  isLoading,
  onPress,
  backgroundColor,
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: backgroundColor ? backgroundColor : null }]}>
      {mainScreen ? (
        <ScreenHeader screenTitle={screenTitle} companyName={companyName} children={childrenHeader} />
      ) : (
        <PageHeader
          title={screenTitle}
          withReturnButton={returnButton}
          subTitle={subTitle}
          withLoading={withLoading}
          isLoading={isLoading}
          onPress={onPress}
          children={childrenHeader}
        />
      )}
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    position: "relative",
  },
});
