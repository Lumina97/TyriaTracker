export type TTaskItem = {
  name: string;
  currentProgress: number;
  finishedProgress: number;
};

const TaskItem = ({ item }: { item: TTaskItem }) => {
  const isCompleted = item.currentProgress >= item.finishedProgress;
  return (
    <div className="flex justify-between items-center p-2 rounded-md bg-gray-700 text-gray-200">
      <span>{item.name.replaceAll("_", " ").toUpperCase()}</span>
      <span
        className={`w-3 h-3 rounded-full ${isCompleted ? "bg-green-500" : "bg-red-500"} flex-shrink-0`}
      ></span>
    </div>
  );
};

export default TaskItem;
