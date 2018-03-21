const models = require('../../models');

let users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]

exports.index = (req, res) => {
  models.User.findAll()
      .then(users => res.json(users));
};

exports.show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ error: "Incorrect id" });
  }

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({error: 'No User'});
    }

    return res.json(user);
  })


};

exports.destroy = (req, res) => {
  const id = parseInt(req.params.id, 10); //10은 왜 있는걸까...?
  if (!id) {
    return res.status(400).json({error: 'Incorrect id'});
  }

  models.User.destroy({
    where: {
      id: id
    }
  }).then(() => res.status(204).send());
};

exports.create = (req, res) => {
  const name = req.body.name || '';
  if (!name.length) {
    return res.status(400).json({error: 'Incorrect name'});
  }

  models.User.create({
    name: name
  }).then((user) => res.status(201).json(user))
};

exports.update = (req, res) => {
  res.send();
}
