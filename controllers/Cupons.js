const XLSX = require('xlsx');
const {Cupon} = require('../models');


exports.index = async(req, res) => {
    const detail = await Cupon.findAll();
    return res.render("index", {detail});
};


exports.import = async(req, res) => {
    const wb = XLSX.readFile(req.file.path);
    const sheets = wb.SheetNames;

    if (sheets.length > 0) {
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const cupons = data.map(row => ({
            name: row["name"],
            code: row["code"],
            quantity: row["quantity"],
            CardId: row["CardId"],
        }));
        await Cupon.bulkCreate(cupons);
    }

    res.json("added successfully");
};