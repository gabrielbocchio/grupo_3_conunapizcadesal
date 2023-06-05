window.onload = function() {
    let form = document.querySelector('#formulario');
    /* let submitButton = document.querySelector('.button'); */
  

   

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let errors = {};
  
      let name = document.querySelector('#name');
      let description = document.querySelector('#description');
      let price = document.querySelector('#price');
      let imagen = document.querySelector('#imagen');
     

  
      if (name.value === '') {
        name.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.name = 'El campo nombre no puede estar vacío';
      } else {
        name.style.border = 'none'
      }
      
      if (description.value === '') {
        description.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.description = 'El campo descripcion no puede estar vacío';
      }else {
        description.style.border = 'none'
      }
  
      if (price.value === '') {
        price.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.price = 'El campo precio no puede estar vacío';
      } else {
        price.style.border = 'none'
      }
  
      if (imagen.value === '') {
        imagen.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.imagen = 'El campo imagen no puede estar vacío';
      } else {
        // Validar la extensión de archivo permitida
        let allowedExtensions = ['.jpg', '.png', '.jpeg', '.JPG'];
        let fileExtension = imagen.value.substring(imagen.value.lastIndexOf('.')).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          imagen.style.border = '2px solid rgba(245, 134, 134, 0.76)';
          errors.imagen = 'La extensión del archivo no es válida. Solo se permiten archivos JPG, JPEG, PNG y GIF.';
        } 
      }
  
      if (Object.keys(errors).length >= 1) {
        let nameError = document.querySelector('#nameError');
        let descriptionError = document.querySelector('#descriptionError');
        let priceError = document.querySelector('#priceError');
        let imagenError = document.querySelector('#imagenError');
       

  
        nameError.innerText = errors.name || '';
        descriptionError.innerText = errors.description || '';
        priceError.innerText = errors.price || '';
        imagenError.innerText = errors.imagen || '';
      } else {
        // Si no hay errores, enviar el formulario
        
        form.submit();
      }
    });
  };
  