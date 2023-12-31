import { toast } from "react-toastify";

export const notifySuccess = () => toast.success("Action succeded!");
export const notifyError = (error?: string) =>
  toast.error(error ? error : "Action failed!");
