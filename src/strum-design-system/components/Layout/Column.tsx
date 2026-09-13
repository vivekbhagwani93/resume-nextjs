import React, { PropsWithChildren } from 'react';
import { Atoms } from '../../sprinkles.css';
import { composeWithAtoms, styleFor } from '../../utils/compose';
import {
  columnStyle,
  lgColumnsStyle,
  mdColumnsStyle,
  smColumnsStyle,
  xlColumnsStyle,
  xsColumnsStyle,
  xxlColumnsStyle,
} from './Column.css';

interface Column {
  atoms?: Atoms;
  width?: ColumnsBreakpoints;
}

const Column: React.FC<PropsWithChildren<Column>> = (props) => {
  const { atoms: atomicProperties, children, width } = props;

  const classes = composeWithAtoms(
    atomicProperties,
    columnStyle,
    styleFor(xsColumnsStyle, width?.xs),
    styleFor(smColumnsStyle, width?.sm),
    styleFor(mdColumnsStyle, width?.md),
    styleFor(lgColumnsStyle, width?.lg),
    styleFor(xlColumnsStyle, width?.xl),
    styleFor(xxlColumnsStyle, width?.xxl),
  );

  return <div className={classes}>{children}</div>;
};

export default Column;
