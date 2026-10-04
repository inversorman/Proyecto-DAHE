/* ============================================================
   1. CARGAR EL JSON DE PRODUCTOS
   ============================================================ */
fetch("data/productos.json")
  .then(response => response.json())
  .then(productos => {

    /* ============================================================
       2. GENERAR LAS TARJETAS DE PRODUCTOS EN LA PÁGINA
       ============================================================ */

    const grid = document.querySelector(".grid-productos");

    productos.forEach(p => {

      // Cada tarjeta representa un producto
      const tarjeta = `
        <div class="tarjeta" data-producto="${p.nombre}">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <button class="btn-ver">Ver producto</button>
        </div>
      `;

      // Insertamos la tarjeta en el grid
      grid.innerHTML += tarjeta;
    });


    /* ============================================================
       3. CONFIGURAR EL MODAL PARA MOSTRAR CARRUSEL + INFORMACIÓN
       ============================================================ */

    // Seleccionamos todos los botones "Ver producto"
    document.querySelectorAll('.btn-ver').forEach(boton => {

      boton.addEventListener('click', function() {

        /* ------------------------------------------------------------
           A. IDENTIFICAR QUÉ PRODUCTO SE HA CLICKEADO
           ------------------------------------------------------------ */

        // Obtenemos la tarjeta donde se hizo clic
        const tarjeta = this.closest('.tarjeta');

        // Extraemos el nombre del producto desde el atributo data-producto
        const nombre = tarjeta.getAttribute('data-producto');

        // Buscamos el producto dentro del JSON
        const producto = productos.find(p => p.nombre === nombre);


        /* ------------------------------------------------------------
           B. INSERTAR LAS IMÁGENES DEL CARRUSEL
           ------------------------------------------------------------ */

        // Seleccionamos el contenedor del carrusel dentro del modal
        const carouselInner = document.getElementById("carousel-inner");

        // Limpiamos cualquier imagen previa del carrusel
        carouselInner.innerHTML = "";

        // Recorremos las imágenes del producto
        producto.imagenesCarrusel.forEach((img, index) => {

          // Cada imagen se convierte en un "carousel-item"
          const item = `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
              <img src="${img}" class="d-block w-100">
            </div>
          `;

          // Insertamos el item dentro del carrusel
          carouselInner.innerHTML += item;
        });


        /* ------------------------------------------------------------
           C. INSERTAR EL TÍTULO Y LA DESCRIPCIÓN DEL PRODUCTO
           ------------------------------------------------------------ */

        // Nombre del producto
        document.getElementById("modalTitulo").textContent = producto.nombre;

        // Texto de características
        document.getElementById("modalDescripcion").textContent = producto.descripcion;


        /* ------------------------------------------------------------
           D. MOSTRAR EL MODAL
           ------------------------------------------------------------ */

        document.getElementById('modal').style.display = 'block';
      });
    });


    /* ============================================================
       4. CERRAR EL MODAL
       ============================================================ */

    document.getElementById('cerrarModal').onclick = function() {
      document.getElementById('modal').style.display = 'none';
    };

  });
