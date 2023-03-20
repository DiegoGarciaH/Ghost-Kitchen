import fs from "fs";
import path from "path";

const ruta = "public/assets/img/";



export default async function handler(
    req,
    res
  ) {
  
    try {
      
        fs.rename(`${ruta}${req.body.filename}`, `${ruta}${req.body.filename}`, () => {
            console.log("\nFile Renamed!\n");
             
            // List all the filenames after renaming
            getCurrentFilenames();
          });
      res.status(200).json({ message: "Archivo subido correctamente", name: file.filename });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ha ocurrido un error" });
    }
  }
  
