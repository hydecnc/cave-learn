// app/diagram/page.tsx — Diagram page (route: /diagram)
// Two-column layout: CADiagram + DiagramLegend on the left, ComponentSidebar on the right.
// Owns selectedId state and passes it down to both children.

'use client'

import { useState } from 'react'
import CADiagram from '@/components/diagram/CADiagram'
import DiagramLegend from '@/components/diagram/DiagramLegend'
import ComponentSidebar from '@/components/diagram/ComponentSidebar'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function DiagramPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return <main className="page-shell" style={{ display: 'flex' }}>
      {/* Left side 3 elevation paper, CA Diagram  */}
      <div style={{ flex: 2, paddingLeft: 'var(--space-6)', paddingRight: 'var(--space-6)' }}>
        <p className="text-eyebrow" style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-2)' }}>DIAGRAM · COMPONENTS & LAYERS</p>
        <p className='text-h1' style={{ marginBottom: 'var(--space-6)' }}>Click any component to learn what it does.</p>
        <Paper elevation={4} sx={{ height: '75vh', p: 'var(--space-6)', borderRadius: 'var(--radius-card)', overflow: 'auto' }}>
          <CADiagram selectedId={selectedId} onSelect={setSelectedId} />
        </Paper>
      </div>
      {/* Right side 0 elevation paper, CA component explanations*/}
      <Paper elevation={0} sx={{ flex: 1, height: 'calc(100vh - var(--navbar-height))', overflow: 'hidden', position: 'sticky', top: 'var(--navbar-height)' }}>
        <ComponentSidebar selectedId={selectedId} />
      </Paper>
  </main>
}
