const XLSX = require('xlsx');
const {ImageProducts} = require('../models');


exports.index = async(req, res) => {
    const detail = await ImageProducts.findAll();
    return res.render("index", {detail});
};


exports.import = async(req, res) => {
    const wb = XLSX.readFile(req.file.path);
    const sheets = wb.SheetNames;

    if (sheets.length > 0) {
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const images = data.map(row => ({
            path: row["path"],
            DetailProductId: row["DetailProductId"],
        }));
        await ImageProducts.bulkCreate(images);
    }

    res.json("added successfully");
};