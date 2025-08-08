import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

interface AdjustableGridProps {
  children: React.ReactNode[];
  className?: string;
  rowHeight?: number;
  cols?: { [key: string]: number };
  initialLayout?: GridItem[];
}

const AdjustableGrid: React.FC<AdjustableGridProps> = ({
  children,
  className = '',
  rowHeight = 100,
  cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout
}) => {
  // Generate default layout if not provided
  const generateLayout = (): GridItem[] => {
    const childArray = React.Children.toArray(children);
    return childArray.map((_child, index) => ({
      i: index.toString(),
      x: (index % 4) * 3,
      y: Math.floor(index / 4),
      w: 3,
      h: 2,
      minW: 2,
      minH: 1
    }));
  };

  const [layouts, setLayouts] = useState<{ [key: string]: GridItem[] }>({
    lg: initialLayout || generateLayout()
  });

  const onLayoutChange = (currentLayout: GridItem[], allLayouts: { [key: string]: GridItem[] }) => {
    setLayouts(allLayouts);
  };

  return (
    <div className={`adjustable-grid ${className}`}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={cols}
        rowHeight={rowHeight}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index.toString()} className="grid-item">
            {child}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default AdjustableGrid;
