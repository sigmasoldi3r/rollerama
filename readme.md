# Rollerama

A simple template language.

## Operators

### Pipe operator ->

The pipe operator `L -> R` takes the **L** element and passes it to the **R**
element. The **R** element must be a function.

```scala
// Example
"foo" -> b64
```

**Note:** Not using parenthesis on this operator will pass the functions, as opposed
to the intuition: `a -> b -> c` equivalent to `c(b)(a)` instead to `c(b(a))`. This is
a known [issue #1]().

### Inverse pipe operator <-

The inverse pipe operator `L <- R` is the same as the normal pipe operator, but the
function must be the **L** element.

```scala
// Example
b64 <- "foo"
```

**Note:** This operator has _less_ precedence than `->`, so the expression `a <- b -> c`
is equivalent to `(b -> c) -> a`.

### Map operator >>=

Map operator `L >>= R` takes an iterable element **L** and passes to the **R**
expression, where all the iterable elements are destructured and exposed to the
expression's ambient context.

The input data set:

```js
const data = [{ name: 'John' }, { name: 'Garfield' }, { name: 'Elsa' }]
```

The template:

```scala
// Example
data >>= "{} greets you!"
```

Evaluates to:

```json
["John greets you!", "Garfield greets you!", "Elsa greets you!"]
```

### Join operator +>

The join operator `L +> R` takes an iterable **R** element, and joins it
with the string passed to the **R** element.

Take a dataset like `[1, 2, 3]`, then:

```scala
// Example
data +> "/"
```

Will yield `1/2/3`.

## Literals

### String

Strings are denoted with double quotes `"string"`, and can interpolate
strings inside with curly braces like `{}`.

```scala
// Examples
"Hello world!"
"data = {data -> b64};"
```

### Hamburger

Hamburger operator are used to build objects, to later process them and
serialize to json.

```scala
// Example
(| "Hello": "World!" |) -> json
```

This yields `{"Hello":"World!"}`.

### Number

Numbers are like javascript ones.

## Builtin functions

### b64

### json

### jsonNice
