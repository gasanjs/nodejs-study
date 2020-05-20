const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      throw err;
    }
    res.end(data)
  })
}).listen(8081, () => {
  console.log('8081번 포트에서 서버 대기 중 입니다.')
})

/** 이벤트 리스너를 붙이는 방법 */
// server.on('listening', () => {
//   console.log('8081번 포트에서 서버 대기 중 입니다.')
// })

// server.on('error', (err) => {
//   console.log(err)
// })