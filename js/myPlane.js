class MyPlane{
	constructor(ctx,canvas){
		this.ctx = ctx;
		this.canvas = canvas;
		this.width=66,
		this.height=80,
		this.position = {x:0,y:0},
		this.myPlaneImage1 = {url:'./images/myPlane1.png',id:'_img_myPlane'},
		this.myPlaneImage2 = {url:'./images/myPlane2.png',id:'_img_myPlane2'},
		this.myPlaneImage3 = {url:'./images/myPlane3.png',id:'_img_myPlane3'},
		this.simulationGif = 1;
	}
	renderMyPlane(){
		let myPlaneImg = [
			'',
			document.getElementById(this.myPlaneImage1.id),
			document.getElementById(this.myPlaneImage2.id)
		]
		this.simulationGif++;
		if(this.simulationGif>2)this.simulationGif=1;
		this.ctx.drawImage(myPlaneImg[this.simulationGif],this.position.x-(this.width/2),this.position.y-(this.height/2));
	}
	renderBadPlane(){
		let badPlaneImg = document.getElementById(this.myPlaneImage3.id);		
		this.ctx.drawImage(badPlaneImg,this.position.x-(this.width/2),this.position.y-(this.height/2));
	}
}
