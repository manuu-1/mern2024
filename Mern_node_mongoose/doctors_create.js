const mongoose = require("mongoose");

const mongo_url = "mongodb://127.0.0.1:27017/nie_doctor_node_db?directConnection=true&serverSelectionTimeoutMS=2000";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to database");
  } catch (error) {
    console.log("Cannot connect to database", error);
    process.exit();
  }
};

// Define Doctor model
const DoctorModel = (() => {
  const collection_name = 'doctor'; // Change the collection name to 'doctor'

  const collection_fields = {
    name: String,
    location: String,
    specialization: String,
    phone_number: String,
  };

  const collection_config = {
    timestamps: false,
  };

  const schema = mongoose.Schema(collection_fields, collection_config);
  const Model = mongoose.model(collection_name, schema);
  return Model;
})();

// Create Doctor document
const createDoctor = async () => {
  await connectToMongo();

  const doctorModel = new DoctorModel({
    _id: new mongoose.Types.ObjectId(), // Generates a new ObjectId for the document
    name: 'Dr.Manu S',                  // Name of the doctor
    location: 'Mysuru',              // Location of the doctor
    specialization: 'Cardiologist',  // Specialization of the doctor
    phone_number: '906777555',          // Phone number of the doctor
  });

  const createdDocument = await doctorModel.save();
  console.log(createdDocument);
};

// Call createDoctor to create and save the new doctor document
createDoctor();