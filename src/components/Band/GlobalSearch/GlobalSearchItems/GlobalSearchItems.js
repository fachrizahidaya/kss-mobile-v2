import { StyleSheet, View } from "react-native";

import TeamSection from "../TeamSection/TeamSection";
import ProjectSection from "../ProjectSection/ProjectSection";
import TaskSection from "../TaskSection/TaskSection";

const GlobalSearchItems = ({ data, keyword, navigation }) => {
  const { project, task, team } = data;

  return (
    <View style={styles.flex}>
      {team?.length > 0 ? <TeamSection teams={team} keyword={keyword} navigation={navigation} /> : null}
      {project?.length > 0 ? <ProjectSection projects={project} keyword={keyword} navigation={navigation} /> : null}
      {task?.length > 0 ? <TaskSection tasks={task} keyword={keyword} navigation={navigation} /> : null}
    </View>
  );
};

export default GlobalSearchItems;

const styles = StyleSheet.create({
  flex: {
    gap: 20,
  },
});
