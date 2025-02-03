const Model = require('../models/Model');

class Controller {
    constructor() {
        this.model = new Model();
    }

    getData(req, res) {
        this.model.fetchData((err, data) => {
            if (err) {
                res.status(500).json({ error: "Database error" });
            } else {
                res.json(data);
            }
        });
    }
}

module.exports = Controller;
