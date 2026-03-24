export enum TokenType {
    BeginBlock = "{",
    EndBlock = "}",
    BeginParen = "(",
    EndParen = ")",
    Value = "VALUE",
    EOF = "EOF",
}

export interface Token {
    type: TokenType;
    lexeme: string;
    line: number;
}