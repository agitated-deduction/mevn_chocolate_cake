// 요청이 /web으로 시작하는 모든 요청 처리
//라우터는 express 미들웨어의 일종
const express = require("express");
const router = express.Router();

module.exports = (app)=>{
	router.get("/friends/list", (req, resp)=>{
		let db = app.get("db");

		//friends컬렉션에서 리스트 받아오기
		db.collection("friends").find().toArray((err, result)=>{
			if(err){
				resp.status(404).send("<h1>404: Friends List Error</h1>");
			}else{
				///EJS 뷰엔진 이용, 템플릿 렌더링
				resp.render("friends_list",{friends:result});
			}
		});
	});

	router.get("/friends/new", (req, resp)=>{
		resp.render("friends_insert_form");
	});
	router.post("/friends/save", (req, resp)=>{
		//body -parser가 express에 등록되어 있으면
		//form의로 전송된 데이터가req body객체에 실려서 온다.
		console.log("[POST] data:", req.body);
		let name = req.body.name;
		let email = req.body.email;
		let phone = req.body.phone;
		

		let db = app.get("db");
		db.collection("friends").insertOne(/*{
			name: name, email: email, phone: phone}*/req.body, (err, result)=>{
				if(err){
					console.error("Error:", err);
					resp.status(500).send("<h1>친구 추가 실ㅠㅐ</h1>");
				}else{
					resp.redirect("/web/friends/list");
				}
			});
	});
	return router;
}