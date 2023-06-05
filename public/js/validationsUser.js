window.onload = function() {
    let form = document.querySelector('#formulario');
   /*  let submitButton = document.querySelector('.button'); */
  

    form.focus();

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let errors = {};
  
      let firstname = document.querySelector('#firstname');
      let lastname = document.querySelector('#lastname');
      let mail = document.querySelector('#mail');
      let pass = document.querySelector('#pass');
      let pass2 = document.querySelector('#pass2');
      let avatars = document.querySelector('#avatars');
  
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (firstname.value === '') {
        firstname.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.firstname = 'El campo Nombre no puede estar vacío';
      } else {
        firstname.style.border = 'none'
      }
      
      if (lastname.value === '') {
        lastname.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.lastname = 'El campo Apellido no puede estar vacío';
      }else {
        lastname.style.border = 'none'
      }
  
      if (mail.value === '') {
        mail.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.mail = 'El campo Mail no puede estar vacío';
      } else if (!regex.test(mail.value)) {
        mail.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.mail = 'Debes escribir un formato de correo válido';
      }else {
        mail.style.border = 'none'
      }
  
      if (pass.value === '') {
        pass.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.pass = 'El campo Contraseña no puede estar vacío';
      } else if (pass.value.length <8){
        pass.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.pass = 'La contraseña no puede tener menos de 8 caracteres';
      }
      else {
        pass.style.border = 'none'
      }
  
      if (pass2.value === '') {
        pass2.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.pass2 = 'El campo Repetir Contraseña no puede estar vacío';
      } else if (pass2.value !== pass.value) {
        pass2.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.pass2 = 'La contraseña debe ser idéntica';
      }else {
        pass2.style.border = 'none'
      }
  
      if (avatars.value === '') {
        avatars.style.border = '2px solid rgba(245, 134, 134, 0.76)';
        errors.avatars = 'El campo imagen no puede estar vacío';
      } else {
        // Validar la extensión de archivo permitida
        let allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.JPG'];
        let fileExtension = avatars.value.substring(avatars.value.lastIndexOf('.')).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          avatars.style.border = '2px solid rgba(245, 134, 134, 0.76)';
          errors.avatars = 'La extensión del archivo no es válida. Solo se permiten archivos JPG, JPEG, PNG y GIF.';
        } 
      }
  
      if (Object.keys(errors).length >= 1) {
        let firstnameError = document.querySelector('#firstnameError');
        let lastnameError = document.querySelector('#lastnameError');
        let emailError = document.querySelector('#emailError');
        let passError = document.querySelector('#passError');
        let pass2Error = document.querySelector('#pass2Error');
        let avatarsError = document.querySelector('#avatarsError');
        

  
        firstnameError.innerText = errors.firstname || '';
        lastnameError.innerText = errors.lastname || '';
        emailError.innerText = errors.mail || '';
        passError.innerText = errors.pass || '';
        pass2Error.innerText = errors.pass2 || '';
        avatarsError.innerText = errors.avatars || '';
      } else {
        // Si no hay errores, enviar el formulario
        form.submit();
      }
    });
  };
  