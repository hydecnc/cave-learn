// app/diagram/page.tsx — Diagram page (route: /diagram)
// Two-column layout: CADiagram + DiagramLegend on the left, ComponentSidebar on the right.
// Owns selectedId state and passes it down to both children.

'use client'

import { useState } from 'react'
import CADiagram from '@/components/diagram/CADiagram'
import ComponentSidebar from '@/components/diagram/ComponentSidebar'
import Paper from '@mui/material/Paper'
import styles from './page.module.css'

export default function DiagramPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return <main className="page-shell" style={{ display: 'flex' }}>
      {/* Left: diagram + legend */}
      <div className={styles.leftCol}>
        <p className={`text-eyebrow ${styles.eyebrow}`}>DIAGRAM · COMPONENTS & LAYERS</p>
        <p className={`text-h1 ${styles.heading}`}>Click any component to learn what it does.</p>
        <Paper elevation={4} sx={{ borderRadius: 'var(--radius-card)', overflow: 'auto' }}>
          <div className={styles.diagramWrap}>
            <CADiagram selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className={styles.legend} />
        </Paper>
      </div>
      {/* Right: component sidebar */}
      <Paper elevation={0} sx={{ flex: 1, height: 'calc(100vh - var(--navbar-height))', overflow: 'hidden', position: 'sticky', top: 'var(--navbar-height)' }}>
        <ComponentSidebar selectedId={selectedId} />
      </Paper>
  </main>
}
