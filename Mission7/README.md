# 코드스쿼드 코코아 Mission6
## Checkpoint
1. 배열과 객체 call stack과 event queue의 관계를 잘 이해하자
2. 동기, 비동기의 차이를 이해
3. 비동기가 섞여 있을 때에도 디버깅을 잘 할 수 있다
   
## 📚공부할 것
1. 디바운스, 쓰로틀링
2. 콜스택, 콜백큐, 이벤트 루프
3. 멀티쓰레드와 비동기
4. forEach메서드
   - HTMLCollection❌ (getElementsByClassName)
   - nodeList⭕️ (querySelectorAll) (ie는 안 됨)
   

## 🤓Review
1. setTimeout은 콜백큐에 쌓이면 빠짐없이 무조건 실행(횟수 누락X)
2. setInterval은 누락 가능성이 있어 위험. 쓰지 말자!
    - → 실제로 잘 안 쓰고, setTimeout을 재귀로 해서 반복.
3. 싱글쓰레드니까 브라우저가 하는 일은 브라우저한테 보내고 JS는 자기 코드만 실행함.
    - DOM(event), AJAX(server), Timeout(timer)
4. 싱글쓰레드이지만 여러 가지 일을 대기하지 않고 비동기로 빠르게 해결.
5. BlockingX(계속 대기하지 않고 위임한다!) Non-Blocking = Asynchronous
   
