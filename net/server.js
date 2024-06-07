const net = require("net");
const getRequest = require("./lib/request");
const getResponse = require("./lib/response");
const staticFileObj = require("./lib/static")
const server = net.createServer();
// const fs = require('fs');

// server.on 메서드로 이벤트 구독

// 논리적 연결이 됬으면
server.on("connection", (socket) => {
    let buffer = Buffer.alloc(0)
    // socket data를 보내면 호출될 이벤트
    socket.on("data", (chunk) => {
        // concat 버퍼에 있는 데이터를 합쳐준다.
        // 처음에 할당한 길이가 변하지 않기 때문에
        // concat 버퍼 데이터를 합쳐주기 위해서
        buffer = Buffer.concat([buffer, chunk]);
        // 요청 객체 내용
        const req = getRequest(buffer);
        console.log(req);
        console.log(buffer.toString());
        // 응답 객체 내용
        const res = getResponse(socket,req);
        
        // 라우팅 처리 (요청 경로의 값을 판단해서 어떤 처리를 해줄지 결정)
        console.log(staticFileObj);
        for (const path in staticFileObj) {
            if (req.startLine.url === path) {
              res.sendStatic(path);
              return;
                
            }
        }
        //for (const key in object) {
            //if (Object.hasOwnProperty.call(object, key)) {
                //const element = object[key];
                
            //}
        //}


        // 페이지 라우팅
        console.log(req.startLine);
        
        const urlpath = req.startLine.url
        if(urlpath === "/"){
            res.send('index')
        }else if (urlpath === "/board/list"){
          
        }else if (urlpath === "/board/write"){
           
        }else{
            res.notFound("url 확인 ㄱㄱ");
        }
        // 메서드가 post일 경우 본문 내용으로 json파일을 만들어서 내용을 추가하기
    })
})

server.listen(3000, ()=> {
    console.log("server on~");
})


/* 

net
- server.js
- lib - 라이브러리
lib-- request.js
lib-- response.js
lib-- static.js
- public - 정적 파일들
public-- css
public-- js
- views -- 화면 구성할것들
views-- index.html
views-- borad
views->borad--- list.html
views->borad--- write.html

*/