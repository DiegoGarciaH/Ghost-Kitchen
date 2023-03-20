import { PrismaClient } from "@prisma/client";

const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  // Verificar que el método sea POST
  if (req.method === 'POST') {
    // Desestructurar valores del body
    const { nombre, precio, imagen, categoriaId } = req.body;

    try {
      // Crear producto
      const producto = await prisma.producto.create({
        data: {
          nombre,
          precio,
          imagen,
          categoria: {
            connect: { id: Number(categoriaId) }, // Convertir a número
          },
        },
      });

      // Devolver producto creado
      res.status(201).json(producto);
    } catch (error) {
      // Manejo de errores
      console.error(error);
      res.status(500).json({ error: 'No se pudo crear el producto.' });
    } finally {
      // Cerrar conexión con la base de datos
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
