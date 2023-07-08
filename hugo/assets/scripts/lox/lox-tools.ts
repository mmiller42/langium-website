export interface LoxMessage {
    type: LoxMessageType;
    content: unknown;
};

export type LoxMessageType = "notification" | "output" | "error";


export const exampleCode = `// Data types
// Booleans
true;  // Not false.
false; // Not *not* false.

// Numbers
1234;  // An integer.
12.34; // A decimal number.

// Strings
"I am a string";
"";    // The empty string.
"123"; // This is a string, not a number.

// Nil
nil; // This is nil/null

// Expressions
// Arithmetics
var me = nil;
var add = 23 + 41;
var subtract = 13 - 4;
var multiply = 13 * 4;
var divide = 62 / 2;

var negateMe = -add;

// Comparison and equality
var less = add < subtract;
var more = multiply > divide;

var equality = add == subtract;
var inequality = multiply != divide;

// Unary logical operator
var isTrue = !false;
var isFalse = !true;

// Binary logical operator
var andTrue = isTrue and !isFalse;
var orFalse = !isTrue or isFalse;

// Precedence and grouping
var min = 14;
var max = 22;
var average = (min + max) / 2;

// Variables
// Can reassign an existing variable
min = 5;

// Printing
print average;

// Blocks
{
    print "This is a new block";
    var x = 15;
}
print "\`x\` isn't available in this scope";

// Control flow
// If branching
if (average > 5) {
    print "yes";
} else {
    print "no";
}

// While loops
var a = 1;
while (a < 10) {
    print a;
    a = a + 1;
}

// For loops
for (var i = 1; i < 10; i = i + 1) {
    print i;
}

// Functions
fun printSum(a: number, b: number): void {
    print a + b;
}

fun returnSum(a: number, b: number): number {
    return a + b;
}

// Closures

fun identity(a: (number, number) => number): (number, number) => number {
    return a;
}

print identity(returnSum)(1, 2); // prints "3";

fun outerFunction(): void {
    fun localFunction(): void {
        print "I'm local!";
    }
    localFunction();
}

fun returnFunction(): () => void {
    var outside = "outside";

    fun inner(): void {
        print outside;
    }

    return inner;
}

var fn = returnFunction();
fn();

// Classes WIP

class SuperClass {
    a: number
}

class SubClass < SuperClass {
    // Nested class
    nested: NestedClass
}

class NestedClass {
    field: string
    method(): string {
        return "execute this";
    }
}

// Constructor call
var x = SubClass();
// Assigning nil to a class type
var nilTest = SubClass();
nilTest = nil;

// Accessing members of a class
var value = x.nested.method() + "wasd";
print value;

// Accessing members of a super class
var superValue = x.a;
print superValue;

// Assigning a subclass to a super class
var superType: SuperClass = x;
print superType.a;
`;

export const syntaxHighlighting = {
    keywords: [
        'and','boolean','class','else','false','for','fun','if','nil','number','or','print','return','string','super','this','true','var','void','while'
    ],
    operators: [
        '-',',',';',':','!','!=','.','*','/','+','<','<=','=','==','=>','>','>='
    ],
    symbols:  /-|,|;|:|!|!=|\.|\(|\)|\{|\}|\*|\+|<|<=|=|==|=>|>|>=/,

    tokenizer: {
        initial: [
            { regex: /[_a-zA-Z][\w_]*/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"ID"} }} },
            { regex: /[0-9]+(\.[0-9]+)?/, action: {"token":"number"} },
            { regex: /"[^"]*"/, action: {"token":"string"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /\s+/, action: {"token":"white"} },
            { regex: /\/\*/, action: {"token":"comment","next":"@comment"} },
            { regex: /\/\/[^\n\r]*/, action: {"token":"comment"} },
        ],
        comment: [
            { regex: /[^\/\*]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[\/\*]/, action: {"token":"comment"} },
        ],
    }
};