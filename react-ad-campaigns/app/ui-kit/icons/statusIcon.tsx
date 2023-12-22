import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faBox, faCircle, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatusIcon = ({ size = "1x", color = "green" }) => (
  <FontAwesomeIcon icon={faCircle} size={size as SizeProp} color={color} />
);

export default StatusIcon;
