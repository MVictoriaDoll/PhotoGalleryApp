
import { PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

  export default async function Page() {
  const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY; // Tu clave de la API
  const API_URL = "https://api.pexels.com/v1/search?query=food";

  console.log("API Key desde el entorno:", API_KEY);

  let albums = [];

  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: API_KEY || '' },
    });

    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    albums = data.photos.map((photo: any) => ({
      id: photo.id,
      name: photo.photographer,
      cover: photo.src.medium,
    }));
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
  }

  return (
    <main>
      {albums.length > 0 ? (
        albums.map((album) => (
          <div key={album.id}>
            <img src={album.cover} alt={album.name} />
            <h3>{album.name}</h3>
          </div>
        ))
      ) : (
        <p>No se pudieron cargar los álbumes.</p>
      )}
    </main>
  );
}










/*
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';*/


/*export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* <AcmeLogo /> }*/
      /*</div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here }
        </div>
      </div>
    </main>
  );
}*/
