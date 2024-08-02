export const isValidPrice = (price) => {
  // Check if price is a number and greater than 0
  return typeof price === 'number' && price > 0;
};

export const isValidUrl = (url) => {
  // Basic URL validation using regex
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9\-._]+)(:[0-9]+)?(\/.*)?$/;
  return urlPattern.test(url);
};
