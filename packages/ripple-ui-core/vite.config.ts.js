// vite.config.ts
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-dts";

// src/vite.plugins.ts
import svgLoader from "vite-svg-loader";
var vite_plugins_default = [
  svgLoader({
    defaultImport: "raw",
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {}
          }
        },
        {
          name: "removeAttrs",
          params: {
            attrs: "(fill|stroke)"
          }
        },
        {
          name: "removeStyleElement",
          active: true
        },
        {
          name: "removeAttributesBySelector",
          params: {
            selector: "[style='fill:#*']",
            attributes: "style"
          }
        }
      ]
    }
  })
];

// vite.config.ts
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("/Users/dylankelly/Sites/ripple-next/packages/ripple-ui-core", "./src")
    }
  },
  plugins: [vue(), dts()].concat(vite_plugins_default),
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve("/Users/dylankelly/Sites/ripple-next/packages/ripple-ui-core", "src/index.ts"),
      name: "rpl",
      formats: ["es"],
      fileName: (f) => `rpl-lib.${f}.js`
    },
    sourcemap: false,
    target: "esnext",
    minify: false,
    rollupOptions: {
      external: ["vue"],
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3ZpdGUucGx1Z2lucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1kdHMnXG5pbXBvcnQgdml0ZVBsdWdpbnMgZnJvbSAnLi9zcmMvdml0ZS5wbHVnaW5zJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2J1aWxkLmh0bWwjbGlicmFyeS1tb2RlXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKFwiL1VzZXJzL2R5bGFua2VsbHkvU2l0ZXMvcmlwcGxlLW5leHQvcGFja2FnZXMvcmlwcGxlLXVpLWNvcmVcIiwgJy4vc3JjJylcbiAgICB9XG4gIH0sXG4gIHBsdWdpbnM6IFt2dWUoKSwgZHRzKCldLmNvbmNhdCh2aXRlUGx1Z2lucyksXG4gIGJ1aWxkOiB7XG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShcIi9Vc2Vycy9keWxhbmtlbGx5L1NpdGVzL3JpcHBsZS1uZXh0L3BhY2thZ2VzL3JpcHBsZS11aS1jb3JlXCIsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdycGwnLFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgICAgZmlsZU5hbWU6IChmKSA9PiBgcnBsLWxpYi4ke2Z9LmpzYFxuICAgIH0sXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAvLyBSZWR1Y2UgYmxvYXQgZnJvbSBsZWdhY3kgcG9seWZpbGxzLlxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgLy8gTGVhdmUgbWluaWZpY2F0aW9uIGZvciBub3cgd2hpbHN0IHdlIGFyZSBub24gcHJvZFxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgaW5saW5lRHluYW1pY0ltcG9ydHM6IHRydWUsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcbmV4cG9ydCBkZWZhdWx0IFtcbiAgc3ZnTG9hZGVyKHtcbiAgICBkZWZhdWx0SW1wb3J0OiAncmF3JyxcbiAgICBzdmdvQ29uZmlnOiB7XG4gICAgICBtdWx0aXBhc3M6IHRydWUsXG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncHJlc2V0LWRlZmF1bHQnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgb3ZlcnJpZGVzOiB7fVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdyZW1vdmVBdHRycycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBhdHRyczogJyhmaWxsfHN0cm9rZSknXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3JlbW92ZVN0eWxlRWxlbWVudCcsXG4gICAgICAgICAgYWN0aXZlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncmVtb3ZlQXR0cmlidXRlc0J5U2VsZWN0b3InLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBcIltzdHlsZT0nZmlsbDojKiddXCIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiAnc3R5bGUnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9KVxuXVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUNGQTtBQUNBLElBQU8sdUJBQVE7QUFBQSxFQUNiLFVBQVU7QUFBQSxJQUNSLGVBQWU7QUFBQSxJQUNmLFlBQVk7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsWUFDTixXQUFXLENBQUM7QUFBQSxVQUNkO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxZQUNOLE9BQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxRQUNWO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBRU4sUUFBUTtBQUFBLFlBQ04sVUFBVTtBQUFBLFlBQ1YsWUFBWTtBQUFBLFVBQ2Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FEM0JBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLCtEQUErRCxPQUFPO0FBQUEsSUFDMUY7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sb0JBQVc7QUFBQSxFQUMxQyxPQUFPO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSwrREFBK0QsY0FBYztBQUFBLE1BQ2pHLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxVQUFVLENBQUMsTUFBTSxXQUFXO0FBQUEsSUFDOUI7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUVYLFFBQVE7QUFBQSxJQUVSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ04sc0JBQXNCO0FBQUEsUUFDdEIsU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
