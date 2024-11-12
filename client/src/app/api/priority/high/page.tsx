import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

const High = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;
