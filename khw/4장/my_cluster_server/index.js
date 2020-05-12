const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    cluster.fork(); // clustering 처리
  });
} else {
  http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>')
    res.end('<p>Hello Server!</p>')
  }).listen(8086, () => {
    console.log('8086번 포트에서 서버 대기 중입니다.')
  })
  console.log(`${process.pid}번 워커 실행`)
}