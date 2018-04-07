class Map{
	constructor(ctx){
		this.ctx = ctx;
		this.width=320,
		this.height=568,
		this.background01={url:'./images/map_01.png',id:"_img_mapBackground01"},
		this.background02={url:'./images/map_02.png',id:"_img_mapBackground02"},
		this.position = {x:0,y:0};
	}
	init(){
		let MapBackground01 = document.getElementById(this.background01.id);
    	this.ctx.drawImage(MapBackground01,0,0);
	}
	scroll(){
		let MapBackground02 = document.getElementById(this.background02.id);
		this.ctx.drawImage(MapBackground02,this.position.x,-this.height+this.position.y);
		this.ctx.drawImage(MapBackground02,this.position.x,this.position.y);
		this.position.y+=0.5;
		if(this.position.y==this.height)this.position.y=0;
	}
}