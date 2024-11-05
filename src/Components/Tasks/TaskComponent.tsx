import React, { ReactNode } from "react";
import TaskItem, { TTaskItem } from "./TaskItem";

export type TTaskComponent = {
  name: string;
  taskItems: TTaskItem[];
};

const TaskComponent = ({ tasks }: { tasks: TTaskComponent }) => {
  return (
    <div className="w-[500px] border-black border-2 rounded-sm p-4">
      {tasks.name}
      {tasks.taskItems.map((task) => {
        return <TaskItem item={task} />;
      })}
    </div>
  );
};

export default TaskComponent;
