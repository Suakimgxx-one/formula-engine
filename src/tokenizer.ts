type Token = { type: string; value: string };

function isDigit(c: string): boolean {
  return c >= "0" && c <= "9";
}

function isLetter(c: string): boolean {
  return (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
}

function tokenize(input: string): Token[] {
  {
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
      const char = input[i];

      if (char === " ") {
        i++;
        continue;
      }

      if (isDigit(char)) {
        let num = "";
        let seenDot = false;
        while (i < input.length && (isDigit(input[i]) || input[i] === ".")) {
          if (input[i] == ".") {
            if (seenDot) {
              throw new Error(`Unexpected character "." at position ${i}`);
            }
            seenDot = true;
          }
          num += input[i];
          i++;
        }
        tokens.push({ type: "NUMBER", value: num });
        continue;
      }

      if (char === "+") {
        tokens.push({ type: "PLUS", value: char });
        i++;
        continue;
      }
      if (char === "-") {
        tokens.push({ type: "MINUS", value: char });
        i++;
        continue;
      }

      if (char === "*") {
        tokens.push({ type: "STAR", value: char });
        i++;
        continue;
      }

      if (char === "/") {
        tokens.push({ type: "SLASH", value: char });
        i++;
        continue;
      }

      if (char === "(") {
        tokens.push({ type: "LPAREN", value: char });
        i++;
        continue;
      }

      if (char === ")") {
        tokens.push({ type: "RPAREN", value: char });
        i++;
        continue;
      }

      if (char === ",") {
        tokens.push({ type: "COMMA", value: char });
        i++;
        continue;
      }

      if (char === ":") {
        tokens.push({ type: "COLON", value: char });
        i++;
        continue;
      }

      if (char === ")") {
        tokens.push({ type: "RPAREN", value: char });
        i++;
        continue;
      }

      if (isLetter(char)) {
        let letters = "";
        let digits = "";

        while (i < input.length && isLetter(input[i])) {
          letters += input[i];
          i++;
        }

        while (i < input.length && isDigit(input[i])) {
          digits += input[i];
          i++;
        }

        const word = (letters + digits).toUpperCase();

        if (input[i] === "(") {
          tokens.push({ type: "FUNC_NAME", value: word });
        } else if (word === "TRUE" || word === "FALSE") {
          tokens.push({ type: "BOOLEAN", value: word });
        } else if (digits !== "") {
          tokens.push({ type: "CELL_REF", value: word });
        } else {
          throw new Error(
            `Unknown name "${word}" at position ${i - word.length}`,
          );
        }
        continue;
      }

      throw new Error(`Unexpected character "${char}" at position ${i}`);
    }
    return tokens;
  }
}

   console.log(tokenize("sum(a1:b2) + true"));
