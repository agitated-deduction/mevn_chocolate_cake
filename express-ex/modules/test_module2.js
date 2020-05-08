const area = {
	square: (num) =>{
		return num**2;
	},
	rectangle: (width, height)=>{
		return width*height;
	},
	circle:(radius)=>{
		return Math.PI*radius**2;
	}
}

//모듈 전체를 export
module.exports = area;