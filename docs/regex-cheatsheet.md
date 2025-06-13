# Regular Expression (RegExp) Cheat Sheet

## Basic Matchers

| Pattern | Description                          | Example | Matches      | Does Not Match      |
| ------- | ------------------------------------ | ------- | ------------ | ------------------- |
| `abc`   | Matches exact characters             | `"abc"` | "abc"        | "ABC", "ab", "abcd" |
| `.`     | Matches any character except newline | `"a.c"` | "abc", "a1c" | "ac", "abbc"        |
| `\`     | Escapes special characters           | `"\."`  | "."          | any other character |

## Anchors

| Pattern | Description          | Example     | Matches       | Does Not Match |
| ------- | -------------------- | ----------- | ------------- | -------------- |
| `^`     | Start of string/line | `"^hello"`  | "hello world" | "say hello"    |
| `$`     | End of string/line   | `"world$"`  | "hello world" | "world class"  |
| `\b`    | Word boundary        | `"\bcat\b"` | "the cat sat" | "category"     |

## Quantifiers

| Pattern | Description           | Example      | Matches             | Does Not Match  |
| ------- | --------------------- | ------------ | ------------------- | --------------- |
| `*`     | 0 or more             | `"ab*c"`     | "ac", "abc", "abbc" | "abx"           |
| `+`     | 1 or more             | `"ab+c"`     | "abc", "abbc"       | "ac"            |
| `?`     | 0 or 1                | `"ab?c"`     | "ac", "abc"         | "abbc"          |
| `{n}`   | Exactly n times       | `"ab{3}c"`   | "abbbc"             | "abc", "abbc"   |
| `{n,}`  | n or more times       | `"ab{2,}c"`  | "abbc", "abbbc"     | "ac", "abc"     |
| `{n,m}` | Between n and m times | `"ab{2,3}c"` | "abbc", "abbbc"     | "abc", "abbbbc" |

## Character Classes

| Pattern  | Description                  | Example      | Matches              | Does Not Match     |
| -------- | ---------------------------- | ------------ | -------------------- | ------------------ |
| `[abc]`  | Any character in the set     | `"[aeiou]"`  | "a", "e", "i"        | "b", "c"           |
| `[^abc]` | Any character not in the set | `"[^aeiou]"` | "b", "c"             | "a", "e"           |
| `[a-z]`  | Any character in the range   | `"[a-z]"`    | any lowercase letter | uppercase, numbers |
| `[A-Z]`  | Any uppercase in the range   | `"[A-Z]"`    | any uppercase letter | lowercase, numbers |
| `[0-9]`  | Any digit in the range       | `"[0-9]"`    | any digit            | letters            |

## Special Character Classes

| Pattern | Description                   | Example   | Matches              |
| ------- | ----------------------------- | --------- | -------------------- |
| `\d`    | Any digit `[0-9]`             | `"\d{3}"` | "123", "456"         |
| `\D`    | Any non-digit `[^0-9]`        | `"\D+"`   | "abc", "xyz"         |
| `\w`    | Word character `[A-Za-z0-9_]` | `"\w+"`   | "abc123", "test_123" |
| `\W`    | Non-word character            | `"\W+"`   | "!@#", " "           |
| `\s`    | Whitespace character          | `"\s+"`   | " ", "\t", "\n"      |
| `\S`    | Non-whitespace character      | `"\S+"`   | any non-whitespace   |

## Groups and References

| Pattern   | Description              | Example     | Matches                      |
| --------- | ------------------------ | ----------- | ---------------------------- |
| `(...)`   | Capturing group          | `"(ab)+"`   | "ab", "abab"                 |
| `(?:...)` | Non-capturing group      | `"(?:ab)+"` | same as above but not stored |
| `\1`      | Backreference to group 1 | `"(a)\1"`   | "aa"                         |

## Common Examples

### Email Validation

```javascript
/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
```

Matches: "user@domain.com", "test.user@sub.domain.co.uk"

### Phone Number (US)

```javascript
/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
```

Matches: "(123) 456-7890", "123.456.7890", "123-456-7890"

### Password Strength

```javascript
/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
```

Matches: At least 8 characters, at least one letter and one number

### URL

```javascript
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
```

Matches: "https://www.example.com", "domain.com", "sub.domain.co.uk/path"

## Testing in JavaScript

```javascript
// Testing a pattern
const pattern = /^B$/;
pattern.test("B"); // true
pattern.test("BB"); // false

// Using RegExp constructor
const dynamicPattern = new RegExp("^" + userInput + "$");

// Finding matches
const text = "The cat and the Cat";
const matches = text.match(/cat/gi); // ['cat', 'Cat']

// Replacing
const newText = text.replace(/cat/gi, "dog"); // "The dog and the dog"
```

## Tips

1. Always test your regex patterns with both matching and non-matching cases
2. Use regex testing tools like regex101.com for visual debugging
3. Start simple and build complexity gradually
4. Use non-capturing groups (?:...) when you don't need the matched content
5. Be careful with greedy quantifiers (_ and +) - use lazy versions (_? and +?) when needed
