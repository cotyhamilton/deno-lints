import { assertEquals } from "@std/assert";
import plugin from "./mod.ts";

Deno.test("max-params", () => {
  const diagnostics = Deno.lint.runPlugin(
    plugin,
    "fake.ts",
    `
    // valid
    function validFunction1(a) {}
    function validFunction2(a, b) {}
    function validFunction3(a, b, c) {}
    function validEmptyParams() {}
    const validArrow = (a, b, c) => {};
    class ValidClass {
      validMethod(a, b, c) {}
    }
    const validObject = {
      validMethod(a, b, c) {},
      validProp: function(a, b, c) {}
    };
    // invalid
    function invalidFunction(a, b, c, d) {}
    const invalidArrow = (a, b, c, d) => {};
    class InvalidClass {
      invalidMethod(a, b, c, d) {}
    }
    const invalidObject = {
      invalidMethod(a, b, c, d) {},
      invalidProp: function(a, b, c, d) {}
    };
    `,
  );

  assertEquals(diagnostics.length, 5);
  const d = diagnostics[0];
  assertEquals(d.id, "lints/max-params");
  assertEquals(
    d.message,
    "Function has too many parameters. Maximum allowed is 3.",
  );
});
