import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  // console.log("TaskCard task from search", task);
  const startDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "Not set";
  const dueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "Not set";

  return (
    <div className="mb-4 flex flex-col rounded-lg border border-gray-300 p-4 shadow dark:border-dark-secondary dark:bg-dark-tertiary">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold dark:text-white">
            {task.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
            {task.description || "No description provided"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-neutral-400">
            <strong className="dark:text-neutral-300">Priority:</strong>{" "}
            {task.priority}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-neutral-400">
            <strong className="dark:text-neutral-300">Status:</strong>{" "}
            {task.status}
          </span>
          {typeof task.points === "number" && (
            <span className="text-sm font-medium text-gray-600 dark:text-neutral-400">
              <strong className="dark:text-neutral-300">Points:</strong>{" "}
              {task.points}
            </span>
          )}
        </div>
      </div>

      <ul className="mt-4 gap-2 text-sm font-medium text-gray-600 dark:text-neutral-400">
        <li>
          <strong className="dark:text-neutral-300">ID:</strong> {task.id}
        </li>
        <li>
          <strong className="dark:text-neutral-300">Tags:</strong>{" "}
          {task.tags || "No tags"}
        </li>
        <li>
          <strong className="dark:text-neutral-300">Start Date:</strong>{" "}
          {startDate}
        </li>
        <li>
          <strong className="dark:text-neutral-300">Due Date:</strong> {dueDate}
        </li>
        <li>
          <strong className="dark:text-neutral-300">Author:</strong>{" "}
          {task.author?.username || task.authorUserId || "Unknown"}
        </li>
        <li>
          <strong className="dark:text-neutral-300">Assignee:</strong>{" "}
          {task.assignee?.username || task.assignedUserId || "Unassigned"}
        </li>
      </ul>
      {task.attachments && task.attachments?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold dark:text-white">
            Attachments:
          </h3>
          <Image
            src={`/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            width={400}
            height={200}
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
