"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type Album = {
  title: string;
  description: string;
  cover: string;
  photos: { id: string; src: { medium: string } }[]; // Ajusta según los datos que recibas
};

export default function AlbumPage() {
  const params = useParams();
  const id = params?.id;

  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
      if (!API_KEY) {
        setError('API_KEY no está definida.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${id}`, {
          headers: { Authorization: API_KEY },
        });

        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);
        const data = await res.json();

        // Procesa los datos y ajusta según tu API
        setAlbum({
          title: id || 'Sin título',
          description: `Fotos relacionadas con ${id}`,
          cover: data.photos[0]?.src.medium || '',
          photos: data.photos.map((photo: any) => ({
            id: photo.id,
            src: photo.src,
          })),
        });
      } catch (error) {
        console.error(error);
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlbum();
    }
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!album) return <p>Álbum no encontrado.</p>;

  return (
    <div>
      <h1>{album.title}</h1>
      <p>{album.description}</p>
      <img src={album.cover} alt={album.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {album.photos.map((photo) => (
          <img key={photo.id} src={photo.src.medium} alt={`Foto ${photo.id}`} style={{ width: '200px', height: '150px', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
}



  /*useEffect(() => {
    console.log('ID:', id); 
    if (!id) {
      console.error('ID no proporcionado');
      return;
    }

    async function fetchAlbum() {
      try {
        const response = await fetch(`/api/search/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setAlbum(data);
        setPhotos(data.photos); // Asegúrate de que 'data.photos' contiene las fotos
      } catch (error) {
        console.error('Error al obtener el álbum:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbum();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!album) return <p>No se encontró el álbum.</p>;

  return (
    <div>
      <h1>Álbum: {album.title}</h1>
      <p>{album.description}</p>
      <div>
        {photos.map((photo) => (
          <img key={photo.id} src={photo.src.medium} alt={photo.alt} />
        ))}
      </div>
    </div>
  );
}
*/
