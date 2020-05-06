# 노드 5장 정리
### 1. npm?
노드 모듈을 패키지화하여 관리할 수 있는 프로그램이다. 저장소 및 CLI를 제공한다.  
### 2. pakage.json으로 패키지 관리하기
설치한 패키지의 버전을 관리할 수 있다.  
`npm init -y` 명령어를 통해 pakage.json 파일을 생성한다.  
`npm install express` 명령어를 통해 모듈(패키지)를 설치할 수 있다. 
설치 시 node_modules 폴더도 생긴다. 설치한 패키지와 그 패키지가 의존하는 패키지가 함께 들어 있으며, npm으로 패키지를 설치, 수정 삭제할 때마다 내부 의존 관계를 package-lock.json 파일에 저장한다.  
`npm install -D nodemon` 명령어를 통해 개발용 패키지를 설치할 수 있다.  
`npm install -g rimraf` 명령어를 통해 전역으로 설치 할 수 있다. pakage.json에 기록되지 않는다.  
`npx` 명령어를 통해 전역설치와 같이 해당 모듈을 실행할 수 있다. (전역설치는 package.json에 기록되지 않아 재 설치에 어려움이 있음)  
*pakage.json*
  ```
  {
    "name": "test", // 패키지 이름
    "version": "1.0.0", // 패키지 버전
    "description": "", // 패키지 설명
    "main": "index.js", // entry point 자바스크립트 실행 진입점
    "dependencies": { // 해당 패키지가 의존하는 패키지들의 이름과 버전
      "express": "^4.16.3"
    },
    "devDependencies": { // 개발용 의존 패키지
      "nodemon": "^1.17.3"
    }, 
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [], // 패키지 키워드
    "author": "", // 패키지 작성자
    "license": "MIT" // 라이센스
  }
  ```
### 3. 패키지 버전
`^4.16.3`
- `4`: 첫 번째 자리는 major 버전이다. 하위 호환이 안 될 정도로 패키지의 내용이 수정되었을 때 업데이트한다.
- `16`: 두 번째 자리는 minor 버전이다. 하위 호환이 가능한 기능 업데이트 시 올린다. 
- `3`: 마지막 자리는 patch 버전이다. 새로운 기능이 추가되었다기보다 기존 기능의 수정 시 업데이트한다.
- `^(캐럿)`: 정식버전에서 마이너와 패치 버전을 변경한다. `^4.16.3`표기는 4.16.3부터 5.0.0미만까지 포함한다. 보통 하위 호환성 유지를 위해 많이 사용된다.
- `~(틸드)`: 마이너 버전이 명시되어 있으면 패치버전을 변경한다. `~4.16.3`표기는 4.16.3부터 4.17.0미만까지 포함한다.
- `@latest`: 항상 최신 버전의 패키지를 설치한다.
### 4. 기타 npm 명령어
- `npm outdated`: 업데이트할 수 있는 패키지 확인
- `npm uninstall | rm <package>`: 패키지 제거
- `npm search <검색어 | keyword>`: 패키지 검색
- `npm info <package>`: 패키지의 세부 정보 보기
- `npm adduser`: npm 로그인을 위한 명령어 패키지 배포시 필요하다.
- `npm publish`: 자신의 패키지 배포
- `npm unpublish`: 배포한 패키지 제거 24시간 이내에만 가능하다.

