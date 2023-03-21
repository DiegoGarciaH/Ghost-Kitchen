import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto ] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
   

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }
    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad ) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)) {
           // Actualizar la cantidad
           const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
           setPedido(pedidoActualizado)

           toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

        setModal(false)
        
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            // Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)
        }

    };

    const agregarProducto = async (nombre, precio, imagen, categoriaId) => {
        try {
          console.log("antes de axios")
          await axios.post('/api/create', { nombre, precio, imagen, categoriaId })
          console.log("despues de axios")
          toast.success('Producto Añadido Correctamente')
      
          setTimeout(() => {
            router.push('/')
          }, 3000)
        } catch (error) {
          toast.error('Producto con Error')
          console.log(error)
        }
      };
      


      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
      
        try {
          const response = await axios.post("/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success('Imagen Guardada Correctamente');
         // console.log('Hola', response.data.name);
          return response.data.name;
        } catch (error) {
          console.error(error);
          toast.error('Error al guardar la imagen');
          return null
        }
      };

      const deleteRegister = async (id) => {
        try {
            
            await axios.delete('/api/delete', { data: { id: id } })
            toast.success('Producto Eliminado Correctamente')
        
            setTimeout(() => {
              router.push('/')
            }, 3000)
          } catch (error) {
            toast.error('Producto No Eliminado')
            console.log(error)
          }
      };

      const updateRegister = async ( id, nombre, precio, imagen, categoriaId ) => {
        try {
          console.log("antes de axios", id, nombre, precio, imagen, categoriaId)
          const response = await axios.put('/api/update', {
            id,
            nombre,
            precio,
            imagen,
            categoriaId,
          });
          console.log("despues de axios")
          toast.success('Producto Actualizado Correctamente')
          return response.data;
        } catch (error) {
          console.error(error);
          toast.error('Producto No Actualizado')
          throw new Error('No se pudo actualizar el registro.');
        }
      };


      const getId = async () => {
        try {
          const response = await axios.get('/api/getIds');
          return response.data;
        } catch (error) {
          console.error(error);
          throw new Error('No se pudo obtener el registro.');
        }
      };
      
      const getData = async (id) => {
        try {
          const response = await axios.get('/api/getData', {
            params: { id },
          });
          return response.data;
        } catch (error) {
          console.error(error);
          throw new Error('No se pudo obtener el registro.');
        }
      };
      
      


    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal, 
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre, 
                setNombre,
                colocarOrden,
                total,
                agregarProducto,
                uploadFile,
                deleteRegister,
                updateRegister,
                getId, 
                getData
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext