import React, { PropsWithChildren } from 'react';
import { Atoms } from '../../sprinkles.css';
import spacers from '../../themes/timbre/spacers';
import { composeWithAtoms, styleFor } from '../../utils/compose';
import {
  autoGridLGColumnsStyle,
  autoGridMDColumnsStyle,
  autoGridSMColumnsStyle,
  autoGridStyle,
  AutoGridVariants,
  autoGridXGuttersStyle,
  autoGridXLColumnsStyle,
  autoGridXSColumnsStyle,
  autoGridXXLColumnsStyle,
  autoGridYGuttersStyle,
} from './AutoGrid.css';

interface AutoGrid {
  atoms?: Atoms;
  columns?: ColumnsBreakpoints;
  equalHeight?: boolean;
  guttersX?: keyof typeof spacers;
  guttersY?: keyof typeof spacers;
  horizontalAlign?: AutoGridVariants['horizontalAlign'];
  verticalAlign?: AutoGridVariants['verticalAlign'];
}

const AutoGrid: React.FC<PropsWithChildren<AutoGrid>> = (props) => {
  const {
    atoms: atomicProperties,
    children,
    columns,
    equalHeight = false,
    guttersX = 4,
    guttersY = 4,
    horizontalAlign,
    verticalAlign,
  } = props;

  const classes = composeWithAtoms(
    atomicProperties,
    autoGridStyle({
      height: equalHeight ? 'equal' : undefined,
      horizontalAlign,
      verticalAlign,
    }),
    styleFor(autoGridXSColumnsStyle, columns?.xs),
    styleFor(autoGridSMColumnsStyle, columns?.sm),
    styleFor(autoGridMDColumnsStyle, columns?.md),
    styleFor(autoGridLGColumnsStyle, columns?.lg),
    styleFor(autoGridXLColumnsStyle, columns?.xl),
    styleFor(autoGridXXLColumnsStyle, columns?.xxl),
    autoGridXGuttersStyle[guttersX],
    autoGridYGuttersStyle[guttersY],
  );

  return <div className={classes}>{children}</div>;
};

export default AutoGrid;
