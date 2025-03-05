/**
 * Deno lint plugin
 *
 * - max-params
 */
const plugin: Deno.lint.Plugin = {
  name: "lints",
  rules: {
    "max-params": {
      create(context) {
        function checkParams(
          node:
            | Deno.lint.FunctionDeclaration
            | Deno.lint.ArrowFunctionExpression
            | Deno.lint.FunctionExpression,
        ) {
          if (node.params.length > 3) {
            context.report({
              node,
              message:
                "Function has too many parameters. Maximum allowed is 3.",
            });
          }
        }
        return {
          // Regular functions
          FunctionDeclaration: checkParams,
          // Arrow functions
          ArrowFunctionExpression: checkParams,
          // Class methods
          MethodDefinition(node) {
            if (node.value.type === "FunctionExpression") {
              checkParams(node.value);
            }
          },
          // Object methods
          Property(node) {
            if (
              node.value.type === "FunctionExpression"
            ) {
              checkParams(node.value);
            }
          },
        };
      },
    },
  },
};

export default plugin;
