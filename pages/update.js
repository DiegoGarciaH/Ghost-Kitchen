import { useState, useEffect } from 'react';
import AdminLayout from "../layout/AdminLayout"
import { useForm } from 'react-hook-form';
import useQuiosco from "../hooks/useQuiosco";
export default function Update() {
  const { getId, updateRegister, getData } = useQuiosco();
  const { register, handleSubmit, reset, setValue, formState: { errors }  } = useForm();
  const [idArray, setIdArray] = useState([]);

  useEffect(() => {
    const obtenerId = async () => {
      const ids = await getId();
      setIdArray(ids);
    };

    obtenerId();
  }, []);

  // Actualizar el producto seleccionado
  const onSubmit = async (data) => {
    const { id } = data;
    
    if (!id) { // Si no se selecciona ningún id, mostrar un mensaje de error
      if (errors.id) {
        setError("id", {
          type: "manual",
          message: "Debe seleccionar un producto",
        });
      }
      return;
    }
    
    const producto = await getData(id);
    reset(); // Limpiar el formulario después de enviar los datos
  
    if (producto) {
      // Mostrar los campos de texto
      document.getElementById("nombre").hidden = false;
      document.getElementById("precio").hidden = false;
      document.getElementById("imagen").hidden = true;
      document.getElementById("categoriaId").hidden = false;
  
      // Establecer los valores de los campos
      setValue("nombre", producto.nombre);
      setValue("precio", producto.precio);
      setValue("imagen", producto.imagen);
      setValue("categoriaId", producto.categoriaId);
    } else {
      // Ocultar los campos de texto si no se encuentra el producto
      document.getElementById("nombre").hidden = true;
      document.getElementById("precio").hidden = true;
      document.getElementById("imagen").hidden = true;
      document.getElementById("categoriaId").hidden = true;
    }
  };

  // Guardar los cambios realizados por el usuario
  const onSave = async (data) => {
    const { id, nombre, precio, imagen, categoriaId } = data;
    console.log(id, nombre, precio, imagen, categoriaId)
    const actualizar = await updateRegister(parseInt(id), nombre, precio, imagen, categoriaId);
    actualizar && reset();
  };

  // Renderizar el formulario para editar el producto
  return (
    <AdminLayout pagina={'Update'}>
  <h1 className="text-4xl font-black">Panel de Administracion</h1>
  <p className="text-2xl my-10">Edite Platillos</p>
  <div>
    <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md shadow-md p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="id" className="block font-medium text-gray-700 mb-1">
            Selecciona un producto:
          </label>
          <select
            name="id"
            id="id"
            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
            {...register("id", { required: true })}
          >
            <option value="">--Selecciona un producto--</option>
            {idArray.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.id}
              </option>
            ))}
          </select>
          {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="nombre" className="block font-medium text-gray-700 mb-1">
            Nombre:
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre"
            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
            {...register("nombre")}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="precio" className="block font-medium text-gray-700 mb-1">
            Precio:
          </label>
          <input
            id="precio"
            type="number"
            placeholder="Precio"
            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
            step="0.01"
            {...register("precio")}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="categoriaId" className="block font-medium text-gray-700 mb-1">
            Categoría:
          </label>
          <select
            name="categoriaId"
            id="categoriaId"
            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
            defaultValue=""
            {...register("categoriaId")}
          >
            <option value="">Seleccione una categoría</option>
            <option value="1">Cafes</option>
            <option value="2">Hamburguesas</option>
            <option value="3">Pizzas</option>
            <option value="4">Donas</option>
            <option value="5">Pastel</option>
            <option value="6">Galletas</option>
          </select>
        </div>
        <div className="col-span-2 flex justify-between">
          <button
            type="submit"
            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            Mostrar detalles
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSave)}
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Guardar cambios
            </button>
          </div>
          </div>
          <input
            id="imagen"
            type="text"
            placeholder="img"
            hidden={true}
            {...register("imagen")}
          />

        </form>
      </div>
    </AdminLayout>

  );
}
