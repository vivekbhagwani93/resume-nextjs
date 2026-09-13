import { atoms, Atoms } from '../sprinkles.css';

type Style = string | number;

/** Falsy entries are filtered out, so callers may pass optional styles. */
type OptionalStyle = Style | undefined | null | false;

type ColorTransform = (color: string) => string;

/**
 * Look up a style by a key that may be undefined (e.g. an optional prop or an
 * unset responsive breakpoint), without indexing the map with `undefined`.
 */
export const styleFor = <T extends Record<string, Style>>(
  styles: T,
  key: keyof T | undefined,
): T[keyof T] | undefined => (key === undefined ? undefined : styles[key]);

export const composeStyles = (...args: Array<OptionalStyle>) => {
  const classes: Array<Style> = [];

  args.forEach((arg) => {
    if (arg) {
      classes.push(arg);
    }
  });

  return classes.join(' ');
};

export const composeWithAtoms = (
  atomicProperties: Atoms | undefined,
  ...args: Array<OptionalStyle>
): string => {
  if (!atomicProperties) return composeStyles(...args);

  return composeStyles(...args, atoms(atomicProperties));
};

export const compose =
  (...functions: Array<ColorTransform>): ColorTransform =>
  (args: string) =>
    functions.reduceRight<string>((arg, fn) => fn(arg), args);
