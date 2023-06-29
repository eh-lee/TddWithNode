const Product = require("./../models/Product");
exports.createProduct = async (req, res, next) => {
    // 그냥 create method임.
    const sample = await Product.create(req.body);
    console.log("sample=======>", sample);
    res.status(201).json(sample);
};

// ======================================================
// exports.try = (req, res) => {
//     res.send("Router connected")
// }