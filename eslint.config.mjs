import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'coverage/**'],
  },
  ...nextCoreWebVitals,
  prettier,
];

export default eslintConfig;
