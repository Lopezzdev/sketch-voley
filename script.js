let alturaJugador1=0,alturaJugador2=0;
let tiempo=0,tiempoJugador=0,tiempoJugador2=0;
let posHorizontal=700,posHorizontal2=200;posHorizontalPelota=475,posHorizontalPelotaPrevia=0;
let rotacionPelota=0;indiceHorizontal=0;
let juegoON=false;
let puntos1=0,puntos2=0;
let xGlobo1,xGlobo2,yGlobo1=-220,yGlobo2=-300;

let movIzq=false,movIzq2=false;
let movDer=false,movDer2=false;
let orientacion=0,orientacion2=0;
let salto1On=false,salto2On=false;
let rotacionSalto=0,rotacionSalto2=0;

let sentidoPelota=false,pelotaBajando=false;
let alturaPelota=400,alturaPrevia=0,alturaInicial=0,alturaFinalPelota=0;
let triggerUp=false,triggerUp2=false;

let colVertical1,colHorizontal1,triggerCol1,contAux1=0;
let colVertical2,colHorizontal2,triggerCol2,contAux2=0;
let conteoCol=0,conteoCol2=0;retardoAux=0;

let velInicial=60;
let velocidadGeneral=11;

//Escalado de pantalla
let anchoJuego=1920;
let altoJuego=919;
let escalado;

ajustarEscala();
window.addEventListener("resize", ajustarEscala);
function ajustarEscala(){
    
    if(window.innerWidth/anchoJuego<window.innerHeight/altoJuego){
        escalado=(window.innerWidth)/anchoJuego*0.9;
    }else{
        escalado=(window.innerHeight)/altoJuego*0.9;
    }

    if(window.innerWidth/anchoJuego<1){
        document.getElementById("juego").style.cssText="transform:scale("+escalado+")";
    }

}


setInterval(() => {

    alturaPrevia=alturaPelota;
    posHorizontalPelotaPrevia=posHorizontalPelota;

    //Calculo altura pelota
    
    if(juegoON){
      alturaPelota=velInicial*tiempo-0.5*9.8*tiempo*tiempo+alturaInicial;
      tiempo+=0.15;
    }
    pelotaBajando=alturaPelota<alturaPrevia;

    //Calculo salto jugador 1
    if(salto1On){
      alturaJugador1=80*tiempoJugador-0.5*9.8*tiempoJugador*tiempoJugador;
      tiempoJugador+=0.15;
      rotacionSalto=tiempoJugador*21.8*1;
    }else{rotacionSalto=0;}

    //Calculo salto jugador 2
    if(salto2On){
      alturaJugador2=80*tiempoJugador2-0.5*9.8*tiempoJugador2*tiempoJugador2;
      tiempoJugador2+=0.15;
      rotacionSalto2=tiempoJugador2*21.8*1;
    }else{rotacionSalto2=0;}

    //Limites jugador 1
    if(posHorizontal2<=-35)movIzq2=false;
    if(posHorizontal2>=390){movDer2=false;rotacionSalto2=0;}

    //Limites jugador 2
    if(posHorizontal<=465){movIzq=false;rotacionSalto=0;}
    if(posHorizontal>=903)movDer=false;

    //Movimiento horizontal jugador 1
    if(movIzq){posHorizontal-=4;}
    if(movDer){posHorizontal+=4;}

    //Movimiento horizontal jugador 2
    if(movIzq2){posHorizontal2-=4;}
    if(movDer2){posHorizontal2+=4;}

    //Avance horizontal pelota
    posHorizontalPelota+=indiceHorizontal;

    //Colision con paredes
    if(posHorizontalPelota>955||posHorizontalPelota<0)indiceHorizontal=indiceHorizontal*-1;
    if(posHorizontalPelota<0){posHorizontalPelota=1;}
    if(posHorizontalPelota>955){posHorizontalPelota=954;}

    //Colision con red (costados)
    if(posHorizontalPelotaPrevia<=475&&posHorizontalPelota>=450&&alturaPelota<320||posHorizontalPelotaPrevia>=475&&posHorizontalPelota<=495&&alturaPelota<320)indiceHorizontal=indiceHorizontal*-1;
    if(posHorizontalPelotaPrevia<=475&&posHorizontalPelota>=450&&alturaPelota<320)posHorizontalPelota=450;
    if(posHorizontalPelotaPrevia>=475&&posHorizontalPelota<=495&&alturaPelota<320)posHorizontalPelota=495;

    //Colision con jugador 1
    colVertical1=(alturaPrevia>=alturaJugador1+90&&alturaPelota<=alturaJugador1+135)||(alturaPrevia<=alturaJugador1+145&&alturaPelota>=alturaJugador1+95);
    colHorizontal1=(posHorizontalPelota>posHorizontal+5&&posHorizontalPelota<posHorizontal+85)&&!salto1On||(posHorizontalPelota>posHorizontal-10&&posHorizontalPelota<posHorizontal+100)&&salto1On;

    if(colHorizontal1&&colVertical1&&!triggerCol1){
      juegoON=true;
      alturaInicial=alturaJugador1+135;tiempo=0;
      conteoCol++;
      triggerCol1=true;

      //Calculo del mov horizontal de la pelota
      indiceHorizontal=(posHorizontalPelota-posHorizontal-45)/7;//5

      //Calculo de la velocidad inicial
      velInicial=60+(16.5-tiempoJugador)*2.5;//5

      if(tiempoJugador==0||tiempoJugador>16.5)velInicial=60;

      velInicial=velInicial-Math.abs(indiceHorizontal)*1.5;

      if(movDer)indiceHorizontal+=2;
      if(movIzq)indiceHorizontal-=2;

    }

    if(triggerCol1){
      contAux1++;
      if(contAux1>30){
        triggerCol1=false;contAux1=0;
      }
    }

    //Colision con jugador 2
    colVertical2=(alturaPrevia>=alturaJugador2+90&&alturaPelota<=alturaJugador2+135)||(alturaPrevia<=alturaJugador2+145&&alturaPelota>=alturaJugador2+95);
    colHorizontal2=(posHorizontalPelota>posHorizontal2+5&&posHorizontalPelota<posHorizontal2+85)&&!salto2On||(posHorizontalPelota>posHorizontal2-10&&posHorizontalPelota<posHorizontal2+100)&&salto2On;

    if(colHorizontal2&&colVertical2&&!triggerCol2){
      juegoON=true;
      alturaInicial=alturaJugador2+135;tiempo=0;
      conteoCol2++;
      triggerCol2=true;

      //Calculo del mov horizontal de la pelota
      indiceHorizontal=(posHorizontalPelota-posHorizontal2-45)/7;//5

      //Calculo de la velocidad inicial
      velInicial=60+(16.5-tiempoJugador2)*3;//5

      if(tiempoJugador2==0||tiempoJugador2>16.5)velInicial=60;

      velInicial=velInicial-Math.abs(indiceHorizontal)*1.5;

      if(movDer2)indiceHorizontal+=2;
      if(movIzq2)indiceHorizontal-=2;

    }

    if(triggerCol2){
      contAux2++;
      if(contAux2>30){
        triggerCol2=false;contAux2=0;
      }
    }

    //Finalizacion de punto con pelota en 0
    if(alturaPelota<0){
      tiempo=0;alturaInicial=0;
      if(velInicial>20){velInicial=20;indiceHorizontal*=0.5;}
      else{velInicial-=4;indiceHorizontal*=0.3;}

      if(velInicial<=0){
        juegoON=false;
        velInicial=0;
        indiceHorizontal=0;
        alturaPelota=300;

        if(posHorizontalPelota<460){        //Punto jugador derecho
          posHorizontalPelota=700;
          puntos2++;
        }else{
          if(posHorizontalPelota>490){       //Punto jugador izquierdo
            posHorizontalPelota=300;
            puntos1++;
          }
        }

        if(puntos1>=7||puntos2>=7){
          alturaPelota=400;
          posHorizontalPelota=475;
        }

      }

    }


    //Victorias

    if(puntos1>=7){ //Victoria jugador 1
      xGlobo1=320;
      xGlobo2=60;
      yGlobo1+=3;yGlobo2+=3;
      posHorizontal=750;
      posHorizontal2=150;
    }
    if(puntos2>=7){ //Victoria jugador 2
      xGlobo1=620;
      xGlobo2=900;
      yGlobo1+=3;yGlobo2+=3;
      posHorizontal=750;
      posHorizontal2=150;
    }

    if(yGlobo2>820){
      puntos1=0;puntos2=0;
      yGlobo1=-220;yGlobo2=-300;
      alturaPelota=400;posHorizontalPelota=475;
    }

    //Reset salto jugador 1
    if(alturaJugador1<0){tiempoJugador=0;salto1On=false;}
    //Reset salto jugador 2
    if(alturaJugador2<0){tiempoJugador2=0;salto2On=false;}

    //Orientacion jugador 1
    if(movIzq==true&&movDer==false){orientacion=180;}
    if(movIzq==false&&movDer==true){orientacion=0;}
    
    //Orientacion jugador 2
    if(movIzq2==true&&movDer2==false){orientacion2=180;}
    if(movIzq2==false&&movDer2==true){orientacion2=0;}

    //Display estados jugador 1
    if((movIzq||movDer)&&!(movIzq&&movDer)||salto1On){
      document.getElementById("movON").style.cssText="display:flex;";document.getElementById("movOFF").style.cssText="display:none;";
    }else{
      document.getElementById("movON").style.cssText="display:none;";document.getElementById("movOFF").style.cssText="display:flex;";
    }

    //Display estados jugador 2
    if((movIzq2||movDer2)&&!(movIzq2&&movDer2)||salto2On){
      document.getElementById("movON2").style.cssText="display:flex;";document.getElementById("movOFF2").style.cssText="display:none;";
    }else{
      document.getElementById("movON2").style.cssText="display:none;";document.getElementById("movOFF2").style.cssText="display:flex;";
    }

    //Rotación pelota
    if(juegoON)rotacionPelota+=4;
    if(rotacionPelota==360)rotacionPelota=0;

    //Display pelota
    if(alturaPelota<670){
      document.getElementById("pelota").style.cssText="display:flex;bottom:"+(alturaPelota+3)+"px;left:"+posHorizontalPelota+"px;transform:rotate("+rotacionPelota+"deg);";
      document.getElementById("flecha").style.cssText="display:none;";
    }else{
      document.getElementById("pelota").style.cssText="display:none;";
      document.getElementById("flecha").style.cssText="display:flex;left:"+posHorizontalPelota+"px";
    }

    //Display jugador 1
    document.getElementById("jugador1").style.cssText="bottom:"+ (alturaJugador1) +"px;left:"+posHorizontal+"px;transform: rotateY("+orientacion+"deg)rotateZ("+rotacionSalto+"deg);";
    //Display jugador 2
    document.getElementById("jugador2").style.cssText="bottom:"+ (alturaJugador2) +"px;left:"+posHorizontal2+"px;transform: rotateY("+orientacion2+"deg)rotateZ("+rotacionSalto2+"deg);";

    //Display números
    document.getElementById("num1").style.cssText="background-image: url(./media/nums/"+puntos1+".png);"
    document.getElementById("num2").style.cssText="background-image: url(./media/nums/"+puntos2+".png);"

    //Display globos
    document.getElementById("globo1").style.cssText="bottom:"+yGlobo1+"px;left:"+xGlobo1+"px;";
    document.getElementById("globo2").style.cssText="bottom:"+yGlobo2+"px;left:"+xGlobo2+"px;";

    //Display centro 1
    document.getElementById("linea").style.cssText="bottom:"+alturaJugador1+"px;left:"+(posHorizontal+65)+"px;";
    document.getElementById("linea2").style.cssText="bottom:0px;left:"+(posHorizontalPelota+20)+"px;";

  }, velocidadGeneral);

//Flechas jugador 1 (izquierda)
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    movIzq=true;
  }
});
document.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowLeft') {
    movIzq=false;
  }
});
//Flechas jugador 1 (derecha)
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
      movDer=true;
  }
});
document.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowRight') {
      movDer=false;
  }
});
//Flechas jugador 1 (arriba)
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') {
      movUp=true;if(!triggerUp){salto1On=true;}triggerUp=true;
  }
});
document.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowUp') {
      movUp=false;triggerUp=false;
  }
});


//Flechas jugador 2 (izquierda)
document.addEventListener('keydown', function(event) {
  if (event.key === 'a'||event.key === 'A') {
    movIzq2=true;
  }
});
document.addEventListener('keyup', function(event) {
  if (event.key === 'a'||event.key === 'A') {
    movIzq2=false;
  }
});
//Flechas jugador 2 (derecha)
document.addEventListener('keydown', function(event) {
  if (event.key === 'd'||event.key === 'D') {
      movDer2=true;
  }
});
document.addEventListener('keyup', function(event) {
  if (event.key === 'd'||event.key === 'D') {
      movDer2=false;
  }
});
//Flechas jugador 2 (arriba)
document.addEventListener('keydown', function(event) {
  if (event.key === 'w'||event.key === 'W') {
      movUp2=true;if(!triggerUp2){salto2On=true;}triggerUp2=true;
  }
});
document.addEventListener('keyup', function(event) {
  if (event.key === 'w'||event.key === 'W') {
      movUp2=false;triggerUp2=false;
  }
});