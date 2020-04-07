
function init() {
    //console.log('fine here')
    let mouse = {
        click: false, //se esta oprimiendo el click?
        move: false, //se esta moviendo?
        pos: {x:0, y:0},
        pos_prev: false
    };
    
    // canvas
    let canvas = document.getElementById('drawing');
    let context = canvas.getContext('2d'); //se indica que se va a usar de canvas
    let width = window.innerWidth; //se obtiene el ancho de la pantalla
    let height = window.innerHeight; // alto

    // socket IO
    let socket = io();

    canvas.width = width;
    canvas.height = height;

    
    
    canvas.addEventListener('mousedown', (e) =>{
        mouse.click = true;
        //console.log(mouse);
    });

    canvas.addEventListener('mouseup', (e) => {
        mouse.click = false;
        //console.log(mouse);
    });

    canvas.addEventListener('mousemove', function (e) {
        mouse.pos.x = e.clientX / width; //se divide para que sea relativo/proporcional a cada pantalla donde se ejecute
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
        //console.log(mouse); 
      });
    
      //se reciben y pintan los datos recibidos por el server
      socket.on('draw_line', data => {
        let line = data.line;
        context.beginPath(); //donde empieza el trazo
        context.lineWidth = 2; 
        context.moveTo(line[0].x * width, line[0].y * height); //se pinta la primera pos y se multiplica por ancho y alto para que se redimensione el trazo de acuerdo a la resolución de cada ordenador
        context.lineTo(line[1].x * width, line[1].y * height); //se envian los datos siguientes, o previos
        context.stroke(); //donde termina el trazo
      });

      //función que revisa cada vez que se dibuja
      function mainLoop() {
        if(mouse.click && mouse.move && mouse.pos_prev) {
            //se emite el evento al server
            socket.emit('draw_line', { line: [mouse.pos, mouse.pos_prev] }); //se envia la posición actual y la previa
            mouse.move = false; //se indica que se ha dejado de mover 
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y }; //se actualiza la pos previa
        setTimeout(mainLoop, 25);
      }
    
      mainLoop();
}

document.addEventListener('DOMContentLoaded', init); //para saber si la pag ya cargo