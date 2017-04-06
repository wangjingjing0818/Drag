/**
 * Created by Administrator on 2017/1/14 0014.
 */

class Event{
    constructor(){};
    on(type,fn){
        if(!this[type]){
            this[type]=[]
        }
        var a=this[type];
        for(var i=0;i<a.length;i++){
            if(a[i]==fn)return
        }
        a.push(fn)
    }
    fire(type,e){
        var a=this[type];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                a[i].call(this)
            }
        }
    }
}
class Drag extends Event{
    constructor(opt){
        super();
        if(!opt.ele) return;
        this.ele=opt.ele;
        this.x=this.y=this.l=this.t=null;
        this.DOWN=processThis(this.down,this)
        this.MOVE=processThis(this.move,this)
        this.UP=processThis(this.up,this)
        this.ZINDEX=processThis(this.zindex,this)
        on(this.ele,'mousedown',this.DOWN);
        on(this.ele,'mousedown',this.ZINDEX)
    }
    down(e){
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.ele.offsetLeft;
        this.t=this.ele.offsetTop;
        if(this.ele.setCapture){
            this.ele.setCapture();
            on(this.ele,'mousemove',this.MOVE)
            on(this.ele,'mouseup',this.UP)
        }else{
            on(document,'mousemove',this.MOVE)
            on(document,'mouseup',this.UP)
            e.preventDefault()
        }
    }
    move(e){
        this.ele.style.left=e.clientX-this.x+this.l+'px';
        this.ele.style.top=e.clientY-this.y+this.t+'px';
    }
    up(){
        if(this.ele.releaseCapture){
            this.ele.releaseCapture();
            off(this.ele,'mousemove',this.MOVE)
            off(this.ele,'mouseup',this.UP)
        }else{
            off(document,'mousemove',this.MOVE)
            off(document,'mouseup',this.UP)
        }
    }
    zindex(){
        this.ele.style.zIndex=++Drag.zindex;
    }

}
Drag.zindex=0