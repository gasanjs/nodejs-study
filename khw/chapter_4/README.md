# 노드 4장
### 1. 요청과 응답 [my_first_node_server](./my_first_node_server)  
클라이언트에서 서버로 요청을 보내고 서버에서는 요청의 내용을 읽고 처리한뒤 클라이언트에게 응답을 보낸다.  
따라서 서버에는 요청을 받는 부분과 응답을 보내는 부분이 있어야 한다. 클라이언트로 부터 요청이 왔을 때 어떤 작업을 수행할 지 이벤트 리스너를 미리 등록하는데 이를 이벤트 방식으로 생각하자.  

```
  // http 모듈의 createServer 메서드를 사용한 예제.
  const http = require('http');
  const fs = require('fs');

  const server = http.createServer((req, res) => {

    /* 1 */
    res.write('<h1>Hello Node!</h1>'); // 클라이언트로 보낼 데이터
    res.end('<p>Hello Server</p>'); // 응답을 종료 후 데이터를 함께 보냄

    /* 2 */
    // fs 모듈로 html 파일을 읽어와 data 변수에 저장된 버퍼를 그대로 클라이언트에게 보낸다.
    fs.readFile('./server2.html', (err, data) => {
      if(err) {
        throw err;
      }
      res.end(data);
    });

  }).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기중입니다.')
  })

  /* 3 */
  // 서버에 listening 이벤트 리스터를 추가해도 동일하다.
  server.on('listening', () => {
    console.log('listening')
  })
```
현재 서버는 클라이언트가 누군지 모른 상태에서 모두에게 같은 응답을 보내고 있는데 이 부분을 개선해보자.

### 2. 쿠키와 세션 [my_cookie_and_session_server](./my_cookie_and_session_server)  
클라이언트의 구분을 위해 로그인(인증)을 구현하는데 함께 쿠키와 세션을 사용한다.  
서버는 클라이언트에 요청자를 추정할 만한 정보를 쿠키로 만들어 보내고, 클라이언트로부터 쿠키를 받아 요청자를 파악한다.  
쿠키는 요청과 응답의 헤더에 저장된다. `req.headers.cookie`로 서버에선 쿠키를 파악하고 `res.writeHead`메서드를 이용하여 클라이언트로 전달한다.  
쿠키를 이용한 로그인유지 방식은 매우 위험하다. 따라서 세션을 함께 사용한다. 세션은 서버에서 관리하며, 세션아이디를 쿠키에 심어 소통한다. 실제 배포용서버에선 세션을 변수에 저장하지 않고 보통 데이터 베이스에 저장한다. 자세한 내용은 6장에서 알아보자.

### 3. REST API와 라우팅 [my_restful_server](./my_restful_server)  
요청이 항상 html을 요구할 필요는 없다. 어떠한 동작이나 데이터를 요구할 수 있다. 요청들이 주소를 통해 들어오므로 서버가 이해하기 쉬운 주소를 사용하는 것이 좋다.  
- REST(REpresentational State Transfer)  
서버의 자원을 정의하고 자원에 대한 주소를 설계하는 방법을 가리킨다. 주소는 명사로 구성되며 HTTP 요청 메서드와 함께 사용한다. (GET, POST, PUT, DELETE...) 때문에 주소만 봐도 요청 내용을 유추할 수 있다.  

이렇게 REST로 서버의 자원을 가져오는 서버를 REST API 서버라 하며 RESTful 하다 표현한다. 서버를 분리하면 HTTP 프로토콜을 사용하여 클라이언트에 구애되지 않고, 추후 서버를 확장할 때 유리하다. 

### 4. https와 http2 
https 모듈은 웹 서버에 SSL 암호화를 추가한다. http2 모듈은 SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있게 해준다. (http/2는 요청 및 응답 방식이 개선되어 훨씬 효율적으로 요청을 보낸다.)
```
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ]
}, (req, res) => {
  res.write('<h1>Hello Node!</h1>')
  res.end('<p>Hello Server!</p>')
}).listen(443, () => {
  console.log('443번 포트에서 서버 대기 중입니다.')
})
```
### 5. cluster [my_cluster_server](./my_cluster_server)  
cluster 모듈은 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈이다. 포트를 공유하는 노드 프로세스를 여러 개 둘 수 있어 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있다. 또 예기치 못한 에러로 인해 서버가 종료되는 현상을 방지할 수 있다. (실무에서는 pm2 등의 모듈로 cluster 기능을 사용한다.)  
클러스터에는 마스터 프로세스와 워커 프로세스가 있다. 워커 프로세스가 실질적인 일을 하는 프로세스이다. 