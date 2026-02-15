import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/types/theme.types.ts'], // Entry points
    format: ['cjs', 'esm'], // CommonJS and ES Modules
    dts: true, // Generate declaration files
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: true, // Minify for production (~3kb requirement)
    external: ['react', 'react-dom'], // Treat as peer dependencies
});
