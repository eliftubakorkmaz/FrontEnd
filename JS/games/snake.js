const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", tusHareketleri);

let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;
let x = 10;
let y = 10;
let hareketX = 0;
let hareketY = 0;
let elmaX = 5;
let elmaY = 5;
let konum = 20;
let boyut = 18;
let yilanUzunlugu = 3;
let skor = 0;
let hiz = 10;
let can = 3;
const elmaResmi = new Image();
elmaResmi.src = 'elma.png';
const yilanBasi = new Image();
yilanBasi.src = 'yilanbas.png';
const yilanKuyruk = new Image();
yilanKuyruk.src = 'yilankuyruk.png'
let yilanParcalari = [];
class YilanParcasi{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function oyunuCiz(){
   ekraniTemizle();
   skorCizgi();
    yilaniCiz();
   elmayiCiz();
   yilanHareketiniGuncelle()
   elmaninKonumunuGuncelle()
   skoruCiz();
   hiziCiz();
   canCiz();

  const sonuc = oyunBittiMi();

  if (sonuc)
    return;

   setTimeout(oyunuCiz,1000/hiz);
}

function ekraniTemizle(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}

function yilaniCiz(){
    ctx.fillStyle = "green";
    for (let i of yilanParcalari){
        //ctx.fillRect(i.x * konum, i.y * konum, boyut, boyut);
        ctx.drawImage(yilanKuyruk, i.x * konum, i.y * konum, 30, 30);
    }

    yilanParcalari.push(new YilanParcasi(x,y));

    if (yilanParcalari.length > yilanUzunlugu){
        yilanParcalari.shift();
    }

    ctx.fillStyle = "gray";
    //ctx.fillRect(x * konum, y * konum, boyut, boyut);
    ctx.drawImage(yilanBasi, x * konum, y * konum, 50, 50);
}

function elmayiCiz(){
    ctx.fillStyle = "red";
    //ctx.fillRect(elmaX * konum,elmaY * konum,boyut,boyut)
    ctx.drawImage(elmaResmi, elmaX * konum, elmaY * konum, 35, 35);
}

function tusHareketleri(e){
    switch (e.keyCode){
        case 37:
            if(hareketX === 1) return;
            hareketX = -1;
            hareketY = 0;
            break;
        case 38:
            if (hareketY === -1) return;
            hareketY = -1;
            hareketX = 0;
            break;
        case 39:
            if (hareketX === -1) return;
            hareketX = 1;
            hareketY = 0;
            break;
        case 40:
            if (hareketY === -1) return;
            hareketY = 1;
            hareketX = 0;
            break;
    }
}

function yilanHareketiniGuncelle(){
    let sonucX = x + hareketX;
    let sonucY = y + hareketY;
 
    if (sonucY < 0){
         sonucY = 19;
    }else if (sonucY > 19){
         sonucY = 0;
    }
 
    if (sonucX < 0){
         sonucX = 19;
    }else if (sonucX > 20){
         sonucX = 0;
    }
 
    x = sonucX;
    y = sonucY;
}

function elmaninKonumunuGuncelle(){
    if (x === elmaX && y === elmaY) {
        elmaX = Math.floor(Math.random()  * konum);
        elmaY = Math.floor(Math.random()  * konum);

        let elmaKonumuMusaitMi = false;
        while(!elmaKonumuMusaitMi){
            elmaKonumuMusaitMi = true;
            for (let parca of yilanParcalari){
                if (parca.x === elmaX && elmaY){
                    elmaX = Math.floor(Math.random()  * konum);
                    elmaY = Math.floor(Math.random()  * konum);
                    elmaKonumuMusaitMi = false;
                }
            }
        }

        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0){
            hiz +=3;
        }
    }
}

function skoruCiz() {
    ctx.fillStyle = "black";
   ctx.font = "20px verdana";
   ctx.fillText(`Skor: ${skor}`, 500, 30);
}

function skorCizgi(){
    ctx.fillStyle = "black";
    ctx.fillRect(380, 0, 2, 50);
}

function hiziCiz(){
  ctx.fillStyle = "black";
  ctx.fillFont = "20px verdena";
  ctx.fillText(`Hız: ${hiz}`, canvasWidth - 200, 30);
}

function canCiz(){
    ctx.fillStyle = "black";
    ctx.fillFont = "20px verdena";
    ctx.fillText(`Can: ${can}`, canvasWidth - 150, 55);
}

function oyunBittiMi(){
    let oyunBitti = false;
    if (hareketX === 0 && hareketY === 0) return;

    for (let index in yilanParcalari){
        let parca = yilanParcalari[index]
        if (parca.x === x && parca.y === y){
            can--;
            if (can === 0){
                oyunBitti = true;
                break;
            }
            yilanParcalari.splice(0, index);
            yilanUzunlugu = yilanParcalari.length;
            skor = yilanUzunlugu * 10;
            hiz -= 3;
            //oyunBitti = true;
            break;
        }
    }

        if (oyunBitti){
            ctx.fillStyle = "red";
            ctx.fillFont = "150px verdana";
            ctx.fillText(`Game Over!`, canvasWidth/4.5, canvasHeight/2);
        }
            return oyunBitti;
}

function yeniOyun(){
    document.location.reload();
}

oyunuCiz();