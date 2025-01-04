import TaskItem, { TTaskItem } from "./TaskItem";
export type TTaskComponent = {
  name: string;
  taskItems: TTaskItem[];
};

const TaskComponent = ({ tasks: task }: { tasks: TTaskComponent }) => {
  return (
    <div key={task.name} className="mb-4">
      <h4 className="text-xl font-bold mb-2 text-white">
        {task.name.replaceAll("_", " ").toUpperCase()}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {task.taskItems.map((task) => (
          <TaskItem key={task.name} item={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskComponent;
