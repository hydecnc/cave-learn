// lib/ca-data.ts
// ─────────────────────────────────────────────────────────────
// Single source of truth for all Clean Architecture content.
//
// USED BY: CADiagram, ComponentSidebar, ExerciseBoard, ComponentPieces.
// Never hardcode layer names, colors, or descriptions inside a component.
// Always import from here so the data stays consistent site-wide.
// ─────────────────────────────────────────────────────────────

export type LayerId =
  | 'interface-adapters'
  | 'application-business-rules'
  | 'enterprise-business-rules'
  | 'frameworks-drivers'

export interface CALayer {
  id: LayerId
  name: string
  /** CSS custom property value — use as background-color in inline styles or module CSS */
  colorHex: string
  /** Human-readable description shown in tooltips or the sidebar */
  description: string
}

export interface CAComponent {
  id: string
  name: string
  layer: LayerId
  /** Full explanation shown in the sidebar when the component is clicked */
  description: string
  /** IDs of other components this one depends on (solid arrow points away from this component) */
  dependsOn: { id: string; reason: string }[];
    /** IDs of interfaces this component implements (dashed arrow) */
  implements: { id: string; reason: string }[];
}

// ── Layers ───────────────────────────────────────────────────

export const CA_LAYERS: Record<LayerId, CALayer> = {
  'interface-adapters': {
    id: 'interface-adapters',
    name: 'Interface Adapters',
    colorHex: '#3FAE5C', // brand-green
    description:
      'Converts data between the format convenient for use cases and the format convenient for external agencies like databases or the web.',
  },
  'application-business-rules': {
    id: 'application-business-rules',
    name: 'Application Business Rules',
    colorHex: '#E2477C', // brand-pink
    description:
      'Contains the use cases of the application. Orchestrates the flow of data to and from the entities.',
  },
  'enterprise-business-rules': {
    id: 'enterprise-business-rules',
    name: 'Enterprise Business Rules',
    colorHex: '#F5C242', // brand-yellow
    description:
      'The innermost layer. Entities encapsulate the most general and high-level business rules of the enterprise.',
  },
  'frameworks-drivers': {
    id: 'frameworks-drivers',
    name: 'Frameworks & Drivers',
    colorHex: '#207FD4', // brand-blue
    description:
      'The outermost layer. Contains frameworks, tools, databases, and UI. Nothing in this layer should be known by inner layers.',
  },
}

// ── Components ───────────────────────────────────────────────
export const CA_COMPONENTS: CAComponent[] = [
  {
    id: 'view',
    name: 'View',
    layer: 'frameworks-drivers',
    description:
      'Displays information and reacts to user interaction.',
    dependsOn: [
      { id: 'view-model', reason: 'Reads display data from the ViewModel. When the ViewModel updates, it alerts the View to re-render.' },
      { id: 'controller', reason: 'Calls the Controller when the user does something, depending on it to fulfil the request.' },
    ],
    implements: [],
  },
  {
    id: 'data-access',
    name: 'Data Access',
    layer: 'frameworks-drivers',
    description:
      'Reads and writes persistent data to a file or database outside the program.',
    dependsOn: [
      { id: 'database', reason: 'Talks directly to the underlying data store to read and write records.' },
    ],
    implements: [
      { id: 'data-access-interface', reason: 'Gets the concrete structure on how the database will be accessed and fills in that logic.' },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    layer: 'frameworks-drivers',
    description:
      'The actual data store. An external detail that every inner layer is completely unaware of.',
    dependsOn: [],
    implements: [],
  },
  {
    id: 'controller',
    name: 'Controller',
    layer: 'interface-adapters',
    description:
      'Converts raw user data into usable pieces, creating an Input Data object of that information.',
    dependsOn: [
      { id: 'input-data', reason: 'Creates and populates an Input Data object to pass to the Use Case.' },
      { id: 'input-boundary', reason: 'Calls its methods to trigger Use Case logic.' },
    ],
    implements: [],
  },
  {
    id: 'presenter',
    name: 'Presenter',
    layer: 'interface-adapters',
    description:
      'Receives the Output Data object from the Use Case and converts it into readable strings and values to be displayed.',
    dependsOn: [
      { id: 'output-data', reason: 'Receives the Output Data object produced by the Use Case and reads its values.' },
      { id: 'view-model', reason: 'Updates the ViewModel with formatted strings and values to be displayed.' },
    ],
    implements: [
      { id: 'output-boundary', reason: 'Fills in the formatting logic defined by the Output Boundary.' },
    ],
  },
  {
    id: 'view-model',
    name: 'View Model',
    layer: 'interface-adapters',
    description:
      'A storage class for information the View will display. Any piece of information shown on screen is stored here. Populated by the Presenter and read by the View — no logic.',
    dependsOn: [],
    implements: [],
  },
  {
    id: 'use-case-interactor',
    name: 'Use Case Interactor',
    layer: 'application-business-rules',
    description:
      'Contains the main logic for executing a specific use case.',
    dependsOn: [
      { id: 'input-data', reason: 'Uses the Input Data to execute the use case.' },
      { id: 'output-boundary', reason: 'Calls its methods to push results out to the Presenter.' },
      { id: 'output-data', reason: 'Packages the result of the use case into an Output Data object.' },
      { id: 'data-access-interface', reason: 'Uses it to look up or store information in the database.' },
      { id: 'entities', reason: 'Operates on Entities to carry out business logic.' },
    ],
    implements: [
      { id: 'input-boundary', reason: 'Executes what the Controller called into via the Input Boundary.' },
    ],
  },
  {
    id: 'input-boundary',
    name: 'Input Boundary',
    layer: 'application-business-rules',
    description:
      'An interface implemented by the Use Case Interactor. Gives the Controller a decoupled way to trigger business logic without depending on the concrete Interactor class.',
    dependsOn: [],
    implements: [],
  },
  {
    id: 'input-data',
    name: 'Input Data',
    layer: 'application-business-rules',
    description:
      'An object created by the Controller and passed to the Use Case Interactor. Carries the request in the most optimal format for the Interactor. Contains no behaviour.',
    dependsOn: [],
    implements: [],
  },
  {
    id: 'output-boundary',
    name: 'Output Boundary',
    layer: 'application-business-rules',
    description:
      'An interface implemented by the Presenter. Gives the Use Case Interactor a way to send results outward without depending on a concrete Presenter class.',
    dependsOn: [],
    implements: [],
  },
  {
    id: 'output-data',
    name: 'Output Data',
    layer: 'application-business-rules',
    description:
      'An object created by the Use Case Interactor that packages the result of the use case. Passed to the Presenter through the Output Boundary. Contains no behaviour.',
    dependsOn: [],
    implements: [],
  },
  {
    id: 'data-access-interface',
    name: 'Data Access Interface',
    layer: 'application-business-rules',
    description:
      'An interface implemented by the Data Access class. Gives the Use Case Interactor a decoupled way to store and retrieve data without knowing anything about the underlying database.',
    dependsOn: [],
    implements: [],
  },
  {
    id: 'entities',
    name: 'Entities',
    layer: 'enterprise-business-rules',
    description:
      'Classes that store information about the core building blocks of the program and enforce its highest-level policies. For example, a car rental app might have a Car class and a Renter class. The most stable part of the system — no knowledge of outer layers.',
    dependsOn: [],
    implements: [],
  },
]


// export const CA_COMPONENTS: CAComponent[] = [
//   {
//     id: 'controller',
//     name: 'Controller',
//     layer: 'interface-adapters',
//     description:
//       'Accepts input from the user or external system, packages it into Input Data, and calls the Use Case via the Input Boundary interface.',
//     dependsOn: ['input-boundary', 'input-data'],
//     implements: [],
//   },
//   {
//     id: 'presenter',
//     name: 'Presenter',
//     layer: 'interface-adapters',
//     description:
//       'Receives Output Data from the Use Case and formats it into a View Model the View can render. Implements the Output Boundary interface.',
//     dependsOn: ['output-data', 'view-model'],
//     implements: ['output-boundary'],
//   },
//   {
//     id: 'view-model',
//     name: 'View Model',
//     layer: 'interface-adapters',
//     description:
//       'A simple data structure populated by the Presenter and read by the View. Contains only display-ready values — no logic.',
//     dependsOn: [],
//     implements: [],
//   },
//   {
//     id: 'input-boundary',
//     name: 'Input Boundary',
//     layer: 'application-business-rules',
//     description:
//       'An interface (not a class) that defines how the Controller can call into the Use Case. Keeps the Controller decoupled from the concrete Interactor.',
//     dependsOn: [],
//     implements: [],
//   },
//   {
//     id: 'input-data',
//     name: 'Input Data',
//     layer: 'application-business-rules',
//     description:
//       'A plain data structure (DTO) that carries the request from the Controller to the Use Case Interactor. Contains no behaviour.',
//     dependsOn: [],
//     implements: [],
//   },
//   {
//     id: 'use-case-interactor',
//     name: 'Use Case Interactor',
//     layer: 'application-business-rules',
//     description:
//       'The core application logic. Implements the Input Boundary, operates on Entities, and calls the Output Boundary to return results.',
//     dependsOn: ['entities', 'output-boundary', 'data-access-interface', 'output-data'],
//     implements: ['input-boundary'],
//   },
//   {
//     id: 'output-boundary',
//     name: 'Output Boundary',
//     layer: 'application-business-rules',
//     description:
//       'An interface that defines how the Use Case sends its output to the Presenter without depending on the Presenter directly.',
//     dependsOn: [],
//     implements: [],
//   },
//   {
//     id: 'output-data',
//     name: 'Output Data',
//     layer: 'application-business-rules',
//     description:
//       'A plain data structure (DTO) carrying the result from the Use Case to the Presenter. Contains no behaviour.',
//     dependsOn: [],
//     implements: [],
//   },
//   {
//     id: 'data-access-interface',
//     name: 'Data Access Interface',
//     layer: 'application-business-rules',
//     description:
//       'An interface defining how the Use Case retrieves and stores data. The Use Case depends on this interface, not on any concrete database class.',
//     dependsOn: [],
//     implements: [],
//   },
//   {
//     id: 'entities',
//     name: 'Entities',
//     layer: 'enterprise-business-rules',
//     description:
//       'Business objects that encapsulate enterprise-wide rules. They are the most stable part of the system and have no knowledge of outer layers.',
//     dependsOn: [],
//     implements: [],
//   },
//   {
//     id: 'view',
//     name: 'View',
//     layer: 'frameworks-drivers',
//     description:
//       'The UI layer. Reads from the View Model and renders the interface. It is a detail — the business rules do not know it exists.',
//     dependsOn: ['view-model'],
//     implements: [],
//   },
//   {
//     id: 'data-access',
//     name: 'Data Access',
//     layer: 'frameworks-drivers',
//     description:
//       'The concrete implementation of the Data Access Interface. Knows how to talk to the database, but the Use Case only ever sees the interface.',
//     dependsOn: ['database'],
//     implements: ['data-access-interface'],
//   },
//   {
//     id: 'database',
//     name: 'Database',
//     layer: 'frameworks-drivers',
//     description:
//       'The actual data store. An external detail that every inner layer is completely unaware of.',
//     dependsOn: [],
//     implements: [],
//   },
// ]
