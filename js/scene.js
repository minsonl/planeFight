class Scene{
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.Map = new Map(this.ctx);
		this.MyPlane = new MyPlane(this.ctx,canvas);
		this.Bullet = new Bullet(this.ctx);
		this.EnemyPlane = new EnemyPlane(this.ctx,canvas);
		this.loadSourceIndex = 0;
		this.gameStartBtn = {url:'images/game_start_btn.png',id:"_img_gameStartBtn"};
		this.gameEndBtn = {url:'images/game_end_btn.png',id:"_img_gameEndBtn"};
		this.gameEndPanel = {url:'images/game_end_panel.png',id:"_img_gameEndPanel"};
		this.requestAnimationFrameObj = new Object();
		this.status = false;
		this.gameOver = false;
		this.score = 0;
		this.init();
	}
	init(){
		let self = this;
		self.canvas.width = self.Map.width;
		self.canvas.height = self.Map.height;
		this.enevt();
		this.loadAllStaticSource();
	}
	loadAllStaticSource(){
		this.ctx.fillText("游戏加载中...",130,100);
		let sources = [
			this.Map.background01,
			this.Map.background02,
			this.gameStartBtn,
			this.gameEndBtn,
			this.gameEndPanel,
			this.MyPlane.myPlaneImage1,
			this.MyPlane.myPlaneImage2,
			this.MyPlane.myPlaneImage3,
			this.Bullet.bullet1,
			this.EnemyPlane.enemy1,
			this.EnemyPlane.enemy2,
			this.EnemyPlane.enemy3
		]
		let promises = [];
		sources.forEach((item,index)=>{
			let p = new Promise((resolve, reject) => {
	            let img = new Image();
	            img.onload = ()=>{
	            	document.body.appendChild(img)
	            	resolve();
	            };
	            img.onerror = reject;
	            img.src = item.url;
	            img.setAttribute('id',item.id);
	            img.style.display = 'none'; 
	       })
			promises.push(p);
		})
        // 图片全部加载完
        Promise.all(promises).then(() => {
        	this.renderInitPage()
        });
		
	}
	renderInitPage(){
		this.Map.init();
		this.addStartBtn();
	}
	renderOverPage(){
		let gameEndPanel = document.getElementById(this.gameEndPanel.id);
		let gameEndBtn = document.getElementById(this.gameEndBtn.id)
		this.ctx.drawImage(gameEndPanel,40,187);
		this.ctx.drawImage(gameEndBtn,85,270);
		this.ctx.font = "16px 微软雅黑";
		this.ctx.fillText("分数:"+this.score,130,220);
	}
	renderGaming(){
		this.Map.scroll();
		this.MyPlane.renderMyPlane();
		this.Bullet.newBullets()
		this.Bullet.moveBullets();
		this.EnemyPlane.newEnemy();
		this.EnemyPlane.moveEnemy();
		this.killEnemyPlane();
		this.showScore();
		this.killMyPlane();
		if(!this.gameOver){
			requestAnimationFrame(function(){
				this.renderGaming();
			}.bind(this))
		}else{
			this.MyPlane.renderBadPlane();
			this.renderOverPage()
		}
//		this.requestAnimationFrameObj = requestAnimationFrame(function(){
//			this.renderGaming();
//		}.bind(this))
	}
	enevt(){
		this.canvas.addEventListener('click',()=>{
			if (!this.status) {
				this.renderGaming();
				this.status = !this.status;
			} else{
				if(this.gameOver){
					window.location.reload()
				}
			}
		},false);
		canvas.onmousemove = (e)=>{
			this.MyPlane.position = this.getLocation(e.clientX, e.clientY);
			this.Bullet.myPlanePosition = this.getLocation(e.clientX, e.clientY);
		}
	}
	addStartBtn(){
		let gameStartBtn = document.getElementById(this.gameStartBtn.id);
    	this.ctx.drawImage(gameStartBtn,104,300);
	}
	killEnemyPlane(){
		let self = this;
		for(let i=0;i<self.Bullet.bulletDatas.length;i++){
			for(let j=0;j<self.EnemyPlane.enemyDatas.length;j++){
				let bulletX = self.Bullet.bulletDatas[i].x;
				let bulletY = self.Bullet.bulletDatas[i].y;
				let EnemyPlaneX = self.EnemyPlane.enemyDatas[j].x;
				let EnemyPlaneY = self.EnemyPlane.enemyDatas[j].y;
				let EnemyPlaneW = self.EnemyPlane["enemy"+self.EnemyPlane.enemyDatas[j].type].width;
				let EnemyPlaneH = self.EnemyPlane["enemy"+self.EnemyPlane.enemyDatas[j].type].height;
				if(bulletX>=EnemyPlaneX && bulletX<=EnemyPlaneX+EnemyPlaneW){
					if (bulletY<=EnemyPlaneY+EnemyPlaneH) {
						self.Bullet.bulletDatas.splice(i,1);
						self.EnemyPlane.enemyDatas[j].life--;
						if(self.EnemyPlane.enemyDatas[j].life==0){
							self.score += self.EnemyPlane.enemyDatas[j].score;
							self.changeSpeed()
							self.EnemyPlane.enemyDatas.splice(j,1);
						}
						break;
					}
				}
			}
		}
	}
	showScore(){
		this.ctx.font = "16px 微软雅黑";
		this.ctx.fillText("分数: "+this.score,10,20);
		this.ctx.fillText("速度: "+this.EnemyPlane.speed,150,20);
	}
	changeSpeed(){
		let newSpeed = this.score/780;
		this.EnemyPlane.speed = newSpeed<1?1:Number(newSpeed.toFixed(1));
	}
	killMyPlane(){
		let self = this;
		let myPlaneX = this.MyPlane.position.x-this.MyPlane.width/2+20;
		let myPlaneY = this.MyPlane.position.y-this.MyPlane.height/2+30;
		let myPlaneW = this.MyPlane.width;
		let myPlaneH = this.MyPlane.height;
		for(let i=0;i<self.EnemyPlane.enemyDatas.length;i++){
			let EnemyPlaneX = self.EnemyPlane.enemyDatas[i].x;
			let EnemyPlaneY = self.EnemyPlane.enemyDatas[i].y;
			let EnemyPlaneW = self.EnemyPlane["enemy"+self.EnemyPlane.enemyDatas[i].type].width;
			let EnemyPlaneH = self.EnemyPlane["enemy"+self.EnemyPlane.enemyDatas[i].type].height;
			if(this.collide({
				x:myPlaneX,
				y:myPlaneY,
				width:myPlaneW,
				height:myPlaneH
			},{
				x:EnemyPlaneX,
				y:EnemyPlaneY,
				width:EnemyPlaneW,
				height:EnemyPlaneH
			})){
				this.gameOver = true;
			}
		}
	}
	collide(rect1,rect2) {
        var maxX,maxY,minX,minY

        maxX = rect1.x+rect1.width >= rect2.x+rect2.width ? rect1.x+rect1.width : rect2.x+rect2.width
        maxY = rect1.y+rect1.height >= rect2.y+rect2.height ? rect1.y+rect1.height : rect2.y+rect2.height
        minX = rect1.x <= rect2.x ? rect1.x : rect2.x
        minY = rect1.y <= rect2.y ? rect1.y : rect2.y

        if(maxX - minX <= rect1.width+rect2.width && maxY - minY <= rect1.height+rect2.height){
          return true
        }else{
          return false
        }
      }
	getLocation(x,y){
		let bbox = canvas.getBoundingClientRect();  
        return {  
            x: (x - bbox.left) * (canvas.width / bbox.width),  
            y: (y - bbox.top) * (canvas.height / bbox.height) 
        }; 
	}
	distance(){
		
	}
}
