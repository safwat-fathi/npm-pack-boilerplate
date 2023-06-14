import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";
import postcssModules from "postcss-modules";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";

const pkg = require("./package.json");

const cssExportMap = {};

/** @type {import('rollup').RollupOptions;} */
export default [
  {
    // preserveModules: true,
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        name: "newpack",
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve(),
      commonjs(),
      postcss(),
      // postcss({
      //   plugins: [autoprefixer(), postcssPresetEnv()],
      //   // use: {
      //   //   sass,
      //   // },
      //   minimize: true,
      //   sourceMap: true,
      //   // extract: true,
      //   modules: true,
      // }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      babel({ extensions: [".tsx", ".ts"] }),
      // scss({
      //   processor: () => postcss([autoprefixer(), postcssPresetEnv()]),
      //   output: "./lib/index.css",
      //   failOnError: true,
      //   sass: require("node-sass"),
      //   outputStyle: "compressed",
      // }),
      image(),
      // postcss({
      //   extract: false,
      //   modules: true,
      //   use: ["sass"],
      // }),
      terser({ compress: true }),
    ],
    external: ["react", "react-dom"],
  },
  // {
  //   input: "lib/esm/types/index.d.ts",
  //   output: [{ file: "lib/index.d.ts", format: "esm" }],
  //   external: [/\.css$/],
  //   plugins: [dts()],
  // },
  {
    input: "src/index.ts",
    output: [{ file: "lib/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
    external: [/\.css$/, /\.scss$/],
  },
];
