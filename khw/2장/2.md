# 노드 2장 정리
### 1. ES 2015+ (ES6)
- **const, let**
함수 스코프를 취하는 var 키워드와 다르게 블록 스코프를 취한다. 블록의 범위는 if, while, for, function등 {} 중괄호이다. 블록 스코프를 취하며 호이스팅, 클로저 같은 문제를 해결하며 변수 중복 등의 코드 관리에도 이점이 있다.
const와 let의 차이는 할당한 값의 변화이다. const는 변하지 않는 값, let은 변하는 값을 위해 사용한다.
- **템플릿 문자열**  
기존 따옴표 대신 백틱을 사용한 문법이다.

- **객체 리터럴**  
  1. 객체의 속성명과 변수명이 겹치는 경우 한 번만 쓸수 있다.
      ```
      { name: name, age: age } // ES5  
      { name, age} // ES6
      ``` 
  2. 객체의 메서드에 함수를 연결할 때 콜론과 function을 붙이지 않아도 된다.
      ```
      var oldObj = {
        sayJS: function() {
          console.log('JS');
        }
      } // ES5
      const newObj = {
        sayJS() {
          console.log('JS');
        }
      }
      ```
  3. 객체의 속성명을 동적으로 생성할 수 있다.
     `const newObj = { [es + 6] : 'Fantastic' }`

- **화살표 함수**  
화살표 함수는 항상 익명이며, arguments, this등을 바인딩 하지 않는다. 
function 키워드로 생성한 일반 함수와 가장 큰 차이점은 this이다.
  ```
  var relationship1 = {
    companyName: 'classact',
    employees: ['luke', 'daniel'],
    logEmployee: function() {
      var that = this; // 콜백 함수 내부의 this는 전역 객체를 가리키기 때문에 하는 처리
      this.employees.forEach(function(employee) {
        console.log(that.companyName, employee)
      })
    }
  } 

  const relationship2 = {
    companyName: 'wooahanbros',
    employees: ['jeonghwan kim', 'yeonghwan kim'],
    logEmployee() { // 화살표 함수에선 상위 스코프의 this를 그대로 사용 가능
      this.employees.forEach(employee => {
        console.log(this.companyName, employee)
      })
    }
  }
  ```
- **구조분해할당**  
객체와 배열의 속성을 해체하여 개별 변수로 바로 할당하는 문법이다.
  ``` 
  const { companyName, employees } = relationship2;
  const [jhk, yhk] = employees;
  console.log(`${companyName}: ${jhk}, ${yhk}`) // wooahanbros: jeonghwan kim, yeonghwan kim
  ```
- **프로미스**  
비동기 프로그래밍에서 종료 후 결과 값이나 실패 이유를 처리하기 위한 처리기를 연결하고,  
비동기 메서드에서 마치 동기 메서드처럼 값을 반환할 수 있는 가독성을 보여준다.
  ```
  function test() {
    setTimeout(function(){
      setTimeout(function(){
        setTimeout(function(){
          console.log(new Date());
        }, 1000);
        console.log(new Date());
      }, 1000);
      console.log(new Date());
    }, 1000);
  }
  test(); // 1초마다 콘솔 실행
  
  let test2 = () => new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve(new Date())
    }, 1000);
  })

  test2().then((result) => {
    console.log(result)
    return test2()
  }).then((result) => {
    console.log(result)
    return test2()
  }).then((result) => {
    console.log(result)
  }) // 1초마다 콘솔 실행
  ```
  Promise.all로 프로미스 객체를 한번에 실행할 수 있다.

- **async/await**  
ES2017 스펙으로 프로미스를 사용한 코드를 더욱 개선할 수 있으며, 일반적인 try catch 구문으로 에러를 처리할 수 있다.
  ```
  async function test3() {
    const result1 = await test2()
    console.log(result1)
    const result2 = await test2()
    console.log(result2)
    const result3 = await test2()
    console.log(result3)
  }
  test3() // 1초마다 콘솔 실행

  ```
