const models = require('../../models');

const index = function (req, res) {
  req.query.limit = req.query.limit || 10; // limit을 쿼리로 받으면 그대로 쓰고, 쿼리로 못받으면 10으로 설정한다.
  const limit = parseInt(req.query.limit, 10); // limit이 String으로 오는데, 10진수의 Int형 으로 바꾸어 준다.
  if (Number.isNaN(limit)) {//Number.isNaN()은 숫자가 아니면, true를 반환.
      return res.status(400).end();
  } // limit이 숫자가 아닌경우, 400에러를 반환한다.

  models.Menu
      .findAll({
        limit: limit
      })
      .then(menus => {
        res.json(menus)
      });
};

const show = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  models.Menu.findOne({
    where: {id}
  }).then(menu => {
    if (!menu) return res.status(404).end();
    console.log(menu)
    res.json(menu);
  })
}

const destroy = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  models.Menu.destroy({
    where: {id}
  }).then(() => {
    res.status(204).end();
  });
}

const create = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const rating = req.body.rating;
  if (!name) return res.status(400).end();

  models.Menu.create({name, price, rating})
      .then(menu => {
        res.status(201).json(menu);
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
  const price = req.body.price;
  const rating = req.body.rating;
  console.log("name : ", name, "  price : ", price, "  rating : ", rating);
  if (!name || !price || !rating) return res.status(400).end();

  models.Menu.findOne({where: {id}})
      .then(menu => {
        if (!menu) return res.status(404).end();

        menu.name = name;
        menu.price = price;
        menu.rating = rating;
        menu.save()
            .then(_ => {
              res.json(menu);
            })
            .catch(err => {
              if(err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
              };
              res.status(500).end();
            })
      })
}

module.exports = { index, create, show, destroy, update };
