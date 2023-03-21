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
  // Obtener id del producto de los parámetros de la url
  const { id } = req.query;

  try {
    // Buscar producto por id
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) },
      
    });

    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: `Producto no encontrado. ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo obtener el producto.' });
  } finally {
    await prisma.$disconnect();
  }
}
