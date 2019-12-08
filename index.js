(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
  
    // Definisi verteks dan buffer
    var vertices = new Float32Array(
      [
          //line
          -1.0, +0.5,     0.0, 1.0, 0.0,
          -0.8, +0.5,     0.0, 0.0, 1.0,
          -0.5, -0.1,     0.0, 1.0, 0.0,
          -0.5, +0.5,     0.0, 0.0, 1.0,
          -0.3, +0.5,     0.0, 0.0, 1.0,

          -0.3, -0.5,     0.0, 1.0, 0.0,
          -0.5, -0.5,     0.0, 0.0, 1.0,
          -0.8, +0.1,     0.0, 1.0, 0.0,
          -0.8, -0.5,     0.0, 1.0, 0.0,
          -1.0, -0.5,     0.0, 0.0, 1.0,

          //segitiga initiate
          //persegi ke-1
          -0.0, +0.5,     0.0, 0.0, 1.0,
          -0.0, -0.5,     0.0, 0.0, 1.0,
          +0.2, -0.5,     0.0, 0.0, 1.0,
          //AAAAAAAAA
          -0.0, +0.5,     0.0, 1.0, 0.0,
          +0.2, -0.5,     0.0, 1.0, 0.0,
          +0.2, +0.5,     0.0, 1.0, 0.0,

          //persegi ke-2
          +0.5, +0.5,     0.0, 1.0, 0.0,
          +0.5, -0.5,     0.0, 1.0, 0.0,
          +0.7, -0.5,     0.0, 1.0, 0.0,
          //ah yes we are doing tri point
          +0.5, +0.5,     0.0, 0.0, 1.0,
          +0.7, -0.5,     0.0, 0.0, 1.0,
          +0.7, +0.5,     0.0, 0.0, 1.0,

          //jajar genjang
          +0.2, +0.5,     0.0, 1.0, 0.0,
          +0.2, +0.1,     0.0, 1.0, 0.0,
          +0.5, -0.5,     0.0, 1.0, 0.0,
          //miring 100
          +0.5, -0.5,     0.0, 1.0, 0.0,
          +0.5, -0.1,     0.0, 1.0, 0.0,
          +0.2, +0.5,     0.0, 1.0, 0.0
      ]
  );

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      2,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    gl.useProgram(program);

    var thetaLoc = gl.getUniformLocation(program, 'theta');
    var theta = 0;
    var thspd = 0.01;
    var scaleLoc = gl.getUniformLocation(program, 'scale');
    var scale = 1;
    var membesar = 1;
    var transLoc = gl.getUniformLocation(program, 'translate');
    var transright = -0.45;
    var transleft = 0.6;

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(1.0, 1.0, 1.0, 1.0);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      if(theta >= 5) thspd = -0.0137;
      else if(theta < 0) thspd = 0.0137;
      theta += Math.PI * thspd;
      console.log('hmmm' + theta);

      gl.uniform1f(transLoc, transleft);
      gl.uniform1f(thetaLoc, theta);
      gl.uniform1f(scaleLoc, 1.0);
      gl.drawArrays(gl.LINE_LOOP, 0, 10);
      

      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale = scale + (membesar * 0.0137);

      gl.uniform1f(transLoc, transright);
      gl.uniform1f(thetaLoc, 0.0);
      gl.uniform1f(scaleLoc, scale);
      gl.drawArrays(gl.TRIANGLES, 10, 18); 
      
      requestAnimationFrame(render);
    }
    render();
  }

})();
