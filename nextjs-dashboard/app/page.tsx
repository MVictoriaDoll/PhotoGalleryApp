

import { PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AlbumCard from './components/albumCard';
import NavLinks from './components/nav-links';

type Photo = {
  id: string;
  theme: string;
  photographer: string;
  src: {
    medium: string;
  };
};


type APIResponse = {
  photos: Photo[];
};

type Album = {
  id: string;
  name: string;
  cover: string;
  photos: Photo[];
};

export default async function Page() {
  const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY; 
  const API_URL = "https://api.pexels.com/v1/search";

  console.log("API Key desde el entorno:", API_KEY);

  const THEMES = ["food", "people", "nature", "cities"];
  let allPhotos: Photo[] = [];

  try {
  
    const responses = await Promise.all(
      THEMES.map((theme) =>
        fetch(`${API_URL}?query=${theme}`, {
          headers: { Authorization: API_KEY || '' },
        })
      )
    );


    const data = await Promise.all(
      responses.map(async (res) => {
        if (!res.ok) throw new Error(`Error en la API: ${res.status}`);
        return res.json(); 
      })
    );

    data.forEach((result, index) => {
      const theme = THEMES[index];
      const validPhotos = result.photos.filter((photo: any) => photo.id && photo.src?.medium);
      const photos = result.photos.map((photo: any) => ({
        id: photo.id,
        theme, 
        photographer: photo.photographer,
        src: photo.src,
      }));
      allPhotos = allPhotos.concat(photos);
    });
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return <p>Error al cargar los datos</p>;
  }

  const groupedByTheme = allPhotos.reduce((acc: Record<string, Album>, photo: Photo) => {
    const theme = photo.theme;

    if (!acc[theme]) {
      acc[theme] = {
        id: theme,
        name: theme,
        cover: photo.src.medium,
        photos: [],
      };
    }

    acc[theme].photos.push(photo);
    return acc;
  }, {});

  const albums: Album[] = Object.values(groupedByTheme);

  return (
    <main className='album-container'>
      <div className='album-grid'>
        {albums.map((album) => (
          <Link key={album.id} href={`/album/${album.id}`}>
    
          <AlbumCard
            id={album.id}
            title={album.name}
            description={`Fotos relacionadas con ${album.name}`}
            imageUrl={album.cover}
          />
      
          </Link>
        ))}
      </div>
    </main>
  );
}