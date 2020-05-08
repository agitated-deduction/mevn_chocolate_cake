const util = require("util"); //node.js 내장 유틸 객체
const EventEmitter = require("events").EventEmitter;
//이벤트를 주고받을 사용자 정의 객체는
// eventEmitter를 상속받아야 한다.
let ticker_target = null;

const Ticker = function(target){
	ticker_target = target;
	//이벤트 리스터 부착
	this.on("stop", ()=>{
		//외부로부터 stop이벤트를 받게 되면 수행할 callback함수
		console.log("10초 경과");
		clearInterval(ticker);
	});
}

//prototype을 이용한 공용 메서드 추가
Ticker.prototype.start = ()=>{
	ticker = setInterval(()=>{
		ticker_target.emit("tick");
	}, 1000); //1초마다 한번씩 함수 실행
}

//event emitter를 상속 nodejs util로 간단히 수행
util.inherits(Ticker, EventEmitter);
//event emitter의 prototype의 모든 내용을 ticker객체로 복사

//외부로 export
module.exports = Ticker;