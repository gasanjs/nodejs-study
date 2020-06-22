# 10장 정리

- API 서버 이해하기  
기존 프론트엔드 개발만 했을 때는 단순히 API서버에서 데이터만 받아와서 사용하였지.. 큰 생각이 없었다.  
그냥 DB에서 쿼리로 정보 가져와서 뿌리면 되는거 아냐? 라는 생각이었는데.. 이번 장을 공부하며 많은 것을 알게 되었다.  

- JSON을 서버로 부터 받는 서버다? 단순하게 생각하면 그렇다.  
- 서버로부터 종속적인 화면을 혹은 클라이언트를 분리하고 독립적인 서버로서 데이터와의 가교 역할을 한다.  
- API 서버가 독립적이게 되면서 고려할 것이 굉장히 많아졌다. (자유에 따른 책임이랄까?)
  - 다양한 클라이언트를 고려한 일관성있는 정보 제공,  
  - 각종 요청에 따른 예외 처리,  
  - 데이터의 제공 범위 및 사용량,  
  - 인증과 권한,  
  - 다국어 처리 등...  

단순히 데이터를 클라이 언트로 던져주는 것이 아닌, 얼마나 효율적이고 견고하고 요구에 맞는 정보를 제공하는 역할이 요구된다.  
그렇게 개선하고자 하는 노력이 인기를 끌었고 Restful API와 같은 방법론이 나온게 아닌가 싶다.  

- CORS 이해하기
클라이언트에서 서버로 요청을 보낼 때는, 클라이언트와 서버의 도메인이 일치하지 않으면 기본적으로 요청이 차단된다.
(외부서버에 요청한 데이터를 보안목적으로 브라우저에서 차단) MDN에서도 개발자를 위한 웹 기술로 소개되고 있기 때문에.. 브라우저에서만의 정책인듯하다.  
그동안 CORS를 해결하기 위해 nginx의 proxy를 사용하여 해결 하였는데.. 서버에서 설정을 통해 인증된 요청만을 허용하는 방법이 가장 이상적인 것 같다.