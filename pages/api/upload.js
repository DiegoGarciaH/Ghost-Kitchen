import fs from "fs";
import path from "path";
import multer from "multer";

const ruta = "public/assets/img/";


function contarArchivos() {
  let contador = 0;

  return new Promise((resolve, reject) => {
    fs.readdir(ruta, (error, archivos) => {
      if (error) {
        reject(error);
        return;
      }
      

      archivos.forEach(archivo => {
        if (archivo.startsWith("cafe")) {
          contador++;
        }
      });

      console.log(`Hay ${contador} archivos que empiezan con 'cafe' en la carpeta ${ruta}`);
      resolve(contador + 1);
    });
  });
}


const storage = multer.diskStorage({
  destination: "public/assets/img/",
  filename: (req, file, cb) => {
    contarArchivos()
      .then((resultado) => {
        const nombre = `${resultado}`;
        cb(null, `cafe_${nombre}.jpg`); // Nombre del archivo
      })
      .catch((error) => {
        console.error(error);
        cb(error);
      });
  }
  
});
const upload = multer({ storage: storage });


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req,
  res
) {

  try {
    
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    const file = req.file;
    if (!file) throw new Error("File not provided");
    const filePath = path.join(process.cwd(), "public", "assets","img", file.filename);
    fs.renameSync(file.path, filePath);
    res.status(200).json({ message: "Archivo subido correctamente", name: file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
}
