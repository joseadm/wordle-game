import React from "react";

interface GridCellProps {
  value: string;
  feedback: string;
}

const GridCell: React.FC<GridCellProps> = ({ value, feedback }) => {
  return (
    <div data-testid="grid-cell" className={`grid-cell ${feedback}`}>
      {value}
    </div>
  );
};

export default React.memo(GridCell);
