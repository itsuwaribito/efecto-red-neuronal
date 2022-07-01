let puntos = [];
let ancho = 1300;
let alto = 750;

function setup() {
  
  createCanvas(ancho, alto);
  
  for (let i=1;i <= 250; i++) {
    
    let inicio = orillaRandom();
    let final = orillaRandom();
        
    let punto = {
      // color: '#DF5713',
      color: [223,87,19],
      X: inicio.x,
      Y: inicio.y,
      inicio,
      final,
      direccion() {
        let dy = this.final.y-this.Y
        let dx = this.final.x-this.X
        let yi = 0;
        let xi = 0;
        let yr = 0;
        let xr = 0;
        
        if(dy > 0) {
          yi = 1;
        } else {
          dy = (-1)*dy;
          yi =-1;
        }
        
        if(dx > 0) {
          xi = 1;
        } else {
          dx = (-1)*dx;
          xi =-1;
        }
        
        if(dx >= dy) {
          yr = 0;
          xr = xi;
        } else {
          xr = 0;
          yr = yi;
          
          let k = dx;
          dx = dy;
          dy = k;
        }
        
        this.avr = 2 * dy;
        this.av = this.avr - dx;
        this.avi = this.av - dx;
        this.dy = dy;
        this.dx = dx;
        this.yi = yi;
        this.xi = xi;
        this.yr = yr;
        this.xr = xr;
      },
      mover() {
        // console.log('mueve')
        let x = this.X;
        let y = this.Y;
        
//         if(random(1,1000) < 2) {
//           this.color = [
//             round(random(0,255)),
//             round(random(0,255)),
//             round(random(0,255))
//           ];
//         }
        
        if(this.av >= 0) {
          this.X = x+this.xi;
          this.Y = y+this.yi;
          this.av = this.av + this.avi;
        } else {
          this.X = x+this.xr;
          this.Y = y+this.yr;
          this.av = this.av + this.avr;
        }
        
        if(this.X == this.final.x && this.Y == this.final.y) {
          this.inicio = orillaRandom();
          this.final = orillaRandom();
          
          this.X = this.inicio.x;
          this.Y = this.inicio.y;
        
          this.direccion();
        }
        
      },
      inicial() {
        let iteraciones = round(random(100,400));
        
        // console.log(iteraciones)
        
        for(let i=1; i<iteraciones;i++) {
          this.mover()
        }
      },
    }
    
    punto.direccion();
    punto.inicial();
    
    puntos.push(punto);
  };
    
}

function orillaRandom() {
  let inicio = random([0,1,2,3]);
  let Z = round(random(1,ancho));
  let lados = [0,ancho,0,alto];
  
  let punto = createVector(0,0);
  
  
  
  if(inicio < 2) {
    punto = createVector(lados[inicio], Z);
  }
  else {
    punto = createVector(Z, lados[inicio]);
  }
  
  
  
  return punto;
  
}

function draw() {
  
  // frameRate(5)
  background('#433733');
  
  for(p of puntos) {
    
    for(p2 of puntos) {
      if(p.X != p2.X && p.Y != p2.Y) {
        let dis = sqrt(sq(p.X-p2.X) + sq(p.Y-p2.Y));
        let maximo = 200;
        if(dis <= maximo) {
          let alpha = (maximo-dis)/maximo;
          if(alpha > 0.1) {
            alpha = 0.1;
          }

          strokeWeight(1);
          stroke('rgba('+p.color[0]+','+p.color[1]+','+p.color[2]+','+alpha+')');
          // stroke(color(p.color[0],p.color[1],p.color[2],alpha));
          line(p.X, p.Y, p2.X, p2.Y);
        }
      }
    }
    
    stroke(color(p.color));
    strokeWeight(5);
    point(p.X,p.Y);
    
    
//     stroke('rgba(0,255,0,0.15)');
//     line(p.inicio.x,p.inicio.y,p.final.x,p.final.y);
//     stroke(color('green'));
//     point(p.final);
    
    
    p.mover();
  }
  
  
}