const Product = require("../models/product")

const getAllProducts = async (req, res) => {
    console.log(req.query);
    // to get data from database
    // const Products =  await Product.find({});

    // for key value tha doesnt exist and if we still want data ingoring wrong query
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};
    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let apiData = Product.find(queryObject)

    if (sort) {
        // let sortFix = sort.replace("," , " ");
        let sortFix = sort.split(",").join(" ");
        // queryObject.sort = sortFix;
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        // let selectFix = select.replace("," , " ");
        let selectFix = select.split(",").join(" ");
        // queryObject.sort = sortFix;
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;
    
    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);

    // const Products = await Product.find(queryObject).sort("name -price");
    const Products = await apiData;
    res.status(200).json({ Products, nbHits:Products.length });

    // req.query passes whatever we give in ?key=value in uri and then find sorts according to it we can use & in uri for more than one query(key and value)
    console.log(req.query);

    // res.status(200).json({msg: "I am getAllProducts"})

    // console.log(Products);
}

const getAllProductsTest = async (req, res) => {
    const Products = await Product.find({}).select("name");
    res.status(200).json({ Products })
    // res.status(200).json({msg: "I am getAllProductsTest"})
}


module.exports = { getAllProducts, getAllProductsTest };