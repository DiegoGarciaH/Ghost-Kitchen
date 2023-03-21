import AdminLayout from "../layout/AdminLayout"
import useQuiosco from "../hooks/useQuiosco";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from 'react-toastify'

export default function Add() {
  const { agregarProducto, uploadFile } = useQuiosco();
  const { register, handleSubmit, reset } = useForm();
  let cat = "";


  const onSubmit = async ({ nombre, precio, file, categoriaId }) => {
    // Aquí puedes hacer lo que quieras con los datos del formulario
    try {
      const nombreImagen = await uploadFile(file[0]); // Se obtiene el nombre del archivo subido
      const nombreImagenJson = JSON.parse(JSON.stringify(nombreImagen));
      const imagen = nombreImagenJson.substring(0, nombreImagenJson.length - 4);

      console.log(nombre, precio, imagen, categoriaId)
try {
  console.log("primero")
  await agregarProducto(nombre, Number(precio), imagen, categoriaId); // Se pasa el nombre de la imagen como argumento
  console.log("final")
} catch (error) {
  toast.error('no ejecuta agregar');
  console.log(error)
}
      //await console.log(nombreImagen)
      toast.success('Producto agregado correctamente');
      reset();
    } catch (error) {
      console.error(error);
    }
    // Resetear el formulario después de enviar
    reset();
  };


  return (
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
            step="0.01"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block mb-2 font-bold text-gray-700">
            Imagen (JPG)
          </label>
          <input
            type="file" name="file" id="file" 
            {...register("file", { required: true })}
            className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoriaId" className="block mb-2 font-bold text-gray-700">
            Categoría
          </label>
          <select
            id="categoriaId"
            {...register("categoriaId", { required: true })}
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