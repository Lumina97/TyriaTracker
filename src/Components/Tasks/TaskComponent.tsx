import TaskItem, { TTaskItem } from "./TaskItem";

export type TTaskComponent = {
  name: string;
  taskItems: TTaskItem[];
};

const TaskComponent = ({ tasks }: { tasks: TTaskComponent }) => {
  let numCompleted = 0;
  tasks.taskItems.map((task) => {
    if (task.currentProgress >= task.finishedProgress) numCompleted++;
  });

  return (
    <div className="relative flex justify-between group w-full g-2 p-3">
      {tasks.name.replaceAll("_", " ").toUpperCase()}
      <span>
        {numCompleted} / {tasks.taskItems.length}
      </span>
      <div
        className={`group-hover:flex pointer-events-none p-2 hidden absolute h-[${2 * tasks.taskItems.length}rem] bg-zinc-800 text-white flex-col w-[350px] right-0 top-[50px] border-black left-[0] z-10`}
      >
        {tasks.taskItems.map((task) => {
          return (
            <TaskItem
              //@ts-ignore
              key={task.name}
              item={task}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskComponent;
