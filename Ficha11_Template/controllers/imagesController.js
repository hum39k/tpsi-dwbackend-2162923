const Image = require('../db_sequelize').Image;


async function getImages(req, res) {
  try {
    const id = req.params.id;
    const images = await Image.findAll({ where: { product_id: id } });

    if (images.length === 0) {
      res.status(404).send("No images found.");
    }
    else
        res.status(200).send(images);

  } catch (error) {
    res.status(500).send(error);
  }
}

async function postImage(req, res) {
  try {
    const url = req.body.url;
    const id = req.params.id;

    if (!url) {
      return res.status(400).send("URL must be provided!");
    }

    const newImage = await Image.create({
      img_path: url,
      product_id: id
    });

    res.status(201).send(newImage);
  } catch (error) {
    res.status(500).send(error);
  }
}



async function deleteImage(req, res) {
  try {
    const id = req.params.id;

    const deleted = await Image.destroy({ where: { image_id: id } });

    if (deleted === 0) {
        res.status(404).send("Imagem não encontrada.");
    }
    else
        res.status(200).send("Imagem apagada com sucesso.");

  } catch (error) {
    
    res.status(500).send(error);
  }
}
