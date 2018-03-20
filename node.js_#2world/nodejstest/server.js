var http = require('http');
var fs = require('fs');//파일을 읽고 쓰게 해주는 모듈

//404 웹페이지 없을 때.response
function send404Response(response){
    response.writeHead(404,{"Content-Type": "text/plain"});
    response.write("404 error: Opps!!!!" );
    response.end();
}
//사용자 요구에 응답 처리하기
function onRequest(request, response) {

    if(request.method == "GET" && request.url == '/'){
        response.writeHead(200,{"Content-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }
    else {
        //없는 파일을 찾는 경우
        send404Response(response);
    }


}

http.createServer(onRequest).listen(8888);

console.log("Server running at http://127.0.0.1:8888");
