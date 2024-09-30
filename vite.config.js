import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      // 複数のエントリーポイントのディクショナリや配列にもできます
      entry: [
        resolve(__dirname, "src/core/cursor-magic.ts"),
        resolve(__dirname, "src/react/react-cursor-magic.tsx"),
      ],
      name: "CursorMagic",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
