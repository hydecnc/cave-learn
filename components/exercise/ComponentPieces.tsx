// components/exercise/ComponentPieces.tsx
// Right-hand panel showing the draggable CA component chips to be placed on the board.
import { CA_LAYERS, type LayerId } from "@/lib/ca-data";
import styles from './style.module.css';

interface ComponentPiecesProps {
  label: string;
  layer: string;
}

const capitalizeWords = (words : string) : string => {
  const wordsSplit = words.split("-");
  let newLabel : string = "";
  for(const word of wordsSplit){
    newLabel = newLabel + word[0].toUpperCase() + word.substring(1) + " ";
  }
  return newLabel.substring(0, newLabel.length - 1);
}

const getSubLabel = (label : string) : string => {
  if(label == "input-data" || label == "view-model" || label == "output-data"){
    return '<DS>'
  }else if(label == "input-boundary" || label == "output-boundary" || label == "data-access-interface"){
    return '<I>'
  }
  return "";
}

const layerToBadge : Record<LayerId, string> = {
  'interface-adapters' : "badge badge--green",
  'application-business-rules' : "badge badge--pink",
  'enterprise-business-rules' : "badge badge--yellow",
  'frameworks-drivers' : "badge badge--blue"
}

export default function ComponentPieces({ label, layer } : ComponentPiecesProps) {
  return (
  <button className={`${layerToBadge[layer as LayerId]} ${styles['exercise--button']}`} type="button">
    <p className={styles['button--main-label']}>{capitalizeWords(label)}</p>
    {getSubLabel(label) != "" && <p className={styles['button--sub-label']}>{getSubLabel(label)}</p>}
  </button>
)}
