import { toast } from "react-toastify";

export const notifySuccess = () => toast.success("Action succeded!");
export const notifyError = () => toast.error("Action failed!");
