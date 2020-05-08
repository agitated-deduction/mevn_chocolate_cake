//api router(json)

const express = require("express")
const router = express.Router();

function apiRouter(app){
	// 친구 목록 Json 출력
	router.get("/friends.json", (req, resp)=>{
		let db = app.get("db");

		db.collection("friends").find().toArray((err, result)=>{
			if(err){
				resp.status(500).json({"status": 500});
			}else{
				resp.status(200).contentType("text/json;charset=UTF8").json(result);
			}
		});
	});
	return router;
}

module.exports= apiRouter;