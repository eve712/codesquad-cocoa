# 코드스쿼드 코코아 JS
## Mission
1. getArea함수를 사용해 다각형의 넓이 구하기.
2. printExecutionSequence 함수를 만들어 순서대로 호출 함수 출력하기.
3. printExecutionSequence 함수에서 함수 결과값까지 순서대로 같이 출력하기.
4. debugging 기술문서 정리하기
   + breakpoints란 
   + watch 사용법
   + call stack 의미
   + step over / step into / step out
  
## Checkpoint
1. Node.js를 통해서 JavaScript 개발을 할 수 있다.
2. 함수의 역할은 한 가지에 집중하고 있다.
3. 일관된 변수명과 함수이름을 짓고 있다.
4. 함수는 늘 동일한 입력값에 동일한 출력을 보장한다.
5. 개발과정에서 'breakpoint', 'debugger' 키워드를 사용해서 디버깅을 했다.

## 🤓Review
1. 전역변수 개수 줄이기 → 여러 개라면 객체를 만들어서 변수 만들기
2. 변수명, 함수명을 지을 때는 코드의 의도가 보이게
   - getRect()함수는 get 즉, 반환하는 값이 있다는 것으로 return하는 값이 있어야 한다.
3. var 키워드는 scope, hoisting의 문제로 사용하지 않고, let, const를 사용한다.
4. for문을 사용하지 말고, forEach를 사용한다.
