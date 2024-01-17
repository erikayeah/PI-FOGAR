const validations = (formData) => {
  const errors = {};

  // Name
  if (!/^[A-Za-z]+$/.test(formData.name)) {
    errors.name = "Name must be only letters";
  }

  if (formData.name === "") {
    errors.name = "Name is required";
  }

  if (formData.name.length > 15) {
    errors.name = "Name must not be more than 15 characters";
  }

  if (formData.name.length < 3) {
    errors.name = "Name must be more than 2 characters";
  }

  // Image
  if (!/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(formData.image)) {
    errors.image = "URL must be valid";
  }

  if (formData.image === "") {
    errors.image = "URL is required";
  }

  // Life, Attack, Defense
  const numberFields = ["life", "attack", "defense"];

  numberFields.forEach((field) => {
    if (isNaN(formData[field])) {
      errors[field] = `${field} must be a number`;
    }

    if (formData[field] === "") {
      errors[field] = `${field} is required`;
    }
  });

  const numberExtras = ["speed", "weight", "height"];

  numberExtras.forEach((field) => {
    if (isNaN(formData[field])) {
      errors[field] = `${field} must be a number`;
    }
  });

  const totalStats = ["life", "attack", "defense", "speed"];
  const totalStatsSum = totalStats.reduce((sum, field) => {
    return sum + (formData[field] ? parseFloat(formData[field]) : 0);
  }, 0);

  if (totalStatsSum > 250) {
    errors.totalStats =
      "Sum of life, attack, defense and speed cannot exceed 250 in total";
  }

  return errors;
};

export default validations;
