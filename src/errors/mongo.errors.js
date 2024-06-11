const notFoundErros = (res) => {
  res.status(404).send(`Este dado não foi localizado no Database.`);
};

const objectIdCastError = (res) => {
  res.status(500).send("Este dado não foi encontrado no Database.");
};

module.exports = {
  notFoundErros,
  objectIdCastError,
};
