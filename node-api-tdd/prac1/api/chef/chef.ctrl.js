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

const show = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  models.Chef.findOne({
    where: {id}
  }).then(chef => {
    if (!chef) return res.status(404).end();
    console.log(chef);
    res.json(chef);
  })
}

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

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log('id : ', id);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  const career = req.body.career;
  console.log('name : ', name, '| career : ', career);
  if (!name && !career) return res.status(400).end();

  models.Chef.findOne({
    where: {id}
  }).then(chef => {
    if (!chef) return res.status(404).end();

    chef.name = name;
    chef.career = career;
    chef.save()
        .then(_ => {
          res.json(chef);
        })
        .catch(err => {
          if(err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).end();
          };
          res.status(500).end();
        })
  })
}

module.exports = { create, index, show, update };
