const XLSX = require('xlsx');
const {DetailProduct} = require('../models');


exports.index = async(req, res) => {
    const detail = await DetailProduct.findAll();
    return res.render("index", {detail});
};


exports.import = async(req, res) => {
    const wb = XLSX.readFile(req.file.path);
    const sheets = wb.SheetNames;

    if (sheets.length > 0) {
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const detail = data.map(row => ({
            ratingstars: row["ratingstars"],
            author: row["author"],
            description	: row["description	"],
            release: row["release"],
            publisher: row["publisher"],
        }));
        await DetailProduct.bulkCreate(detail);
    }

    res.json("added successfully");
};