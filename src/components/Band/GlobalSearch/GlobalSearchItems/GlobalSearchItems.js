import { StyleSheet, View } from "react-native";

import TeamSection from "../TeamSection/TeamSection";
import ProjectSection from "../ProjectSection/ProjectSection";
import TaskSection from "../TaskSection/TaskSection";

const GlobalSearchItems = ({ data, keyword }) => {
  const { project, task, team } = data;

  return (
    <View style={styles.flex}>
      {team?.length > 0 ? <TeamSection teams={team} keyword={keyword} /> : null}
      {project?.length > 0 ? <ProjectSection projects={project} keyword={keyword} /> : null}
      {task?.length > 0 ? <TaskSection tasks={task} keyword={keyword} /> : null}
    </View>
  );
};

export default GlobalSearchItems;

const styles = StyleSheet.create({
  flex: {
    gap: 20,
  },
});
