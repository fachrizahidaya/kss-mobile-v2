import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";
import FeedContentStyle from "../../../../styles/FeedContentStyle";
import CustomCard from "../../../../layouts/CustomCard";
import CustomBadge from "../../../../styles/CustomBadge";
import { Colors } from "../../../../styles/Color";

const PostCardItem = ({
  id,
  index,
  length,
  employeeId,
  employeeName,
  createdAt,
  employeeImage,
  content,
  total_like,
  totalComment,
  likedBy,
  attachment,
  type,
  loggedEmployeeId,
  loggedEmployeeImage,
  toggleLike,
  handleToggleComment,
  handleToggleFullScreen,
  handlePressLink,
  employeeUsername,
  navigation,
  reference,
  setPostId,
  isFullScreen,
  setIsFullScreen,
  setSelectedPicture,
  handleToggleReport,
}) => {
  const [totalLike, setTotalLike] = useState(total_like);
  const [likeAction, setLikeAction] = useState("dislike");

  const words = content?.split(" ");

  const params = {
    employeeId: employeeId,
    loggedEmployeeId: loggedEmployeeId,
    loggedEmployeeImage: loggedEmployeeImage,
  };

  const renderActionOptions = async () => {
    await SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.screenSheet}>
            <Pressable
              onPress={async () => {
                await SheetManager.hide("form-sheet");
                handleToggleReport(id);
              }}
              style={styles.screenSheetItem}
            >
              <Text style={[{ fontSize: 16 }, TextProps]}>Report</Text>
              <MaterialCommunityIcons name="alert-box" size={20} color={Colors.primary} />
            </Pressable>
          </View>
        ),
      },
    });
  };

  /**
   * Handle toggle like
   */
  const handleToggleLike = (post_id, action) => {
    if (action === "like") {
      setLikeAction("dislike");
      setTotalLike((prevState) => prevState + 1);
    } else {
      setLikeAction("like");
      setTotalLike((prevState) => prevState - 1);
    }
    toggleLike(post_id, action);
  };

  const handleFullScreen = () => {
    if (attachment) {
      handleToggleFullScreen(attachment, isFullScreen, setIsFullScreen, setSelectedPicture);
    }
  };

  useEffect(() => {
    if (likedBy && likedBy?.includes("'" + String(loggedEmployeeId) + "'")) {
      setLikeAction("dislike");
    } else {
      setLikeAction("like");
    }
  }, [likedBy, loggedEmployeeId]);

  return (
    <CustomCard index={index} length={length} gap={20}>
      <Pressable style={{ gap: 20 }} onPress={() => navigation.navigate("Post Screen", { id: id })}>
        <View style={styles.cardHeader}>
          <Pressable onPress={() => navigation.navigate("Employee Profile", params)}>
            <AvatarPlaceholder image={employeeImage} name={employeeName} size="lg" isThumb={false} />
          </Pressable>

          <View style={{ flex: 1, gap: 5 }}>
            <Pressable style={styles.dockName} onPress={() => navigation.navigate("Employee Profile", params)}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={[{ fontSize: 14 }, TextProps]}>
                  {employeeName?.length > 30 ? employeeName?.split(" ")[0] : employeeName}
                </Text>
                {type === "Announcement" && <CustomBadge description="Announcement" backgroundColor="#ADD7FF" />}
              </View>
              {/* Toggle report a post */}
              {loggedEmployeeId !== employeeId && (
                <MaterialCommunityIcons
                  onPress={renderActionOptions}
                  name="dots-vertical"
                  size={20}
                  color={Colors.iconDark}
                  style={{ marginRight: 1 }}
                />
              )}
            </Pressable>
            <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>{dayjs(createdAt).format("DD MMM YYYY")}</Text>
          </View>
        </View>
        <Text style={[{ fontSize: 14 }, TextProps]}>
          <FeedContentStyle
            words={words}
            employeeUsername={employeeUsername}
            navigation={navigation}
            loggedEmployeeId={loggedEmployeeId}
            loggedEmployeeImage={loggedEmployeeImage}
            onPressLink={handlePressLink}
          />
        </Text>
      </Pressable>
      {attachment ? (
        <Pressable key={id} onPress={handleFullScreen}>
          <Image
            style={styles.image}
            source={{ uri: `${process.env.EXPO_PUBLIC_API}/image/${attachment}` }}
            alt="Feed Image"
            resizeMethod="auto"
            fadeDuration={0}
          />
        </Pressable>
      ) : null}
      <View style={styles.dockAction}>
        {/* comment a post */}
        <View style={styles.iconAction}>
          <MaterialCommunityIcons
            onPress={() => handleToggleComment(id, reference, setPostId)}
            name="comment-text-outline"
            size={20}
            color={Colors.iconDark}
          />
          <Text style={[{ fontSize: 14 }, TextProps]}>{totalComment}</Text>
        </View>

        {/* like or dislike a post */}
        <View style={styles.iconAction}>
          {likeAction === "dislike" && (
            <MaterialCommunityIcons
              onPress={() => handleToggleLike(id, likeAction)}
              name="heart"
              size={20}
              color="#FF0000"
            />
          )}
          {likeAction === "like" && (
            <MaterialCommunityIcons
              onPress={() => handleToggleLike(id, likeAction)}
              name="heart-outline"
              size={20}
              color={Colors.iconDark}
            />
          )}

          <Text style={[{ fontSize: 14 }, TextProps]}>{totalLike || total_like}</Text>
        </View>
      </View>
    </CustomCard>
  );
};

export default PostCardItem;

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  dockName: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 1,
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.secondary,
    resizeMode: "cover",
  },
  dockAction: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  iconAction: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  screenSheet: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  screenSheetItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundLight,
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
  },
});
