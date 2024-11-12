import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

const Backlog = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
