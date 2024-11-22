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
    <div className="relative flex flex-col justify-between group w-full g-2 p-1 sm:p-3 md:p-3 lg:p-3">
      <div className=" pr-4 flex flex-row justify-between">
        {tasks.name.replaceAll("_", " ").toUpperCase()}
        <span
          className={`${numCompleted === tasks.taskItems.length ? "text-green-600" : "text-red-600"} `}
        >
          {numCompleted} / {tasks.taskItems.length}
        </span>
      </div>
      <div
        className={`flex pointer-events-none p-2   relative h-[${2 * tasks.taskItems.length}rem] bg-zinc-800 text-[] flex-col w-[95%] right-0 border-2 border-sunset left-[5%] z-10`}
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
