import { type ReactNode, CSSProperties } from 'react';
import ComponentPieces from "./ComponentPieces"
import { CA_COMPONENTS } from "@/lib/ca-data"
import styles from "./style.module.css"

export default function Sidebar(){
    return (
    <aside className={styles['sidebar--container']}>
        <div className={styles['pieces--container']}>
            <p>PIECES</p>
        </div>
        <div className={styles['description--container']}>
            <p>Drag each chip into the slot you think it belongs in. Drop chips back here to remove.</p>
        </div>
        <div className={styles['buttons--container']}>
            {CA_COMPONENTS.map((component) => (<ComponentPieces key={component.id} layer={component.layer} label={component.id}/>))}
        </div>
    </aside>
)}
