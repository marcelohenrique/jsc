
function Canvas(id){
	
	var self = this;
	
	this.canvas = document.getElementById(id);
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.fill_color = "#FFF";
	this.stroke_color = "#000";
	
	this.isInside = function(pos) {
		return (pos.x >= 0 && pos.x<=1 && pos.y>=0 && pos.y<=1);
	};
	
	this.clear = function(){
		self.ctx.clearRect(0, 0, self.width, self.height);
	};
	
	this.circle = function(p,r){
		x = p.x*self.width;
		y = p.y*self.height;
		//self.ctx.save();
		self.ctx.beginPath();
		self.ctx.strokeStyle = self.stroke_color;
		self.ctx.moveTo(x+r,y);
		self.ctx.arc(x,y,r,0,TWO_PI,self);
		self.ctx.fill();
		//self.ctx.restore();
	};
	
	this.line = function(x1,x2){
		//this.ctx.save();
		self.ctx.beginPath();
		self.ctx.strokeStyle = self.stroke_color;
		self.ctx.moveTo(x1.x*self.width,x1.y*self.height);
		self.ctx.lineTo(x2.x*self.width,x2.y*self.height);
		self.ctx.stroke();
		//this.ctx.restore();
	};
}
