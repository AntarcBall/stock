let stockList = [];
let haveList = {}; 
let change;
let time= 0;
let day = 0;
let money = 3000;
let seeRange = 1;
var message= '';
var floorY = 925
var c = [];
function intRand(a,b){return Math.floor((Math.random() * (b-a+1)) + a)};//기반함수
const cvs = document.createElement('canvas');
function appear(name,event,func){
    document.body.appendChild(name)
    name.addEventListener(event,func)
}
function domCreate(type){return document.createElement(type);}
///DOM요소 추가
document.body.appendChild(cvs);cvs.style.borderStyle = 'solid';cvs.style.borderWidth = '1px'
ctx = cvs.getContext('2d');
document.write('<br/>')
const infbox = domCreate('div');//정보표시
appear(infbox)
const nextbtn = domCreate('button');nextbtn.textContent = 'sleep'//다음 버튼
appear(nextbtn,'click',changeValueRandomly)
const input = domCreate('input')//번호
input.style.width = '30px';input.type = 'number';input.value = 0
appear(input,'change',paint)
const command = domCreate('input');//커맨드창
command.onkeyup = press;command.style.width = '110px'
appear(command)
createStocksDisplay();
const logg = domCreate('div');//로그
logg.style.borderStyle = 'solid';logg.style.borderWidth = '1px';logg.style.width = '200px';logg.style.height = '200px';logg.style.overflow='auto'
appear(logg)
////함수
cvs.addEventListener('mousemove', function(evt){ //좌표획득
    var mousePos = getMousePos(cvs, evt); 
    message = `${mousePos.y}$ (time = ${mousePos.x})`
})
function logger(value){
    logg.innerHTML = logg.innerHTML +value+ '<br/>'
    console.log(value)
}
function press(){
    if (window.event.keyCode == 13){
        c = command.value.split(' ')
        if (c[0] == 'buy') {//command
            if (stockList[c[1]].slice(-1) * c[2]<=money){
                haveList[c[1]] += Number(c[2])
                logger(c[1]+'번째 주를'+c[2]+'주 '+ c[0]);
                money -= stockList[c[1]].slice(-1) * c[2]
            }
            else logger('돈 부족;')
        }
        else if (c[0] == 'show'){
            if (c[1] == 'hands') 
                for(i in haveList)
                    {logger(String(i)+':'+haveList[i]+', '),false}
        }
        else if (c[0] == 'up'){
            floorY -=10
            paint();
        }
        else if (c[0] == 'dn'){
            floorY +=10
            paint();
        }
        
        else if (c[0] == 'sell'){
            if(haveList[c[1]] >= c[2] ){
                logger(c[1]+'번째 주를'+c[2]+'주 '+ c[0])
                money += stockList[c[1]]*c[2]
                haveList[c[1]] -= c[2]
            }else logger('충분한 주식을 소유하세요.')
        }
    }
}
    
function initInf(){
    infbox.innerHTML = `It's ${message}<br/>deposit = ${money}$`
}
///////////////
function createStocksDisplay(){
    for (var i=0;i<10;i++){
        e = document.createElement('div')
        e.style.borderStyle = 'solid'
        e.style.borderWidth = '1px'
        e.style.width = '200px'
        e.style.margin = '1px'
        e.id = i
        document.body.appendChild(e)
        haveList[i] = 0;
        stockList[i] = [1000];
    }
}
function changeValueRandomly(){
    for(i in stockList){
        change = intRand(-10,10);
        var p = stockList[i][time] + change
        stockList[i].push(p);
        if (time > 60) {
            for (k in stockList)
                {stockList[k].shift();}
            time --;
        }
    }
    time ++;
    day++;
    paint();
}
function getMousePos(canvas, evt) { 
    var rect = canvas.getBoundingClientRect();
    return { 
        x: (day-time) + Math.floor((evt.clientX - rect.left)/5),
        y: 150 - (seeRange*(evt.clientY - rect.top ) - floorY)
    } 
}
function paint(){
    what = (input.value)
    ctx.fillStyle = '#FFFFFF'
    var x= 0
    ctx.beginPath();
    ctx.fillRect(0,0,cvs.width,cvs.height)
    for (i in stockList[what]){
        ctx.lineTo(x,cvs.height-(seeRange* stockList[what][i]-floorY))
        ctx.stroke();
        x+= 5;
    }
    ctx.closePath();
}

setInterval(() => { //값바꾸기 ;
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
    initInf();
}, 100);
 
