{
  const { values } = options;
  const asExprMacro = exp => values => peg$parse(exp, { startRule: 'expression', values })
}

root = e:(interpolation / noOpenBrace)* { return e.join('') }
noOpenBrace = $[^{]+

// Pipe operator
expression = (left:joinOp _ PIPE_RIGHT _ right:expression { return right(left) })
  / joinOp
// Join operator
joinOp = (left:mapOp _ JOIN _ right:expression { return left?.join?.(right) ?? left })
  / mapOp
// Map operator
mapOp = (target:name _ MAP _ exp:$expression { return target.map(asExprMacro(exp)) })
  / pipeLeft
// Pipe inverse operator
pipeLeft = (left:atom _ PIPE_LEFT _ right:expression { return left(right) })
  / atom
// Simple atom
atom = name / string / number / objectBuild / '(' @expression ')'

// String
string = '"' e:(interpolation / noQuote)* '"' { return e.join('') }
noQuote = $[^"{]+
interpolation = '{' _ @expression _  '}'

// Build object literal
objectBuild = OPEN_BURGER _ pairs:pairedComma _ CLOSE_BURGER
  { return pairs.reduce((o, p) => {
    o[p.key] = p.value
    return o
  }, {}) }
pairedComma = h:(@pair _ "," _)* t:pair { return [ ...h, t ] }
pair = key:string _ ":" _ value:expression { return { key, value } }

// Identifier
name = name:$([_A-Za-z][_A-Za-z0-9]*) { return values[name] }
number = val:$([0-9]+('.' [0-9]+)?) { return Number(val) }

DOLLAR = "$"
PIPE_RIGHT = "->"
PIPE_LEFT = "<-"
MAP = ">>="
JOIN = "+>"
OPEN_BURGER = "(|"
CLOSE_BURGER = "|)"

__ = [\n\r \t]+
_ = __?
