# Lexical Scope

The existence of some types of `scope` depends to a greater extent on the depth in which the variable is found, that is, each variable and function can have an execution context determined by the writing and interpretation of the code.

## Nested Scope

When we talk about scope nesting we can say that it depends a lot on the hierarchy in which the statements will be executed and additionally on the level of depth in the execution stack where they will be executed in an orderly way.

### Lookup Failures

Depending on whether the code is executed under the strict criteria or not, it may result in an error when accessing a reference that is not identified.

Suppose a variable is a `source` that is not resolved, it may be identified as undeclared, which would cause a reference error (`ReferenceError`). But if it is a `target` from the moment the code is executed, the `ReferenceError` error will be thrown.
