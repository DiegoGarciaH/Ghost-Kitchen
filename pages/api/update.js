import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      let { id, nombre, precio, imagen, categoriaId } = req.body;
      id = Number(id)
      precio = Number(precio)
      categoriaId = Number(categoriaId)
      const updatedProduct = await prisma.producto.update({
        where: { id },
        data: {
          nombre,
          precio,
          imagen,
          categoria: {
            connect: { id: Number(categoriaId) }, // Convertir a número
          },
        },
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'No se pudo actualizar el producto.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
