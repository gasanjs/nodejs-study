# 노드 6장 정리  
### 0. 익스프레스 설치  
`express-generator`를 이용하여 자동 설치할 수 있다.  

### 1. 익스프레스 구조  
- **bin/www**  
    http 모듈에 express 모듈을 연결하고, 포트를 지정하는 부분.  
    #!/usr/bin/env node 내용이 첫 줄에 달려 있으며, www 파일을 콘솔 명령어로 만들 수 있다.  
- **app.js**  
express 프레임워크 + 미들웨어를 이용하여 클라이언트 요청을 받아 처리(라우팅 or 에러)한다.  

### 2. 미들웨어  
요청과 응답의 중간에 위치하여 작업한다. 익스프레스 모듈과 조합되어 견고한 서버를 구현할 수 있다.  
미들웨어는 주로 app.use 메서드의 인자로 주입하며, 작성 순서에 맞게 순차적으로 거치며 처리된다.  
- **커스텀 미들웨어 만들기 ^^**  
    ```
    app.use(function(req, res, next) {
        console.log(req.url, 'Custom Middleware');
        next();
    });
    ```  
    use 메서드의 첫 번째 인자는 함수로 req, res, next 세개의 인자를 받는다. res와 req는 request의 정보와 response의 정보를 담고 있는 모듈객체이며 next는 함수로 미들웨어 안에서 반드시 실행하여야 다음 미들웨어로 넘어간다.  
    next 함수의 인자를 달리하여 기능을 구분할 수 있다. 인자를 아무것도 넣지 않으면 단순 다음 미들웨어로 넘어가고, 인자로 route를 넣을 시 다음 라우터로, route외에 다른 값을 넣으면 바로 에러 핸들러로 이동한다.  
    에러 핸들러는 맨 첫 번째 인자로 err를 추가적으로 받을 수 있다. 이는 next 함수의 인자로 넣어준 값과 연결 된다.
- **morgan**  
    서버 구동 시 request에 대한 정보를 콘솔에 기록해주는 미들웨어.  
- **body-parser**  
    request의 body를 해석해주는 미들웨어. (4.16.0 버전 부터 익스프레스에 내장됨. 본문 형식이 Raw나 Text일 경우에는 별도로 추가 해주어야 한다.)  
    multipart/form-data 같은 폼을 통해 전송된 데이터는 해석하지 못한다.(다른 모듈 이용)  
- **cookie-parser**  
    request의 쿠키를 해석을 위한 미들웨어.  
- **static**  
    정적인 파일들을 제공을 위한 미들웨어. (익스프레스 4 버전에서 내장됨.) 요청에 부합하는 정적 파일을 발견한 경우 응답으로 해당 파일을 전송하며, 파일을 찾지 못했을 경우 라우터로 넘긴다. 따라서 불필요한 미들웨어 작업을 제거하기 위해 morgat, json, cookie 미들웨어 보다 상단에 위치하는 것이 좋다.  
    ```
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname,'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    ```
- **express-session**
    세션 관리를 위한 미들웨어.  
- **connect-flash**  
    일회성 메시지들을 처리위한 미들웨어.  

### 3. Router 객체  
express를 사용하는 이유 중 하나가 라우팅을 깔끔하게 관리할 수 있다는 점 때문이다.   
다른 미들웨어와는 다르게 첫 번째 인자로 주소를 받아서 특정 주소에 해당하는 요청이 왔을 때만 동작한다. use 대신 HTTP 메서드를 사용할 수 있으며 use 처럼 router 하나에 미들웨어 여러개를 장착할 수 있다.(next('route') 실행 시 연결 된 나머지 미들웨어를 건너뛸 수 있다.) 보통 routes 디렉터리를 만들어 라우팅 파일을 분리하며 HTTP메서드로 사용 시 주소 뿐만 아니라 HTTP 메서드까지 일치하는 요청일 때만 실행한다.  
라우터에서는 반드시 요청에 대한 응답을 보내거나 에러 핸들러로 요청을 넘겨야 한다.  
```
// 응답
res.send(버퍼 또는 문자열 또는 HTML 또는 JSON) // 만능 응답
res.sendFile(파일 경로); // 파일 응답
res.json(JSON 데이터); // json 데이터 응답
res.redirect(주소); // 다른 라우터로 응답 변경
res.render('템플릿 파일 경로', { 변수 }); // 템플릿 엔진 랜더

// HTTP 상태 코드 응답
res.status(404).send('Not Found')
```

`/users/123?limit=5&skip=10` 주소의 요청을 아래와 같은 라우터로 매칭할 수 있다.
```
router.get('/users/:id', function(req, res) {
  console.log(req.params, req.query); // { id:'123' } { limit:'5', skip:'10' }
});
```
라우트의 파라미터를 읽는 패턴을 사용할 때 일반 라우터보다 반드시 뒤에 위치하여야 한다.  
요청에 일치하는 라우터가 없을 경우 404 코드를 에러 핸들러로 전송하는 미들웨어가 실행된다.  

### 4. 템플릿 엔진  
자바스크립트를 이용하여 HTML을 랜더링 할 수 있게 해준다. 대표적으로 pug와 jade가 있다.  
해당 템플릿의 문법은 책 내용 참고...  

### 5. 에러 처리 미들웨어  
에러 처리 핸들러는 error라는 템플릿 파일을 랜더링 하며, res.locals 속성에 값을 대입하여 템플릿 엔진에 변수를 주입할 수 있다.  
error 객체는 시스템 환경이 development인 경우에만 표시되며 req.app.get(키)를 이용하여 익스프레스에 설정하였던 정보를 가져올 수 있다. 