let stockList = [];
let change;
let time= 0;
function intRand(a,b){return Math.floor((Math.random() * (b-a+1)) + a)};
const cvs = document.createElement('canvas');
function appear(name,event,func){
    document.body.appendChild(name)
    name.addEventListener(event,func)
}/////////////
document.body.appendChild(cvs);cvs.style.borderStyle = 'solid';cvs.style.borderWidth = '1px'
ctx = cvs.getContext('2d');
document.write('<br/>')
const nextbtn = document.createElement('button');nextbtn.textContent = 'next'
appear(nextbtn,'click',shift)
const input = document.createElement('input')
input.style.width = '30px';input.type = 'number';input.value = 0
appear(input,'change',paint)
for (var i=0;i<10;i++){
    e = document.createElement('div')
    e.style.borderStyle = 'solid'
    e.style.borderWidth = '1px'
    e.style.width = '200px'
    e.style.margin = '1px'
    e.id = i
    document.body.appendChild(e)
    stockList[i] = [1000];
}
function shift(){
    for(i in stockList){
        change = intRand(-10,10);
        var p = stockList[i][time] + change
        stockList[i].push(p);
        if (time > 10) {
            for (k in stockList)
                {stockList[k].shift();}
            time --;
        }
    }
    time ++;
    paint();
}
function paint(){
    what = (input.value)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0,0,cvs.width,cvs.height)
    ctx.fillStyle = '#000000'
    var x= 0
    ctx.beginPath();
    console.log('paint')
    for (i in stockList[what]){
        ctx.lineTo(x,cvs.height-(stockList[what][i]-1000+75))
        ctx.stroke();
        x+= 5;
    }
    ctx.closePath();
}

setInterval(() => {
    for( i in stockList){
        var delta = stockList[i][time] - stockList[i][time-1]
        document.getElementById(i).textContent = i +' | '+ stockList[i][time] + (delta ? (delta>0 ? '▲':'▼') + Math.abs(delta): '')
        if(delta > 0){
            document.getElementById(i).style.color = 'red'
        }else if (delta < 0) document.getElementById(i).style.color = 'blue'
        else document.getElementById(i).style.color = 'black'   
    }
    if( Number(input.value) < 0) input.value = stockList.length -1
    if( Number(input.value) > stockList.length -1) input.value = 0
}, 100);
