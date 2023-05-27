const productModel = require("./../models/Product");
exports.createProduct = (req, res, next) => {
    // 그냥 create method임.
    const sample = productModel.create(req.body);
    res.status(201).json(sample);
};

// ======================================================
// exports.try = (req, res) => {
//     res.send("Router connected")
// }