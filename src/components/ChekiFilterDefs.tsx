import React from "react";

export const getFilterId = (name: string) =>
  `metaneno.art-cheki-filter-${name}`;

const Filter: React.FC<{ id: string }> = ({ children, id }) => (
  <filter
    filterUnits="objectBoundingBox"
    id={getFilterId(id)}
    colorInterpolationFilters="sRGB"
  >
    {children}
  </filter>
);

// Reference: https://www.w3.org/TR/filter-effects-1/#sepiaEquivalent
const Sepia: React.FC<
  React.SVGProps<SVGFEColorMatrixElement> & {
    amount: number;
  }
> = ({ amount }) => (
  <feColorMatrix
    type="matrix"
    values={[
      `${0.393 + 0.607 * (1 - amount)} ${0.769 - 0.769 * (1 - amount)} ${
        0.189 - 0.189 * (1 - amount)
      } 0 0`,
      `${0.349 - 0.349 * (1 - amount)} ${0.686 + 0.314 * (1 - amount)} ${
        0.168 - 0.168 * (1 - amount)
      } 0 0`,
      `${0.272 - 0.272 * (1 - amount)} ${0.534 - 0.534 * (1 - amount)} ${
        0.131 + 0.869 * (1 - amount)
      } 0 0`,
      `0 0 0 1 0`,
    ].join(" ")}
  />
);

export const ChekiFilterDefs: React.FC = () => (
  <defs>
    <Filter id="1977">
      <Sepia amount={0.5} />
      <feColorMatrix type="hueRotate" values="330" result="flood2" />
      <feColorMatrix type="saturate" values="1.4" />
    </Filter>
  </defs>
);
