const mongoose = require("mongoose");



const mongo_url = "mongodb://127.0.0.1:27017/nie_doctor_node_db?directConnection=true&serverSelectionTimeoutMS=2000"

const connectToMongo = async () => {

  //mongoose.Promise = global.Promise;

  try {

    await mongoose.connect(mongo_url);

    console.log("Connected to database");

  }

  catch( error ) {

    console.log("Cannot connect to database", error);

    process.exit();

  }

}

const DoctorModel = (() => {

  const collection_name = 'doctor';

  const collection_fields = {

    name: String,

    location: String,

    technology: String,

    phone_number: String

  };

  const collection_config = {

    timestamps: false

  };

  const schema = mongoose.Schema(collection_fields, collection_config);

  const Model = mongoose.model(collection_name, schema);

  return Model;

})();

const updateByName = async () => {

  connectToMongo();

  const doctor = await DoctorModel.findOne({'name': 'Dr.Moksha S'});

  doctor.phone_number = '8220214426';

  const savedTrainer = await DoctorModel.findOneAndUpdate({'name': 'Dr.Moksha S'}, doctor, {new: true});

  console.log(savedTrainer);

};

updateByName();

















