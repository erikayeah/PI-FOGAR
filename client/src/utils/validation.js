// validations.js

const validations = (formData) => {
  const errors = {};

  // Name
  if (!/^[A-Za-z]+$/.test(formData.name)) {
    errors.name = "El nombre debe contener solo letras";
  }

  if (formData.name === "") {
    errors.name = "El nombre es obligatorio";
  }

  // Image
  if (!/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(formData.image)) {
    errors.image = "Debe ser una URL válida";
  }

  if (formData.image === "") {
    errors.image = "La URL es obligatoria";
  }

  // Life, Attack, Defense
  const numberFields = ['life', 'attack', 'defense'];

  numberFields.forEach((field) => {
    if (isNaN(formData[field])) {
      errors[field] = `El campo ${field} debe ser un número`;
    }

    if (formData[field] === "") {
      errors[field] = `El campo ${field} es obligatorio`;
    }
  });


   // Speed, Height, Weight
   const numberExtras = ['speed', 'weight', 'height'];

   numberExtras.forEach((field) => {
     if (isNaN(formData[field])) {
       errors[field] = `El campo ${field} debe ser un número`;
     }

   });

  return errors;
};

export default validations;
