const { Profile, Users } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    let id  = req.Users.id;

    let data = await Profile.findOne({
      where: {
        idUser: req.Users.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };

    res.send({
      status: "Success",
      data,
    });
    
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addProfile = async (req, res) => {
    try {
      const newProfile = await Profile.create({
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        image: req.files.image[0].filename,
        idUser: req.Users.id,
    });

    data = {
        ...data,
        image : process.env.FILE_PATH + data.image
    }

    res.send({
        status : "Success",
        data : {
            data
        }
    });
      } catch (error) {
        console.log(error);
        res.send({
          status: 'failed',
          message: 'Server Error',
        });
      }
};