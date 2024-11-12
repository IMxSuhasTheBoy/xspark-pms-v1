import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

const Medium = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
