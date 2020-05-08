# mevnStudy
mongoDB, express, vue.js, node.js



## mongoDB

빅데이터의 3v : volume, variety, velocity<br>

RDB(관계형 데이터베이스)가 처리하기 적합하지 않음 -> 데이터의 구조(스키마)<br>
->NoSQL(Not only SQL) 등장


* 장점
  * flexibility: schema-less 여서 다양한 구조의 데이터를 데이터베이스 변경 없이 이용 가능
  * performance: read & write 성능이 뛰어남. caching, 대량의 네트워크 트레픽에도 RDBMS에 비해 유리
  * scalability: 설계시 Scale-out 구조 채택, 운용과 확장이 손쉬움
  * document-oriented: 문서중심의 설계로 강력한 query 성능 제공.
  * conversion/mapping: JSON형태로 데이터 저장, 직관적이고 개발 편리.

* 단점
  * 트랜잭션, 정합성이 필요한 데이터에는 부적합
  * 메모리 크기에 따라 성능이 많이 좌우됨(내부적으로 캐시를 많이 써서
  * 추가/삭제/변경이 많은 데이터에는 부적합.
  
download: [mongoDB](mongoDB.com), [robo 3t](robomongo.org/download)


*******
따로 sql쿼리 사용하지 않고 js 사용.

* _id<br>
mongoDB내의 모든 document에는 UUID 가 있으며 _id라는 필드명으로, ObjectId라는 객체 형태로 MongoDB에 의해 부여되고 관리됨.
```js
db.posts.findOne()
```

* insert()<br>
특별한 schema가 없기 때문에 json형태로 자유롭게 입력 가능
```js
use mydb
db.posts.insert({
  "title":"First Post"  
})
```
여러 document를 동시에 insert할 때에는 insertMany()메서드 이용.


* save()<br>
_id(ObjectId)가 설정되어 있지 않다면 .insert()메서드와 동일하게 작동
이미 _id필드가 설정되어 있다면 Collection에 저장되어 있는 객체를 수신
```js
let post = db.posts.findOne()
post.createAt = new Date()
db.posts.save(post)       //document에 createAt이 추가된다. (document update)
```

* update()<br>
_id필드가 포함되어있는 document를 변경 저장하는 .save()함수와 달리 기존 컬렉션에 담겨있는 document변경 가능<br>
매개 객체로 두 객체를 전달<br>
->첫번째 객체: 변경할 document지정하기 위한 객체
->두번째 객체: 변경할 내용을 담고 있는 객체. $set연산자 사용하지 않으면 객체 내용을 통째로 변경하게 되므로 주의!!
```js
db.posts.update(
{"title":"First Post"}, //변경할 문서의 조건
{$set:
  {createdAt: newDate, updateAt: new Date()} //변경할 내용
 })
 ```
 
* remove()<br>
컬렉션으로부터 document삭제. 삭제하고자 하는 객체의 검색조건 부여 또는 직접 삭제
```js
//직접삭제
let post = db.posts.findOne()
db.posts.remove(post)
//조건 부여
db.posts.remove({title:/Learn/})
```

* SEARCH<br>
find()나 findOne() 사용. find는 조건을 만족하는 문서의 커서, findOne은 조건을 만족하는 문서 중 하나 반환
```js
//{<key>:<value>}
dp.posts.find({"by":"bit"})

//{<key>:{&lt:<value>}}
dp.posts.find({"likes":{$lt:50}}) //lt, lte, gt, gte, ne
```
$and와 $or을 이용해 여러 조건을 배열로 묶어 검색할 수 있다.
```js
db.posts.find(
  {$and:
    [
      {"by": "bit"}, 
      {"likes":
        {$gt:50}}
    ]
  })
  db.posts.find(
  {$or:
    [
      {"by": "bit"}, 
      {"likes":
        {$gt:50}}
    ]
  })
```
find()에서 projection 정보를 두번째 인자값으로 넘겨주면 필드 출력 제어 가능하다.
```js
db.posts.find({}, {"title":1, _id: 0}) //출력할 필드는 1 출력하지 않을 필드는 0을 준다.
```
find()다음에<br>
  pretty() 메서드 조회결과를 보기좋게 출력<br>
  limit() 메서드 컬렉션으로부터 받아와야 할 Document 개수 제한<br>
  skip() 메서드 find()를 통해 받아온 document 중에서 지정된 개수만큼 건너 뜀<br>
  sort() 메서드 지정한 순서대로 검색결과 반환
```js
//posts컬렉션에서 받아온 document 중 1개를 건너뛰고 2개를 가져옴
db.posts.find({}, {"title":1, _id: 0}).limit(2).skit(1)
//1오름차순 -1내림차순
db.posts.find({}, {"title":1, _id:0}).sort({"title":-1})
```

******
#### MongoDB Connect

* 연결드라이버 설치
```
npm install mongodb
```
* 연결위한 드라이버 설정 및 접속
```js
const MongoClient = require('mongodb').MongoClient; //라이브러리 로드
cosnt assert = require('assert'); //검증용 라이브러리

//데이터베이스 접속 정보
const url = 'mongodb://localhost:27017'; //  mongodb://서버주소:포트
const dbname = "mydb";

const conn = new MongoClient(url, {useNewUrlParser: true});

//접속 테스트
function con_test(){
  conn.connect((err, client)=>{
    assert.equal(null, err);
    console.log("MongoDB Connected");
    client.close();
  });
}

function insert_test(){

}
function update_test(){

}
function delete_test(){

}
function find_test(){

}
function find_array_test(){

}
```



## Node.js

서버 만들기: (java - servlet, spring), (php), (python - flask, django), (java - node.js, express, vue template engine)

* 장점
  * 응답속도가 빠르고 확장이 용이함.

* 주요 특징
  * 모듈기반, node package management(npm)로 패키지 관리 (->yam 쓰기도 함?)
  * non-blocking

* Event-Driven Model, Non-blocking I/O
  * event: 한쪽에서 다른 쪽으로 상태 혹은 실행 결과 전송
  * nonblocking: 하나의 작업이 끝나는걸 기다리지 않고 스레드에 전달 후 작업 속행,
  해당 작업이 끝남을 알리는 이벤트 수신 시 추가 작업 진행.<br>
node.js <- event+nonblocking!!!
 
 
