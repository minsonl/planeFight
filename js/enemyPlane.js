class EnemyPlane{
	constructor(ctx,canvas){
		this.ctx = ctx;
		this.canvas = canvas;
		this.speed = 1;
		this.enemyDatas = new Array();
		this.enemyFrequency = 0;
		this.enemy1 = {
			url:"./images/enemy1.png",
			id:"_img_enemy1",
			width:34,
			height:24,
			life:1,
			score:5
		},
		this.enemy2 = {
			url:"./images/enemy2.png",
			id:"_img_enemy2",
			width:46,
			height:60,
			life:5,
			score:15
		},
		this.enemy3 = {
			url:"./images/enemy3.png",
			id:"_img_enemy3",
			width:110,
			height:164,
			life:10,
			score:50
		}
	}
	newEnemy(){
		this.enemyFrequency++;
		if(this.enemyFrequency == 20){
			let enemyPlantType = this.randomInteger(1,50);
//			let enemyPlantType = 1;
			if (enemyPlantType==1) {
				this.enemyDatas.push({
					x:this.randomInteger(0,this.canvas.width-this.enemy3.width),
					y:-this.enemy3.height,
					type:3,
					life:this.enemy3.life,
					score:this.enemy3.score
				})
			}else if(1<enemyPlantType&&enemyPlantType<=10){
				this.enemyDatas.push({
					x:this.randomInteger(this.enemy2.width/2,this.canvas.width-this.enemy2.width),
					y:-this.enemy2.height,
					type:2,
					life:this.enemy2.life,
					score:this.enemy2.score
				})
			}else{
				this.enemyDatas.push({
					x:this.randomInteger(this.enemy1.width/2,this.canvas.width-this.enemy1.width),
					y:-this.enemy1.height,
					type:1,
					life:this.enemy1.life,
					score:this.enemy1.score
				})
			}
		}
		if(this.enemyFrequency>20){this.enemyFrequency=0}
	}
	moveEnemy(){
		let enemyPlane = [
			document.getElementById(this.enemy1.id),
			document.getElementById(this.enemy2.id),
			document.getElementById(this.enemy3.id)
		]
		for (let i=0;i<this.enemyDatas.length;i++) {
			this.ctx.drawImage(enemyPlane[this.enemyDatas[i].type-1],this.enemyDatas[i].x,this.enemyDatas[i].y);
			this.enemyDatas[i].y+=this.speed;
			if (this.enemyDatas[i].y>568) {
				this.enemyDatas.splice(i,1)
			}
		}
	}
	removeEnemy(){
		
	}
	randomInteger(min,max){
	    return Math.floor(min+Math.random()*(max-min));
	}
}
