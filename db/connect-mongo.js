
    const mongoose = require("mongoose");

    const getConnection = async () => {
      try {
        const url =
          "mongodb+srv://estebanduque:5485012@cluster0.5co4c.mongodb.net/peliculasDB?retryWrites=true&w=majority&appName=Cluster0";
    
        await mongoose.connect(url);
    
        console.log("Conexión exitosa a MongoDB");
      } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
      }
    };
    
    
    module.exports = { getConnection };
    
