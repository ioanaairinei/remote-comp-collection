import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_comp_collection",
      filename: "remoteEntry.js",
      exposes: {
        "./KeyPressChecker": "./src/components/key-press-checker/KeyPressChecker",
        "./PriceSlider": "./src/components/price-slider/PriceSlider",
        "./TipCalculator": "./src/components/tip-calculator/TipCalculator"
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
