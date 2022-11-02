function index(req, res) {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM users', (err, users) => {
            if(err){
                console.log(err);
            }
            res.send(users)
        })
    })
}

function store(req, res) {
    const data = req.body;

    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
            console.log(rows);
        })
    })

    res.send(data)
}

function remove(req, res) {
    const id = req.body.id;

    req.getConnection((err, conn)=>{
        conn.query('DELETE FROM users WHERE ID = ?', [id], (err, rows) => {
            console.log(rows);
        })
    })

    res.send(id)
}

function update(req, res) {
    const id = req.body.id;
    const data = req.body;
    delete data.id

    req.getConnection((err, conn)=>{
        conn.query('UPDATE users SET ? WHERE ID = ?', [data,id], (err, rows) => {
            console.log(rows);
        })
    })

    res.send(data)
}

module.exports = {
    index: index,
    store: store,
    remove: remove,
    update: update,
}