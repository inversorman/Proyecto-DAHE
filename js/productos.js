fetch("data/productos.json")
  .then(response => response.json())
  .then(productos => {
    const grid = document.querySelector(".grid-productos");

    productos.forEach(p => {
      const tarjeta = `
        <div class="tarjeta" data-producto="${p.nombre}">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <button class="btn-ver">Ver producto</button>
        </div>
      `;
      grid.innerHTML += tarjeta;
    });

    document.querySelectorAll('.btn-ver').forEach(boton => {
      boton.addEventListener('click', function() {
          const tarjeta = this.closest('.tarjeta');
          const nombre = tarjeta.getAttribute('data-producto');

          let pdfSrc = "";

          if (nombre === "Milano") {
            pdfSrc = "assets/fichasTecnicas/80_150_46_Milano.pdf";
          } else if (nombre === "Roma") {
            pdfSrc = "assets/fichasTecnicas/roma.pdf";
          } else {
            pdfSrc = "assets/fichasTecnicas/default.pdf";
          }

          document.getElementById('modalPDF').src = pdfSrc;
          document.getElementById('modal').style.display = 'block';
      });
    });
  });
