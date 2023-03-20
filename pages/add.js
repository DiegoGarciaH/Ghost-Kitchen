import AdminLayout from "../layout/AdminLayout"
import useQuiosco from "../hooks/useQuiosco";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Add() {
    const { agregarProducto, uploadFile } = useQuiosco();
    const { register, handleSubmit, reset } = useForm();
    let cat = "";
    const [imagen, setImagen] = useState(null); // Agrega esta línea
    
    const handleImageUpload = (e) => {
      console.log("Yo ya estoy")
      setImagen(e.target.files[0]);
      console.log(e.target.files[0]); // Agregar este console.log
    };
    


    const onSubmit = async ({nombre, precio, file, categoria}) => {
        // Aquí puedes hacer lo que quieras con los datos del formulario
        try {
          // Subir la imagen al servidor
          
          
          console.log(file[0])
          await uploadFile(file[0])
          
          // Enviar el formulario completo
        // await console.log(nombre, precio, {/*NOMBRE DE LA IMAGEN RECIEN SUBIDA*/}, categoria);
    
          
        } catch (error) {
          console.error(error);
        }
        
        // Resetear el formulario después de enviar
        reset();
      };


    return(
        <AdminLayout pagina={'Add'}>
         <h1 className="text-4xl font-black">Panel de Administracion</h1>
         <p className="text-2xl my-10">Agrega Platillos</p>

         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto" encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="nombre" className="block mb-2 font-bold text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          {...register("nombre", { required: true })}
          className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="precio" className="block mb-2 font-bold text-gray-700">
          Precio
        </label>
        <input
          type="number"
          id="precio"
          {...register("precio", { required: true })}
          className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="file" className="block mb-2 font-bold text-gray-700">
          Imagen
        </label>
        <input
          type="file" name="file" id="file" onChange={handleImageUpload}
          {...register("file", { required: true })}
          className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="categoria" className="block mb-2 font-bold text-gray-700">
          Categoría
        </label>
        <select
          id="categoria"
          {...register("categoria", { required: true })}
          className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Enviar
        </button>
      </div>
    </form>

        </AdminLayout>
    )
}