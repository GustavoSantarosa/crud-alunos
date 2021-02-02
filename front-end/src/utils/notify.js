import { toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

export default function notify(message, autoClose, type, onClose) {
  toast(message, {
    type: type || "error",
    autoClose: autoClose === false ? false : true,
    onClose
  });
}
