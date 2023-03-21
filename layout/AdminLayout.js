import Head from "next/head";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';

export default function AdminLayout({ children, pagina }) {
  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quosco Cafetería" />
      </Head>

      <div className="md:flex">
            <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5">
                <Image
                    width={300}
                    height={100}
                    src="/assets/img/logo.svg"
                    alt="imagen logotipo"
                />

                <br />
                <Link href="/admin">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">
                      Panel Principal
                    </button>
                  </Link>
                  <Link href="/add">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">
                      Agregar
                    </button>
                  </Link>
                  <Link href="/delete">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">
                      Eliminar
                    </button>
                  </Link>
                  <Link href="/update">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">
                      Editar
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">
                      Pagina Principal
                    </button>
                  </Link>
            </aside>

            <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                <div className="p-10">
                    {children}
                </div>
            </main>
      </div>
      <ToastContainer />
    </>
  );
}
