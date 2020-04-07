module.exports = io => {
    // se almacena el historial de lo dibujado
    let line_history = [];

    //se abre la conección 
    io.on('connection', socket => {
        console.log('new user connect');
        //se recorre el historial de coordenadas para que los user que ingresen nuevos tengan a disposición este
        for (let i in line_history) {
            socket.emit('draw_line', {line: line_history[i]});
        }


        // se escucha los eventos de parte del cliente
        socket.on('draw_line', data => {
            console.log(data);
            line_history.push(data.line); //se almacena en el arreglo
            //draw_line es diferente al draw_line emitido por el cliente
            io.emit('draw_line', { line: data.line }); //se emite a todos los usuarios
          }); 
    });

    
};