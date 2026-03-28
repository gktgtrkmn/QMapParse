export enum TokenType {
    BeginBlock = "{",
    EndBlock = "}",
    BeginParen = "(",
    EndParen = ")",
    BeginBracket = "[",
    EndBracket = "]",
    Value = "VALUE",
    EOF = "EOF",
}

export interface Token {
    type: TokenType;
    lexeme: string;
    line: number;
}