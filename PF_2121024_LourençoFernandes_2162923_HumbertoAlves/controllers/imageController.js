const Images = require('../db_sequelize').Images;


exports.getImages = async function (req, res) {
  try {
    const id = req.params.id;
    const images = await Images.findAll({ where: { product_id: id } });

    if (images.length === 0) {
      res.status(404).send("No images found.");
    }
    else
        res.status(200).send(images);

  } catch (error) {
    res.status(500).send(error);
  }
}

exports.deleteImage = async function (req, res) {
  try {
    const id = req.params.id;

    const deleted = await Images.destroy({ where: { image_id: id } });

    if (deleted === 0) 
        res.status(404).send("Image not found.");
    else
        res.status(200).send("Image deleted successfully.");

  } catch (error) {

    res.status(500).send(error);
  }
}
exports.uploadImage = async function (req, res) {
    try {
        const id = req.params.id;
    
        if (!req.file) {
          return res.status(400).send("No file uploaded!");
        }
    
        const imgPath = req.file.path;
    
        const newImage = await Images.create({
            img_path: imgPath,
            product_id: id
        });
    
        res.status(201).send(newImage);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }