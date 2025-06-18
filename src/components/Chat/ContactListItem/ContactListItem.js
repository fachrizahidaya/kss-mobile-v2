import { useEffect, useState } from "react";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import axiosInstance from "../../../config/api";
import SlideContactItem from "./SlideContactItem";
import ContactSlideAction from "./ContactSlideAction";
import { Colors } from "../../../styles/Color";

const ContactListItem = ({
  chat,
  type,
  id,
  userId,
  name,
  image,
  position,
  email,
  message,
  isDeleted,
  fileName,
  project,
  task,
  time,
  timestamp,
  searchKeyword,
  active_member,
  isRead,
  isPinned,
  handleClickMore,
  handleTogglePin,
  navigation,
  latest,
  userSelector,
  attendance_today,
  setRequest,
  setError,
  toggleAlert,
}) => {
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  const params = {
    userId: userId,
    name: name,
    roomId: id,
    image: image,
    position: position,
    email: email,
    type: type,
    active_member: active_member,
    isPinned: isPinned,
    forwardedMessage: null,
    attendance_today: attendance_today,
  };

  /**
   * Fetch members of selected group
   */
  const fetchSelectedGroupMembers = async () => {
    try {
      const res = await axiosInstance.get(`/chat/group/${id}/member`);
      setSelectedGroupMembers(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handle for mention name in group member
   */
  const memberName = selectedGroupMembers.map((item) => {
    return item?.user?.name;
  });

  /**
   * Handle showing mention chat
   */
  for (let i = 0; i < memberName.length; i++) {
    let placeholder = new RegExp(`\\@\\[${memberName[i]}\\]\\(\\d+\\)`, "g");
    message = message?.replace(placeholder, `@${memberName[i]}`);
  }

  const handleBoldCharacters = (sentence = "", characters = "") => {
    const regex = new RegExp(characters, "gi");
    return sentence?.replace(regex, `<strong style="color: #176688;">$&</strong>`);
  };

  const renderName = () => {
    return handleBoldCharacters(name, searchKeyword);
  };

  const handleGenerateIcon = () => {
    let iconName = "";
    if (fileName) {
      const file_extension = fileName.split(".")[1];
      if (
        file_extension === "gif" ||
        file_extension === "png" ||
        file_extension === "jpg" ||
        file_extension === "jpeg"
      ) {
        iconName = "image";
      } else {
        iconName = "file-document";
      }
    }
    if (project) {
      iconName = "lightning-bolt";
    }
    if (task) {
      iconName = "checkbox-marked-circle-outline";
    }
    return iconName;
  };

  const handleAttachmentText = () => {
    let text = "";
    if (fileName) {
      const file_extension = fileName.split(".")[1];
      if (
        file_extension === "gif" ||
        file_extension === "png" ||
        file_extension === "jpg" ||
        file_extension === "jpeg"
      ) {
        text = "Photo";
      } else {
        text = "File";
      }
    }
    if (project) {
      text = "Project";
    }
    if (task) {
      text = "Task";
    }
    return text;
  };

  const translateX = useSharedValue(0);
  const swipeThresholdPositive = 150;
  const swipeThresholdNegative = -150;
  const panGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX > 0) {
        const dismissed = translateX.value < swipeThresholdPositive;
        if (dismissed) {
          translateX.value = withTiming(0);
        } else {
          translateX.value = withTiming(70);
        }
      } else {
        const dismissed = translateX.value > swipeThresholdNegative;
        if (dismissed) {
          translateX.value = withTiming(0);
        } else {
          translateX.value = withTiming(-60);
        }
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: translateX.value > 0 ? Colors.primary : "#959595",
  }));

  const handleSlideLeft = () => {
    translateX.value = withTiming(0);
    handleTogglePin(
      type,
      id,
      isPinned?.pin_chat ? "unpin" : "pin",
      null,
      setRequest,
      setError,
      toggleAlert
    );
  };

  const handleSlideRight = () => {
    translateX.value = withTiming(0);
    handleClickMore(chat);
  };

  useEffect(() => {
    fetchSelectedGroupMembers();
  }, [id]);

  return (
    <Animated.View style={[animatedBackgroundStyle, { justifyContent: "center" }]}>
      <ContactSlideAction
        isPinned={isPinned}
        handleLeftSlide={handleSlideLeft}
        handleRightSlide={handleSlideRight}
      />
      <SlideContactItem
        panGesture={panGesture}
        animatedStyle={animatedStyle}
        navigation={navigation}
        params={params}
        name={name}
        image={image}
        searchKeyword={searchKeyword}
        renderName={renderName}
        time={time}
        timestamp={timestamp}
        type={type}
        chat={chat}
        userSelector={userSelector}
        isDeleted={isDeleted}
        message={message}
        project={project}
        task={task}
        fileName={fileName}
        generateIcon={handleGenerateIcon}
        isRead={isRead}
        latest={latest}
        isPinned={isPinned}
        generateAttachmentText={handleAttachmentText}
      />
    </Animated.View>
  );
};

export default ContactListItem;
