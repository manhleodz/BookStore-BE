const XLSX = require('xlsx');
const {Products} = require('../models');

exports.index = async(req, res) => {
    const products = await Products.findAll();
    return res.render("index", {products});
};

exports.import = async(req, res) => {
    const wb = XLSX.readFile(req.file.path);
    const sheets = wb.SheetNames;

    if (sheets.length > 0) {
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const products = data.map(row => ({
            name: row["Name"],
            image: row["Image"],
            price: row["price"],
            quantity: row["quantity"],
            sold: row["sold"],
        }));
        await Products.bulkCreate(products);
    }

    res.json("added successfully");
};