/*console.log(process.version, //버전
	process.platform, //os
	process.arch, //32, 64비트
	);
console.log(process.versions);//종속성 버전 확인
console.log(process.env);//ㅍ환경정보

//global 변수
console.log(__dirname, __filename); //현재 모듈의 디렉터리와 파일정보
*/
const add = require("./modules/test_module1.js").add;
const square = require("./modules/test_module1.js").square;

console.log(add(10, 20), square(20));

//모듈 전체 불러오기
const area = require("./modules/test_module2.js");
console.log(area.rectangle(10, 20));
console.log(area.circle(10));