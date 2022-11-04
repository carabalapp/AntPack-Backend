const User = require('../../models').Users
const Company = require('../../models').Company

function index(req, res) {
    let obj
    User.findAll( {
        attributes: { exclude: ['CompanyId'] },
        include : [{ model: Company }]
    })
        .then((data) => {
            data.forEach(x => {
                x.address = JSON.parse(x.address)
            });
            res.json(data)
        })
        .catch((error) => {
            res.json({error:error})
        })
}

async function store(req, res) {
    const data = req.body;
    
    let company = await Company.create(data.company)
    .then((data) => {
        return data
    })
    .catch((error) => {
        res.json({error:error})
    })
    data.CompanyId = company.id;

    await User.create(data)
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            res.json({error:error})
        })
}

function remove(req, res) {
    const id = req.body.id;

    User.destroy({ where: { id: id } })
        .then((data) => {
            res.json(id)
        })
        .catch((error) => {
            res.json({error:error})
        })
}

async function update(req, res) {
    const id = req.body.id;
    const data = req.body;
    delete data.id
    await Company.update(data.company,{
        where: {
          id: data.company.id
        }})
        .catch((error) => {
            res.json({error:error})
        })

    await User.update(data,{
        where: {
          id: id
        }})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            res.json({error:error})
        })
}

module.exports = {
    index: index,
    store: store,
    remove: remove,
    update: update,
}