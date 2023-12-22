import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CloseIcon = ({ size = "1x", color = "black" }) => (
  <FontAwesomeIcon icon={faClose} size={size as SizeProp} color={color} />
);

export default CloseIcon;
