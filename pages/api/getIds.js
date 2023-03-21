import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const ids = await prisma.producto.findMany({
        select: {
          id: true,
        },
      });
      res.status(200).json(ids);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'No se pudo obtener los identificadores.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
