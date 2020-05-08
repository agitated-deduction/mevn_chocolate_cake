//라이브러리 로드
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert"); //검증용 라이브러리

//데이터베이스 접속 정보
//mongodb://서버주소:포트
const url = "mongodb://localhost:27017";
const dbname = "mydb";

const conn = new MongoClient(url, {
		useNewUrlParser:true
});

//접속 테스트
function connect_test(){
	//접속
	/*const conn = new MongoClient(url, {
		useNewUrlParser:true
	});*/
	/*client.connect(function(err, client){
		//에러가 있는지 확인
		assert(null, err);
		console.log("MongoDB Connected");
		client.close();
	});*/
	conn.connect(function(err, client){
		assert.equal(null, err);
		console.log("Mongodb Connected");
		conn.close();
	})
}

//insert 테스트
function insertOne(){
	conn.connect((err, client)=>{
		console.log("Connect");
		const db = client.db(dbname);

		db.collection('friends').insertOne({
			name: "홍길동",
			email: "hong@a.com",
			phone: "00000000000", 
			createdAt: new Date()
		}, 
		(err, result)=>{
			console.log("insert된 문서 갯수:", result.insertedCount);
			client.close();
		})
	});
	console.log("function end:");
}

function insertMany(){
	conn.connect((err, client)=>{
		const db = client.db(dbname);
		db.collection("friends").insertMany(
			[{name:"장길산", email :"jang@a.com"},
			{name:"전우치", phone:"00011112222"}],
			(err, result)=>{
				console.log("삽입된 데이터의 갯쉬:", result.insertedCount);
				client.close();
			}
		)
	})
}
function update_test(){
	conn.connect((err, client)=>{
		const db = client.db(dbname);
		db.collection("friends").updateOne(
		{name:"장길산"},
		{$set: {phone: "11144442222"}
		}, (err, result)=>{
			console.log("업데이트 된 문서 갯수:", result.updatedCount);
			client.close();
		})
	})
}
function delete_test(){
	conn.connect((err, client)=>{
		const db = client.db(dbname);
		db.collection("friends").deleteOne(
			{name:"전우치"},
			(err, result)=>{
				console.log("삭제된 데이터 개수", result.deletedCount);
				client.close();
			})
	})
}
//connect_test();
function find_test(){
	conn.connect((err, client)=>{
		const db = client.db(dbname);

		db.collection("friends").find((err, result)=>{
			//console.log("result:", result); //커서 반환
			result.forEach((doc)=>{
				console.log(doc);
			})
			client.close();
		})
	})
}
function find_array_test(){
	conn.connect((err, client)=>{
		const db = client.db(dbname);

		db.collection("friends").find().toArray((err, result)=>{
			//console.log(result, typeof result);
			for(let i = 0; i < result.length; i++)
				console.log("friend:", result[i]);
			client.close();
		});
	})
}
//find_test();

find_array_test();

console.log("테스트 완료");