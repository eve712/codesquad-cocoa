## 📌 Parsing
언어학에서 파싱(parsing)은 '구문 분석'이라고 부른다. 문장을 구성 성분으로 분해하고 그들 사이의 위계 관계를 분석해 문장 구조를 결정하는 것. CS에서는 **일련의 문자열을 의미있는 토큰 단위로 분해하고 이를 parse tree로 변환하는 과정**을 말한다.

<br>
파서(Parser)는 이러한 파싱을 수행하는 프로그램. 세부적으로 나눈다면,

1. tokenizer
2. lexer
3. parser

![parsing](https://jsnow.netlify.app/static/61f172259a28777c1db7c766d6354072/1d69c/parser.png)

**tokenizer**는 input을 알맞은 토큰 단위로 나눠주고, <br>
**lexer**는 나눠진 토큰들을 분석해 문맥적 의미를 부여한다. <br> 
**parser**는 분석된 token들을 문법적으로 검사하고, parse tree로 만들어준다.

<br>
<br>

## 📌 구조 분해 할당
- 구조 분해 할당(destructuring). 비구조화라고도 함.
- 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 표현식.
- 객체나 배열을 분해한다고 생각하면 쉬움.
```javascript
let a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20 , 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

({a, b} = {a: 10, b: 20});
console.log(a); // 10
console.log(b); // 20

({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}

let x = [1, 2, 3, 4, 5];
let [y, z] = x;
console.log(y); // 1
console.log(z); // 2
```
```javascript
// 기본 변수 할당
let foo = ["one", "two", "three"];

let [one, two, three] = foo;
console.log(one); //"one"
console.log(two); //"two"
console.log(three); //"three"

// 기본값 할당
let a, b;
[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7

// 일부 반환 값 무시하기
function f() {
    return [1, 2, 3];
}
let [a, , b] = f();
console.log(a); // 1
console.log(b); // 3
```
```javascript
// youns 코드에서.
const [LEFT_BRACKET, RIGHT_BRACKET, COMMA, BLANK] = ["[", "]", ",", " "]
```

<br>

---

### 참고 출처
parsing - <https://jsnow.netlify.app/posts/array-parser> <br>
destructuring - <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment>