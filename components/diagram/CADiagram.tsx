// components/diagram/CADiagram.tsx
// Interactive Clean Architecture diagram.
// Renders CA_LAYERS as rectangles and CA_COMPONENTS as clickable boxes.
// Props: selectedId (string | null), onSelect ((id: string | null) => void)

import { CA_COMPONENTS } from '@/lib/ca-data'
import { DiagramNode } from './DiagramNode'
import styles from './CADiagram.module.css'

interface CADiagramProps {
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export default function CADiagram({ selectedId, onSelect }: CADiagramProps) {
  return (
    <div className={styles.nodeGrid}>
      {CA_COMPONENTS.map((component) => (
        <DiagramNode
          key={component.id}
          label={component.name}
          isSelected={selectedId === component.id}
          onClick={() => onSelect(selectedId === component.id ? null : component.id)}
        />
      ))}
    </div>
  )
}
