// eslint.config.mjs

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // Base ESLint config (এখানে [] না, সরাসরি object হিসেবে পুশ করো)
  eslint.configs.recommended,

  // TypeScript configs (এগুলো array, তাই spread করা যাবে)
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // Custom rules
  {
    rules: {
      'no-console': 'warn',
    },
  },
];
