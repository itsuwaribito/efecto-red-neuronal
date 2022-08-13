class Neuron {
    constructor(width,height) {
        this.width = width;
        this.height = height;
        this.radious = 2;
        this.x = -1;
        this.y = -1;
        this.angle = 0;
        this.color = [223,87,19];
        this.limit = 100;
        this.#randomOrigin();

        this.speed = this.#randomInteger(30,Math.min(width,height) * 0.8);
        this.#move()

        this.speed = this.#randomInteger(1,2);
    }
  
    draw(ctx, neurons) {
        const [r, g, b] = this.color;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.strokeStyle = `rgb(${r},${g},${b})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y , this.radious, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.save();

        for (let i = 0; i < neurons.length; i++) {
            const n = neurons[i];
            const dist = Math.hypot(n.x - this.x, n.y - this.y);

            if(dist < 200) {
                ctx.globalAlpha = (200 - dist) / 300;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(neurons[i].x, neurons[i].y);
                ctx.stroke();
            }
        }

        ctx.globalAlpha = 1;
        
        this.#move();
    }

    #move() {
        const x = this.x - Math.sin(this.angle) * this.speed;
        const y = this.y - Math.cos(this.angle) * this.speed;

        this.x = x;
        this.y = y;
        
        if((x < -this.limit || x > this.width + this.limit) || (y < -this.limit || y > this.height + this.limit)) {
            this.#randomOrigin()
        }
    }

    // Funcion para numero entero aleatorio entre 'min' y 'max'
    #randomInteger(min = 1, max = 1 ) {
        return Math.floor(this.#randomDecimal(min, max));
    }

    #randomDecimal(min = 1, max = 1 ) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min + 1) + min;
    }

    #randomOrigin() {
        let side = this.#randomInteger(0, 3);
        
        switch (side) {
            case 0: // TOP SIDE
                this.x = this.#randomInteger(-this.limit, this.width + this.limit);
                this.y = -this.limit;
                this.angle = this.#randomDecimal(Math.PI * 0.75, Math.PI * 1.25);
            break;
            case 1: // RIGHT SIDE
                this.x = this.width + this.limit;
                this.y = this.#randomInteger(-this.limit, this.width);
                this.angle = this.#randomDecimal(Math.PI * 0.25, Math.PI * 0.75);
            break;
            case 2: // BOTTOM SIDE
                this.x = this.#randomInteger(-this.limit, this.width + this.limit);
                this.y = this.height + this.limit;
                this.angle = this.#randomDecimal(Math.PI * 1.7 , Math.PI * 2.3);
            break;
            case 3: // LEFT SIDE
                this.x = -this.limit;
                this.y = this.#randomInteger(-this.limit, this.width);
                this.angle = this.#randomDecimal(Math.PI * 1.25, Math.PI * 1.75);
            break;
        }
    }
}
