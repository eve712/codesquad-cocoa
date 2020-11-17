# 코드스쿼드 코코아 Mission5
## Checkpoint
1. DOM 노드 탐색, 추가하는 API 다루기
2. Event listener 등록
3. 객체를 2개 이상 나누고 서로 연관지어 프로그램 구현
    - Model Class(todolist처리), View Class(화면 업데이트)

## 📚공부할 것
1. MVC패턴
2. Event bubbling, capturing
   - stopPropagation, preventDefault
3. Event Delegation(이벤트 위임)
4. this (클래스 내, 이벤트핸들러 내)
5. bind()메서드, binding 개념
6. HTML \<template>
7. 문자열에 template 리터럴로 HTML 만들어서 forEach, map
8. Local Storage
9. node vs element
10. destructuring으로 지정 객체만 받기
11. querySelectorAll vs getElementsByClassName
    - 반환값이 다르다는 차이(nodeList, HTMLCollection)


## 🤓Review
1. inline style 지정보다는 classList로 스타일 변경하기
2. 클래스 parameter를 잘 활용하도록
3. 이벤트 객체는 큰 객체이므로 필요한 것만 parameter로 받을 수 있도록.
4. 2개 이상 중복은 변수에 저장!
   
5. 설계하는 시간이 중요!!! 주석으로 정리하면서 하는 것도 좋음.
6. 시나리오 → feature 정리 → skeleton code(뼈대) 작성
7. 이벤트 객체 개발자 도구에서 확인 가능(Scope → Local)
8. 클래스 간 통신(의존성)을 낮춰주기 위한 방법들
   - 밖에서 DOM참조, constructor에 parameter로 전달 ( → DOM 의존성 낮아짐)
   - parameter로 함수 전달( → 함수 의존성 낮아짐)
   - 중재자 역할의 Mediater Class 생성
  