import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const productos = await prisma.producto.findMany({
    where: {
      categoriaId: 1,
    },
  });
  res.status(200).json(productos);

    // Crear Producto
    if (req.method === "POST") {
      const producto = await prisma.producto.create({
        data: {
          nombre: req.body.nombre,
          precio: req.body.precio,
          imagen: req.body.imagen,
          categoriaId: req.body.categoriaId,
        },
      });
      res.status(200).json(producto);
    }
}
