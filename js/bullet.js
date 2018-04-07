class Bullet{
	constructor(ctx){
		this.ctx = ctx;
		this.bulletDatas = [];
		this.myPlanePosition = new Object();
		this.bulletFrequency = 0;
		this.bullet1 = {
			url:'./images/bullet1.png',
			id:'_img_bullet1',
			width:6,
			height:14
		}
	}
	newBullets(){
		this.bulletFrequency++
		if(this.bulletFrequency==5){
			this.bulletDatas.push({
				x:this.myPlanePosition.x-2,
				y:this.myPlanePosition.y-50
			});
		}
		if(this.bulletFrequency>5){this.bulletFrequency=0}
	}
	moveBullets(){
		let bullet1_img = document.getElementById(this.bullet1.id);
		for (let i=0;i<this.bulletDatas.length;i++) {
			this.ctx.drawImage(bullet1_img,this.bulletDatas[i].x,this.bulletDatas[i].y);
			this.bulletDatas[i].y-=10;
			if (this.bulletDatas[i].y<0) {
				this.bulletDatas.splice(i,1)
			}
		}
	}
}
