import styles from "./DiagramNode.module.css";

interface DiagramNodeProps {
  label: string;
  onClick: () => void;
}

enum NodeCategory {
  InterfaceAdapters = "Interface Adapters",
  ApplicationBusinessRules = "Application Business Rules",
  EnterpriseBusinessRules = "Enterprise Business Rules",
  FrameworksAndDrivers = "Frameworks & Drivers",
}

const titleToCategory: Record<string, NodeCategory> = {
  controller: NodeCategory.InterfaceAdapters,
  presenter: NodeCategory.InterfaceAdapters,
  "view model": NodeCategory.InterfaceAdapters,
  "input data": NodeCategory.ApplicationBusinessRules,
  "input boundary": NodeCategory.ApplicationBusinessRules,
  "use case interactor": NodeCategory.ApplicationBusinessRules,
  "output data": NodeCategory.ApplicationBusinessRules,
  "output boundary": NodeCategory.ApplicationBusinessRules,
  "data access interface": NodeCategory.ApplicationBusinessRules,
  entities: NodeCategory.EnterpriseBusinessRules,
  view: NodeCategory.FrameworksAndDrivers,
  "data access": NodeCategory.FrameworksAndDrivers,
  database: NodeCategory.FrameworksAndDrivers,
};

const categoryToColor: Record<NodeCategory, string> = {
  [NodeCategory.InterfaceAdapters]: "var(--color-brand-green)",
  [NodeCategory.ApplicationBusinessRules]: "var(--color-brand-pink)",
  [NodeCategory.EnterpriseBusinessRules]: "var(--color-brand-yellow)",
  [NodeCategory.FrameworksAndDrivers]: "var(--color-brand-blue)",
};

export const DiagramNode = ({ label, onClick }: DiagramNodeProps) => {
  const category = titleToCategory[label.toLowerCase()];
  if (!category) throw new Error(`DiagramNode: unknown label: "${label}"`);

  return (
    <svg
      width="160"
      height="40"
      viewBox="0 0 150 36"
      onClick={onClick}
      className={styles.node}
    >
      <rect
        width="100%"
        height="100%"
        rx="5"
        ry="5"
        fill={categoryToColor[category]}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className={`text-mono ${styles.nodeLabel}`}
      >
        {label}
      </text>
    </svg>
  );
};
