// express, http 모듈을 불러오기

const express = require("express");
const http = require("http");

//bodyparser 모듈 불러오기
const bodyParser = require("body-parser");

//mongodb
const MongoClient = require("mongodb").MongoClient;
//라우터 불러오기
const webRouter = require("./router/web.js");
const apiRouter = require("./router/api.js");
//express 객체 생성
const app = express();
//환경정보관련 메서드 : set get
app.set("port", 3000);
//body parser미들웨어를 express 등록
//post로 전송된 데이터를 body에서 직접 확이 ㄴ가능
//form데이터로 받은거 짠

app.use(bodyParser.urlencoded({extended:false}));

//정적파일 처리를 위한 미들웨어 추가
app.use(express.static(__dirname+"/public"));

//view engine을 ejs로 설정
//npm install ejs --save
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//라우터 등록
app.use("/web", webRouter(app));
app.use("/api", apiRouter(app));
//요청 처리: get, post
app.get("/", (reg, resp)=>{
	console.log("[GET] /");
	//응답 출력
	resp.writeHead(200, 
		{"Content-Type": "text/html;charset=UTF8"});
	resp.write("<h1>Express Welcomes You</h1>");
	resp.end();
});
//path param or url param or fancy url
app.get("/urlparam/:name", (req, resp)=>{
	// url의 일부로 파라미터를 넘기는 방식 -> req.params로 확인
	let userName = req.params.name;

	resp.status(200).contentType("text/html;charset=UTF8").send("<h1>Welcome, "+userName+"</h1>");
});
function startExpress(){
	//http 모듈을 이용해서 객체를 시작

	http.createServer(app).listen(app.get("port"), ()=>{
		console.log("WebServer is listening...")
	});
}

app.get("/query", (req, resp)=>{
	//query string ? name=value&name1=value1

	console.log("[GET] /query");
	console.log("[QUERY] ", req.query);

	let paramName = req.query.name;
	if(paramName == undefined || paramName.length == 0){
		resp.status(404).contentType("text/html;charset=UTF8").send("<h1>Name파람 확인 불가</h1>");
	}else {
		resp.status(200).contentType("text/html;charset=UTF8").send("<h1>Welcom, "+paramName +"</h1>");
	}
});

//ejs렌터링
app.get("/render", (req, resp)=>{
	//ejs view engine으로 템플릿 렌더링
	resp.status(200).render("./views/render"); //render.ejs파일을 템플릿으로 사용
})
//startExpress();
function startServer(){
	const dburl = "mongodb://localhost:27017";
	//db연결
	MongoClient.connect(dburl, {useUnifiedTopology: true,useNewUrlParser:true},(err, client)=>{
		if(!err){
		//db 접속 성공시 콜백
		db = client.db("mydb");
		console.log("db connected");
		//데이터베이스 정보를 app에 등록
		app.set("db", db);
		//Express시작
		startExpress();
	}else{
		console.log("db connect error:", err.message);
	}
	});
}
startServer();