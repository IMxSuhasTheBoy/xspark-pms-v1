import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
