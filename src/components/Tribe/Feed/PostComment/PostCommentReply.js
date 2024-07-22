import { View, Text, Pressable } from "react-native";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";
import FeedContentStyle from "../../../../styles/FeedContentStyle";

const PostCommentReply = ({
  authorName,
  comments,
  totalReplies,
  handleReply,
  parentId,
  authorImage,
  handlePressLink,
  employeeUsername,
  setCommentParentId,
  navigation,
}) => {
  const words = comments.split(" ");

  return (
    <View style={{ marginHorizontal: 40, marginVertical: 10 }}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View>
          <AvatarPlaceholder image={authorImage} name={authorName} size="md" isThumb={false} />
        </View>
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={{ fontSize: 12, fontWeight: "500" }}>
            {authorName.length > 30 ? authorName.split(" ")[0] : authorName}
          </Text>
          <Text style={[{ fontSize: 12 }, TextProps]}>
            {
              <FeedContentStyle
                words={words}
                employeeUsername={employeeUsername}
                navigation={navigation}
                loggedEmployeeId={null}
                loggedEmployeeImage={null}
                onPressLink={handlePressLink}
              />
            }
          </Text>
          <Pressable onPress={() => handleReply(parentId, setCommentParentId)}>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "#8A7373" }}>Reply</Text>
          </Pressable>
        </View>
      </View>
      {totalReplies > 0 ? <Text>{totalReplies}</Text> : null}
    </View>
  );
};

export default PostCommentReply;
