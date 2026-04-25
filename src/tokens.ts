/**
 * Defines the vocabulary and structure of lexical tokens used in the Quake map format.
 * @module
 */

/**
 * Represents the specific categories of characters or text chunks found in a map file.
 */
export enum TokenType {
    /** Left Curly Brace `{` used to open entities and brushes. */
    BeginBlock = "{",
    /** Right Curly Brace `}` used to close entities and brushes. */
    EndBlock = "}",
    /** Left Parenthesis `(` used to open a 3D coordinate. */
    BeginParen = "(",
    /** Right Parenthesis `)` used to close a 3D coordinate. */
    EndParen = ")",
    /** Left Bracket `[` used in Valve 220 format for UV axes. */
    BeginBracket = "[",
    /** Right Bracket `]` used in Valve 220 format for UV axes. */
    EndBracket = "]",
    /** A generic string of characters (e.g., numbers, texture names, entity keys). */
    Value = "VALUE",
    /** End of File indicator. */
    EOF = "EOF",
}

/**
 * A single lexical unit extracted from the raw source code by the Scanner.
 */
export interface Token {
    /** The categorical type of the token. */
  type: TokenType;
  /** The exact string text of the token as it appeared in the file. */
  lexeme: string;
  /** The line number where this token was found (useful for error reporting). */
  line: number;
}