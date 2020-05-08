let seconds = 0;
const Ticker = require("./modules/ticker");

process.on("tick", ()=>{
	seconds++;
	console.log(seconds +"초가 지났습니다.");

	if(seconds>10){
		ticker.emit("stop");
	}
});

let ticker = new Ticker(process);
ticker.start();