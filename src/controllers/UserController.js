function generateAccessToken(user) {
    // expires after half and hour (600 seconds = 10 minutes)
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: 600 });
}

exports.post = (req, res, next) => {
    res.status(201).send('Rota POST!');
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Rota PUT com ID! --> ${id}`);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota DELETE com ID! --> ${id}`);
};

exports.get = (req, res, next) => {
    res.status(200).send('Rota GET!');
};

exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota GET com ID! ${id}`);
};

exports.login = (request, response, next) => {
    const username = request.body.username;
    const pwd = request.body.password;
    // users hardcoded for simplicity, store in a db for production applications
    const users = [
        { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
        { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    ];
    const user = users.find(u => u.username === username && u.password === pwd);

    if (!user) { return response.status(500).json({ auth: false, message: 'Login inválido!' }); }
    return response.json({ auth: true, token: generateAccessToken(user.id), user: { id: user.id, username: user.username, role: user.role } });
};