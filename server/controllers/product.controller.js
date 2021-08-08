const formidable = require("formidable");
const { extend } = require("lodash");
const fs = require("fs");
const Product = require("./../models/product.model");

const create = (req, res, next) => {
  let form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).send({ error: "Image upload failed" });
    try {
      let product = new Product(fields);
      if (files.photo) {
        // 1 kB = 1000
        // 1 mB = 1000000
        if (files.photo.size > 1000000)
          return res
            .status(400)
            .send({ error: "Upload failed, Max Size <= 1MB" });

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      await product.save();
      product.photo = undefined;
      return res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  });
};

const productById = async (req, res, next, id) => {
  try {
    const product = await Product.findOne({ _id: id })
      .populate("category", "_id name")
      .exec();
    if (!product) return res.status(404).send({ error: "Product not found" });
    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const read = (req, res) => {
  req.product.photo = undefined;
  return res.status(200).send(req.product);
};

const remove = async (req, res, next) => {
  try {
    const product = req.product;
    let deletedProduct = await product.remove();
    deletedProduct.photo = undefined;
    return res.status(202).send(deletedProduct);
  } catch (error) {
    return res.status(400).send({ error: "Failed to delete product" });
  }
};

const update = async (req, res, next) => {
  let form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res
        .status(400)
        .send({ error: "Invalid form data, update failed" });

    try {
      let product = req.product;
      product = extend(product, fields);
      if (files.photo?.size) {
        if (files.photo?.size > 1000000)
          return res
            .status(400)
            .send({ error: "Upload failed, Max Size <= 1MB" });

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      await product.save();
      product.photo = undefined;
      return res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  });
};

const list = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? req.query.limit : 6;
  try {
    const products = await Product.find({})
      .select("-photo")
      .populate("category", "_id name")
      .sort([[sortBy, order]])
      .limit(Number(limit))
      .exec();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send({ error: "Failed to fetch products" });
  }
};

const listAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .populate("category", "_id name")
      .sort("-createdAt")
      .exec();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send({ error: "Failed to fetch products" });
  }
};

/**
 * it will find the product based on req.product.category
 * other products that have same catrogry will be returned
 */
const suggest = async (req, res) => {
  let limit = req.query.limit ? req.query.limit : 6;
  try {
    const products = await Product.find({
      category: req.product.category,
      _id: { $ne: req.product._id },
    })
      .select("-photo")
      .populate("category", "_id name")
      .limit(Number(limit))
      .exec();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send({ error: "No related products" });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category", {});
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(400).send(error);
  }
};

/**
 * list products by search params
 * implement this search in frontend
 * as user cliks on diff radio filters
 * make api requests and show products based on filters
 */
const listBySearch = async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? Number(req.body.limit) : 100;
  let skip = Number(req.body.skip);

  let findArgs = {};
  try {
    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === "price") {
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          };
        } else {
          findArgs[key] = req.body.filters[key];
        }
      }
    }

    const products = await Product.find(findArgs)
      .select("-photo")
      .populate("category", "_id name")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec();

    return res.status(200).send({ size: products.length, products });
  } catch (error) {
    return res.status(400).send({ error: "Could not fetch products" });
  }
};

const fetchPhoto = async (req, res, next) => {
  const product = req.product;
  if (product.photo.data) {
    res.set("Content-Type", product.photo.contentType);
    return res.send(product.photo.data);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    // create query object to hold search val and category
    const queryArgs = {};
    // assign search val to query.name
    if (req.query.search) {
      queryArgs.product_name = { $regex: req.query.search, $options: "i" };

      if (req.query.category && req.query.category !== "All") {
        queryArgs.category = req.query.category;
      }

      // find products based on queryArgs
      const products = await Product.find(queryArgs);
      return res.status(200).send(products);
    }
  } catch (error) {
    return res.status(404).send({ error: "Product search failed" });
  }
};

const updateInventory = async (req, res, next) => {
  let bulkOps = req.body.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  try {
    await Product.bulkWrite(bulkOps, {});
    next();
  } catch (error) {
    res.status(400).send({ error: "Could not update shop inventory" });
  }
};

module.exports = {
  create,
  productById,
  read,
  remove,
  update,
  list,
  suggest,
  listCategories,
  listBySearch,
  fetchPhoto,
  searchProducts,
  updateInventory,
  listAll,
};
