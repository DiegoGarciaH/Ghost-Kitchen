import AdminLayout from "../layout/AdminLayout"
import useQuiosco from "../hooks/useQuiosco";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from 'react-toastify'

export default function Delete() {
    const { deleteRegister } = useQuiosco();
    const { register, handleSubmit, reset } = useForm();



    const onSubmit = async ( id ) => {
        // Aquí puedes hacer lo que quieras con los datos del formulario

        try {
            await deleteRegister(id.id); // Se pasa el nombre de la imagen como argumento
        } catch (error) {
            console.log(error)
        }
        reset();
    };


    return (
        <AdminLayout pagina={'Add'}>
            <h1 className="text-4xl font-black">Panel de Administracion</h1>
            <p className="text-2xl my-10">Elimine Platillos</p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto" encType="multipart/form-data">
                <div className="mb-4">
                    <label htmlFor="id" className="block mb-2 font-bold text-gray-700">
                        Identificador
                    </label>
                    <input
                        type="text"
                        id="id"
                        {...register("id", { required: true })}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
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