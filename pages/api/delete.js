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

    // Verificar que el método sea DELETE
    if (req.method === 'DELETE') {
        // Obtener el id del producto a eliminar
        const id = parseInt(req.body.id);
        if (isNaN(id)) {
            // El valor de id no es un número válido
            res.status(400).json({ error: 'El valor de id no es válido.' });
            return;
        }

        try {
            // Eliminar el producto
            const productoEliminado = await prisma.producto.delete({
                where: { id: id },
            });

            // Devolver el producto eliminado
            res.status(200).json(productoEliminado);
        } catch (error) {
            // Manejo de errores
            console.error(error);
            res.status(500).json({ error: 'No se pudo eliminar el producto.' });
        } finally {
            // Cerrar conexión con la base de datos
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}
