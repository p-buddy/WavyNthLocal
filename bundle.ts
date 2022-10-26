import path from 'path';
import * as rollup from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import * as chokidar from "chokidar";
import glob from "glob";

export const bundle = async (rootDir: string = __dirname, entry: string = "index.ts") => {
  const plugins = [
    typescript({
      compilerOptions: {
        target: 'es2022',
      },
    }),
    terser(),
  ];

  const options: rollup.RollupOptions = {
    input: path.join(rootDir, entry),
    plugins,
  }

  const bundle = await rollup.rollup(options);

  const output: rollup.OutputOptions = {
    file: path.join(rootDir, 'bundle.js'),
    format: 'es',
    compact: true,
    sourcemap: false,
  }

  bundle.write(output);
};

const executedFiles: string[] = [];

const tsFiles = path.join(__dirname, '*.ts');

glob(tsFiles, (err, matches) => {
  if (err) console.error(err);
  executedFiles.push(...matches);
  bundle();
  chokidar.watch(tsFiles).on('all', (event, file) => {
    const fileName = path.basename(file);
    switch (event) {
      case "change":
        bundle();
        console.log(`Bundling after change to: ${file}`)
        return;
      case "add":
        if (executedFiles.includes(file)) return;
        bundle();
        console.log(`Bundling after adding: ${file}`)
        executedFiles.push(fileName);
        return;
    }
  });
});