import path from "path";
import JavaScript from "tree-sitter-javascript";
import TypeScript from "tree-sitter-typescript";
import Python from "tree-sitter-python";
import Java from "tree-sitter-java";
import Go from "tree-sitter-go";
import Rust from "tree-sitter-rust";

export const LANGUAGE_PARSERS = {
  javascript: JavaScript,
  typescript: TypeScript.typescript,
  tsx: TypeScript.tsx,
  python: Python,
  java: Java,
  go: Go,
  rust: Rust,
};

export const REPOSITORIES = {
  DEFAULT_PATH: path.join(process.cwd(), "clonedRepos"),
};

export const IGNORED_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  "coverage",
]);

export const SUPPORTED_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".go",
  ".rs",
]);

export const LANGUAGE_BY_EXTENSION = {
  ".js": "javascript",
  ".jsx": "javascript",
  ".ts": "typescript",
  ".tsx": "tsx",
  ".py": "python",
  ".java": "java",
  ".go": "go",
  ".rs": "rust",
};

export const LANGUAGE_CONFIG = {
  javascript: {
    functionNodes: ["function_declaration", "arrow_function"],

    classNodes: ["class_declaration"],

    getName: node => {
      const name = node.childForFieldName("name");

      if (name) {
        return name.text;
      }

      if (node.type === "arrow_function") {
        const parent = node.parent;

        if (parent?.type === "variable_declarator") {
          return parent.childForFieldName("name")?.text ?? null;
        }
      }

      return null;
    },
  },

  typescript: {
    functionNodes: ["function_declaration", "arrow_function"],

    classNodes: ["class_declaration"],

    getName: node => {
      const name = node.childForFieldName("name");

      if (name) {
        return name.text;
      }

      if (node.type === "arrow_function") {
        const parent = node.parent;

        if (parent?.type === "variable_declarator") {
          return parent.childForFieldName("name")?.text ?? null;
        }
      }

      return null;
    },
  },

  python: {
    functionNodes: ["function_definition"],

    classNodes: ["class_definition"],

    getName: node => {
      return node.childForFieldName("name")?.text ?? null;
    },
  },

  java: {
    functionNodes: ["method_declaration"],

    classNodes: ["class_declaration"],

    getName: node => {
      return node.childForFieldName("name")?.text ?? null;
    },
  },

  go: {
    functionNodes: ["function_declaration", "method_declaration"],

    classNodes: [],

    getName: node => {
      return node.childForFieldName("name")?.text ?? null;
    },
  },

  rust: {
    functionNodes: ["function_item"],

    classNodes: ["struct_item", "impl_item"],

    getName: node => {
      return node.childForFieldName("name")?.text ?? null;
    },
  },
  tsx: {
    functionNodes: ["function_declaration", "arrow_function"],
    classNodes: ["class_declaration"],

    getName: node => {
      const name = node.childForFieldName("name");

      if (name) {
        return name.text;
      }

      if (node.type === "arrow_function") {
        const parent = node.parent;

        if (parent?.type === "variable_declarator") {
          return parent.childForFieldName("name")?.text ?? null;
        }
      }

      return null;
    },
  },
};
