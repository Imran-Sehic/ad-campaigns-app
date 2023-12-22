import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

const TrashBinIcon = ({ size = '1x', color = 'black' }) => (
  <FontAwesomeIcon icon={faTrash} size={size as SizeProp} color={color} />
);

export default TrashBinIcon;
