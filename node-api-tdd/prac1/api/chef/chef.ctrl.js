const models = require('../../models');

const index = function (req, res) {
  req.query.limit = req.query.limit || 10; // 리퀘스트의 쿼리의 limit? 이 있다면, limit까지 리턴, limit이 없으면 10번째 까지 리턴
  const limit = parseInt(req.query.limit, 10);
  if(Number.isNaN(limit)) {
    return res.status(400).end();
  }

  models.Chef
    .findAll({
      limit: limit
    })
    .then(chefs => {
      res.json(chefs);
    });
};

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

module.exports = { create, index };
