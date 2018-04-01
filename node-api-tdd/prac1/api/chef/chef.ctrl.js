const models = require('../../models');

const create = (req, res) => {
  const name = req.body.name;
  const career = req.body.career;
  if (!name && !career) return res.status(400).end();

  models.Chef.create({name, career})
      .then(chef => {
        res.status(201).json(chef);
      })
      .catch(err => {
        if(err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).end();
        };
        res.status(500).end();
      });
}

module.exports = { create };
