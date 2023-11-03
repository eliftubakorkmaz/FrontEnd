const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown", keydown);

let interval;
let oyunBasladiMi = false;
const height = canvas.height;
const width = canvas.width;
let x = width / 2;
let y = height - 30;
let dx = 2;
let dy = -2;
let ballColor = "#0095DD";
let cubukGenisligi = 120;
let cubukYuksekligi  = 15;
let cubukX = (width - cubukGenisligi) / 2;
let cubukY = (height - cubukYuksekligi);
let tuglaSatirSayisi = 3;
let tuglaSutunSayisi = 5;
const tuglaGenisligi = 90;
const tuglaYuksekligi = 25;
const tuglaOffSetTop = 35;
const tuglaOffSetLeft = 35;
const tuglaPadding = 15;
const tuglalar = [];
let dusenSuprizler = [];
let surprizSayisi = 2;
let surprizVerildi = 0;
for(let k = 0; k < tuglaSutunSayisi; k++){
    tuglalar[k] = [];
    for(let s = 0; s < tuglaSatirSayisi; s++){
        let surpriz = false;
        if (surprizVerildi < surprizSayisi && Math.random() < 0.1) { // %10 olasılıkla süpriz ver
            surpriz = true;
            surprizVerildi++;
        }
        tuglalar[k][s] = {x: 0, y:0, status: 1, surpriz: surpriz};
    }
}
let skor = 0;
let can = 3;
let isGameOver = false;


//Arrow function
const oyunuCiz = () => {
   tahtayiTemizle();
   topuCiz();
   topunKonumunuDegistir();
   cubuguCiz();
   tuglaCiz();
   tuglayaCarptiMi();
   suprizleriCiz();
   skoruCiz();
   canCiz();


}

const skoruCiz = () => {
   ctx.font = "16px Arial";
   ctx.fillStyle = "black";
   ctx.fillText(`Skor: ${skor}`,8,20)
}

const tahtayiTemizle = () => {
    ctx.clearRect(0,0, width, height);
}

const canCiz = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`Skor: ${can}`, width-65, 20);
}

const topuCiz = () => {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();

    
}

const tuglayaCarptiMi = () => {
    for (let sutun = 0; sutun < tuglaSutunSayisi; sutun++){
        for (let satir = 0; satir < tuglaSatirSayisi; satir++){
            const tugla = tuglalar[sutun][satir];
            if (tugla.status === 1 ){
                if (x > tugla.x && x < tugla.x + tuglaGenisligi && y > tugla.y && y < tugla.y + tuglaYuksekligi){
                    dy = -dy;
                    tugla.status = 0;
                    skor++;

                    if (tugla.surpriz) {
                        dusenSuprizler.push({x: tugla.x + tuglaGenisligi / 2, y: tugla.y + tuglaYuksekligi / 2, status: 1});
                    }

                    if(skor === tuglaSatirSayisi * tuglaSutunSayisi){
                        clearInterval(interval);

                        ctx.font = "25px Verdena";
                        ctx.fillStyle = "black";
                        ctx.fillText("Tebrikler, oyunu kazandınız!", width/2 - 50, height/2 + 20);
                    }
                }
            }
        }
    }
}

const suprizleriCiz = () => {
    for (let i = 0; i < dusenSuprizler.length; i++) {
        const supriz = dusenSuprizler[i];
        if (supriz.status === 1) {
            ctx.beginPath();
            ctx.rect(supriz.x, supriz.y, 10, 10); // 10x10 boyutunda bir kare olarak süprizi çiziyoruz.
            ctx.fillStyle = "#FF0000"; // Süprizi kırmızı yapalım.
            ctx.fill();
            ctx.closePath();

            // Süprizi aşağı doğru hareket ettirelim.
            supriz.y += 2;

            // Eğer süpriz, çubuğa çarparsa:
            if (supriz.y >= cubukY && supriz.y <= cubukY + cubukYuksekligi &&
                supriz.x >= cubukX && supriz.x <= cubukX + cubukGenisligi) {
            
                supriz.status = 0; // Süprizi devre dışı bırakalım.
            
                // Çubuğu ya büyütelim ya da küçültebiliriz. Rastgele bir seçim yapalım.
                const buyut = Math.random() >= 0.5;  // 0.5'ten büyük ya da eşitse true, küçükse false döner.
            
                if (buyut && cubukGenisligi <= 100) {  // Çubuğu büyütmeyi sınırlayalım.
                    cubukGenisligi =  cubukGenisligi * 3;
                } else if (!buyut && cubukGenisligi >= 20) {  // Çubuğu küçültmeyi sınırlayalım.
                    cubukGenisligi = cubukGenisligi /2;
                }
            }
        }
    }
};

const topunKonumunuDegistir = () => {
    if (x + dx > width - 10 || x + dx < 10){
        dx = -dx;
        ballColor = "purple";
    }  

    if (y + dy < 10 ){ // yukarı carptıgında
        dy = -dy;
        ballColor = "pink";
    } else if (y + dy > cubukY - 10 && y + dy < cubukY + 10 && x > cubukX && x < cubukX + cubukGenisligi ){ // cubuga carptıgında
        dy = -dy;
        ballColor = "yellow";
    } else if (y + dy > height - 10){ // asagı carptıgında
        if (x < cubukX || x > cubukX + cubukGenisligi ) {
            can--;
        if(can === 0){
            ctx.font = "25px Verdana";
            ctx.fillStyle = "red";
            ctx.fillText = ("Game Oveerrr",width/2 - 50, height/2 + 20);
            clearInterval(interval);
            isGameOver = true;
            oyunBasladiMi = false;
            }
        }
        dy = -dy; 
        ballColor = "blue";
    }

    x += dx;
    y += dy;
}

const cubuguCiz = () => {
    ctx.beginPath();
    ctx.rect(cubukX, cubukY, cubukYuksekligi + 120, cubukGenisligi);
    ctx.fillStyle = "blue"
    ctx.fill();
    ctx.closePath();
}

const tuglaCiz = () => {
    for (let sutun = 0; sutun < tuglaSutunSayisi; sutun++){
        for (let satir = 0; satir < tuglaSatirSayisi; satir++){
            if (tuglalar[sutun][satir].status === 1){
                const tuglaX = sutun * (tuglaGenisligi + tuglaPadding) + tuglaOffSetLeft;
                const tuglaY = satir * (tuglaYuksekligi + tuglaPadding) + tuglaOffSetTop;

                tuglalar[sutun][satir].x = tuglaX;
                tuglalar[sutun][satir].y = tuglaY;

                ctx.beginPath();
                ctx.rect(tuglaX, tuglaY, tuglaGenisligi, tuglaYuksekligi);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

oyunuCiz();

const oyunuBaslat = () => {
    if (oyunBasladiMi === false){
        if (isGameOver){
            document.location.reload();
        }else {
            interval = setInterval(oyunuCiz, 10);
            oyunBasladiMi = true;
        }
    }else {
        clearInterval(interval);
        oyunBasladiMi = false;

        ctx.fill = "25px Arial"
        ctx.fillStyle = "black"
        ctx.fillText("Oyun Duraklatıldı", width/2 - 50, height/2 + 20); 
    }
}

function keydown(e){
    if (e.key === "Right" || e.key === "ArrowRight"){
        if (cubukX + 17 > width - cubukGenisligi) return;
        cubukX += 15;
    }else if (e.key === "Left" || e.key === "ArrowLeft"){
        if (cubukX - 5 < 0) return;
        cubukX -= 15;
    }
}

