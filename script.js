let stockList = [];
let haveList = {}; 
let change;
let time= 0;
let money = 3000;
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
const command = document.createElement('input');
command.onkeyup = press
appear(command)
createStocksDisplay();
const infbox = document.createElement('div');infbox.style.borderStyle = 'solid';infbox.style.width='200px'
appear(infbox)
const logg = document.createElement('div');
logg.style.borderStyle = 'solid';logg.style.borderWidth = '1px';logg.style.width = '400px';logg.style.height = '100px';logg.style.overflow='auto'
appear(logg)
function logger(value,br){
    logg.innerHTML = logg.innerHTML + value + '<br/>'.repeat(br)
}
function press(){
    if (window.event.keyCode == 13) {
        coms = command.value.split(' ')
        if ([coms[0]] == 'buy') //command
            {if (stockList[coms[1]].slice(-1) * coms[2]<=money)
                {haveList[coms[1]] += Number(coms[2])
                logger(coms[1]+'번째 주를'+coms[2]+'주 '+ coms[0],1);
                money -= stockList[coms[1]].slice(-1) * coms[2]}
            else logger('돈 부족;',1)}
        else if ([coms[0]] == 'show'){
            console.log('s')
            if ([coms[1]] == 'hands') 
                for(i in haveList)
                    {logger(String(i)+':'+haveList[i]+', ',0)}
        }
   }
}
function initInf(){
    infbox.innerHTML = `${money}$<br/>주식게임`
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
function shift(){
    for(i in stockList){
        change = intRand(-10,10);
        var p = stockList[i][time] + change
        stockList[i].push(p);
        if (time > 55) {
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
    initInf();
}, 100);
