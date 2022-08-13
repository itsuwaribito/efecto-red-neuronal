const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

canvas.height = 750;
canvas.width = window.innerWidth * 0.5;

let neurons = new Array(100);

for (let i = 0; i < neurons.length; i++) {
  neurons[i] = new Neuron(canvas.width, canvas.height);
}
animate();

canvas.style.backgroundColor = '#433733';
function animate(time) {
  canvas.width = window.innerWidth * 0.5;
  
  for (let i = 0; i < neurons.length; i++) {
    neurons[i].draw(ctx, neurons);
  }

  ctx.restore();
  requestAnimationFrame(animate);
}
