import { TTaskItem } from "./TaskItem";
import { TWizardVaultAPIData } from "../../Utils/types";
import TaskComponent from "./TaskComponent";

const WizardVaultTaskComponent = ({
  wizardVault,
}: {
  wizardVault: TWizardVaultAPIData;
}) => {
  const wizardDailyTasks: TTaskItem[] | undefined =
    wizardVault?.daily?.objectives.map((objective) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  const wizardWeeklyTasks: TTaskItem[] | undefined =
    wizardVault?.weekly?.objectives.map((objective) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  const wizardSpecialTasks: TTaskItem[] | undefined =
    wizardVault?.special?.objectives.map((objective) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  return (
    <div className="space-y-4">
      <div>
        {wizardDailyTasks && (
          <TaskComponent
            key={"Daily"}
            tasks={{ name: "Daily", taskItems: wizardDailyTasks }}
          />
        )}
      </div>
      <div>
        {wizardWeeklyTasks && (
          <TaskComponent
            key={"Weekly"}
            tasks={{ name: "Weekly", taskItems: wizardWeeklyTasks }}
          />
        )}
      </div>
      <div>
        {wizardSpecialTasks && (
          <TaskComponent
            key={"Special"}
            tasks={{
              name: "Special",
              taskItems: wizardSpecialTasks,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WizardVaultTaskComponent;
