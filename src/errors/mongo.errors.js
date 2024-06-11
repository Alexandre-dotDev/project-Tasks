const notFoundErros = (res) => {
  res.status(404).send(`Este dado não foi localizado no Database.`);
};

module.exports = {
  notFoundErros,
};
