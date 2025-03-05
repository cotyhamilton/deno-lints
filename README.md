# deno lints

## install

Add plugin to your `deno.json` file

```json
{
  "lint": {
    "plugins": [
      "jsr:@cotyhamilton/deno-lints"
    ]
  }
}
```

## usage

Run `deno lint`

## rules

- max-params
  - ```ts
    // deno-lint: Function has too many parameters. Maximum allowed is 3.
    export function test(one, two, three, four) {}
    ```
