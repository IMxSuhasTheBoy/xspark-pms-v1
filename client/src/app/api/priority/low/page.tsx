import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Low;
