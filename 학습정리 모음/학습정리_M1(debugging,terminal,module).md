# ✏️Debugging
### breakpoint
breakpoint(중단점)은 JavaScript의 실행이 중단되는 코드 내 지점을 의미한다.
동작이 의심되는 곳에 breakpoint를 지정해 코드 실행을 확인한다.

### Watch
표현식을 평가하고 결과를 보여준다. Add Expression 버튼 +를 클릭해 원하는 표현식을 입력한 후 Enter를 누르면 중단 시점의 값을 보여준다.

### Call stack
코드를 해당 중단점으로 안내한 경로를 역순으로 표시한다. 호출된 함수가 실행된 순서대로 쌓이고, 가장 위에 쌓인 것부터 다시 해제되고 값을 return한다.

### Scope 
현재 정의된 모든 변수를 출력한다. Local은 함수의 지역변수를 보여준다. Global은 함수 바깥에 정의된 전역 변수를 보여준다. 

### 실행 추적
- Resume: 다음 breakpoint까지 실행. 추가 중단점이 없는 경우, 실행이 계속되고 디버거는 동작하지 얺는다. 
- Step over: 다음 명령어를 실행하되, 함수 안으로 들어가진 않음
- Step into: 함수 내부로 들어감
- Step out: 함수를 끝까지 실행시키고 호출시킨 곳으로 되돌아감

<br>
<br>

# ✏️Terminal
## Terminal 기본 명령어
```
$ pwd        
- (printing working directory)
  현재 디렉토리 경로 표시

$ ls 
- 현재 디렉토리 안에 있는 파일 목록

$ cd 경로
- 디렉토리 이동

$ mkdir 
- 폴더 생성

$ touch index.html = touch 파일명
- 파일 생성

$ cat 
- 파일 내용 보기
```
## git 명령어
1. git init
   - 현재 경로의 디렉토리를 git 저장소로 설정 및 초기화 해주는 명령어
   - mkdir로 폴더 만들고, cd로 해당 경로로 이동해서 git init 입력.
   - 정상적으로 실행되면 "initialized empty Git repository in (경로)"메시지와 함께 설정이 마무리 된다.

2. git add 파일명
   - git이 파일을 추적할 수 있도록 추가해주는 작업
   - add 해야 할 파일이 많은 경우, "git add --all"을 사용하면 추적되고있지 않은 모든 파일을 add 시킨다.
   - commit 전 add 필수

3. git commit -m "commit_description"
   - add 되어있는 상태의 파일을 저장소에 제출.

4. git status
   - 현재 git 저장소의 상태를 표시
   - 변경되었는데 add가 되어있지 않다면 붉은색 파일명, add는 되었으나 commit이 되어있지 않으면 녹색으로 표시한다.

5. git log
   - 현재까지 commit한 기록을 보여준다.
   - 각 커밋별로 사용자, 날짜 및 시간, 커밋 메시지를 보여준다.
   - git log --graph 명령어를 사용하면 커밋 과정에서 브랜치가 나뉘고, 다시 병합되는 과정을 그래프 형식으로 로그와 함께 표시해준다.

<br>

---
<br>
<br>

# ✏️node.js와 npm
## 모듈

 - 프로그램은 작고 단순한 것에서 크고 복잡한 것으로 진화한다. 이 과정에서 코드의 재활용성을 높이고, 유지보수를 쉽게 할 수 있는 다양한 기법들이 사용된다. **모듈은 프로그램을 구성하고 있는 수많은 로직들을 조각조각 나눈 부품같은 형태의 파일을 말하고, 이러한 기법을 모듈화라고 한다.**

   - 자주 사용되는 코드를 별도의 파일로 만들어서 필요할 때마다 재활용(함수처럼 재사용성을 높이는 것)
   - 코드를 개선하면 이를 사용하고 있는 모든 어플리케이션의 동작이 개선된다.
   - 코드 수정 시에 필요한 로직을 빠르게 찾을 수 있다.
   - 필요한 로직만을 로드해서 메모리의 낭비를 줄일 수 있다.
   - 한 번 다운로드된 모듈은 웹브라우저에 의해서 저장되기 때문에 동일한 로직을 로드할 때 시간과 네트워크 트래픽을 절약할 수 있다.(브라우저에서만 해당!)
  
<br>

 - 자바스크립트가 구동되는 호스트 환경에 따라서 서로 다른 모듈화 방법이 제공되고 있다. 사용하는 호스트환경에 따라 모듈화 방법에 대해 별도로 공부해야 한다. (Node.js 모듈 시스템은 CommonJS(동기), 브라우저 환경에 적합한 모듈 시스템은 AMD(비동기))  


<br>

## node.js로 모듈화하기

```javascript
// circle.js (로드될 대상)

var PI = Math.PI;

exports.area = function (r) {
    return PI * r * r;
};
exports.circumference = function (r) {
    return 2 * PI * r;
};
```
→ area와 circumference를 exports 객체의 메서드로 정의
```javascript
// demo.js (로드의 주체)

var circle = require('./circle.js');

console.log(
    'The area of a circle of radius 4 is ' + circle.area(4)
    );
```
→ require() 함수를 통해 circle.js 파일을 불러와 결과값을 변수 circle에 대입해 변수 circle을 통해 circle.js의 exports 객체에 추가한 속성이나 메서드를 사용할 수 있게 된다.

- 만들고자 하는 모듈을 파일로 만들고 exports 객체의 속성이나 메소드를 정의해주면 모듈을 만들어낼 수 있다. 그리고 만들어진 모듈을 전역함수 require()를 이용해 추출한다.
- require()함수로 외부 모듈을 불러올 수 있다. 인자값으로 가져오고자 하는 파일경로(src)를 넣어 변수에 담아서 사용한다.
- require()는 module.exports를 리턴한다.
- module.exports는 빈 object가 대입되어 있다.
- exports는 속성이나 메서드를 여러 개 정의할 수 있지만 module.exports는 하나만 정의할 수 있다. 파일자체를 속성이나 메서드로 사용하는 방식이다.(require()를 통해 변수에 대입하면 그 변수가 바로 함수로 사용된다.)

<br>

## npm
- npm은 자바스크립트 패키지(모듈) 저장소다. 누구나 npm에 자신이 만든 패키지를 공개할 수 있고, 공개된 패키지를 설치하여 사용할 수 있다. 패키지는 package.json이라는 설정 파일로 관리가 되는데, 패키지 이름, 라이센스 정보, 의존성 등 각종 메타 정보를 포함한다. npm-cli를 제공하여 커맨드 라인 명령어로 패키지를 관리할 수 있다.
- 모듈은 require('module')처럼 가져올 수 있는 파일, 디렉토리다. 모듈은 node_modules 하위에 위치하며 packages.json 파일을 포함한 모듈을 패키지라 부른다.
- node_modules: npm을 통해 설치된 파일은 모두 node_mudules 디렉터리 내에 저장된다.

- [ npm install ] : package.json 내용을 npm 저장소에서 받음. node_modules파일이 생김(의존 라이브러리) npm이 package.json에 명시된 dependencies 부분의 모듈들을 모두 설치해줌.
- [ npm init ]: package.json 생성, 의존성 라이브러리에 대한 정보를 관리

