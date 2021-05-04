var stand,arm,scale,stage,box;
var flag=0;
function startAnimation() 
{
    animationArea.start();
    stand= new sq_component(700,250,100,300,"#0b366e");
    arm= new sq_component(750,240,240,20,"#3d9c06");
    scale= new arc_component(750,250,50,Math.PI,0,"#3c0055");
    stage= new sq_component(700,500,100,50,"#3c0055");
    box= new sq_component(735,470,30,30,"#a3a5f0");
    tip=new sq_component(840,240,20,40,"#FFF000");
    needle=new sq_component(750,249,-40,2,"#3d9c06");
    hinge=new arc_component(750,250,10,0,2*Math.PI,"#000000");
}
var animationArea = {
    canvas : document.createElement("canvas"),
    start : function() 
    {
        this.canvas.width=1000;
        this.canvas.height=800;
        this.canvas.style.position="absolute";
         this.canvas.style.left="-350px";
      this.canvas.style.top="50px";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.interval=setInterval(updateFrame,16);
    },
    clear : function() 
    {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}
function sq_component(x,y,width,height,color) 
{
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.angle=0;
    this.update=function(rotate)
    {
        if(rotate===1 && this.angle<2*Math.PI/3)
        {
            ctx = animationArea.context;
            ctx.save();
            ctx.translate(this.x, this.y+10);        
            ctx.rotate(this.angle+Math.PI);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -1, this.height / -2, this.width, this.height);  
            ctx.fillRect(this.width / -1,this.height / -2,tip.width,-tip.height+20);      
            ctx.restore();   
        }
        else if(rotate===1)
        {
            ctx = animationArea.context;
            ctx.save();
            ctx.translate(this.x, this.y+10);        
            ctx.rotate(5*Math.PI/3);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -1, this.height / -2, this.width, this.height);
            ctx.fillRect(this.width / -1,this.height / -2,tip.width,-tip.height+20);        
            ctx.restore();   
        }
        else if(rotate===0)
        {
            ctx=animationArea.context;
            ctx.fillStyle=color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        else if(rotate===2 && this.angle<2*Math.PI/3)
        {
            ctx = animationArea.context;
            ctx.save();
            ctx.translate(this.x, this.y+1);        
            ctx.rotate(this.angle+Math.PI);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -1, this.height / -2, this.width, this.height);        
            ctx.restore();   
        }
        else if(rotate===2)
        {
            ctx = animationArea.context;
            ctx.save();
            ctx.translate(this.x, this.y+1);        
            ctx.rotate(5*Math.PI/3);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -1, this.height / -2, this.width, this.height);        
            ctx.restore();
        }    
    }
}
function arc_component(x,y,r,s_angle,e_angle,color)
{
    this.x=x;
    this.y=y;
    this.r=r;
    this.s_angle=s_angle;
    this.e_angle=e_angle;
    this.update=function()
    {
        ctx=animationArea.context;
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,this.s_angle,this.e_angle);
        ctx.fill();
        // ctx.stroke();
    }        
}
function updateFrame()
{
    var rotate_arm=1;//set to 1 
    var rotate_needle=2;// set to 2
    animationArea.clear();
    stand.update(0); 
    scale.update(0);
    stage.update(0);
    if(flag===1)
    {
        if(rotate_arm===1)
        {
            arm.angle+=1*Math.PI/180;
        }
        if(rotate_needle===2)
        {
            needle.angle+=1*Math.PI/180;
        }
        if(arm.angle>80*Math.PI/180 && box.x>625)
        {
            box.x-=5;
            if(box.x<865 && box.y<525)
            {
                box.y+=2;
            }
        }
    }
    box.update(0);
    needle.update(rotate_needle);
    arm.update(rotate_arm);
    hinge.update(0);
    // tip.update(rotate_tip);
}

function start_stop() 
{
  if(flag===0)
  {
    var temp=document.getElementById("bt2");
    temp.innerHTML="Stop";
    flag=1;
  }
  else if(flag===1)
  {
    var temp=document.getElementById("bt2");
    temp.innerHTML="Start";
    flag=0;
  }
}

function restart()
{
  location.reload();
}
