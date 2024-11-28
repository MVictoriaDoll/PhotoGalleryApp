'use client';
import { useParams } from 'next/navigation';

export default function AlbumDetail() {
  const { id } = useParams();


  return (
    <div>
      <h1>Detalles del Álbum {id}</h1>
      {/* Más contenido relacionado con el álbum */}
    </div>
  );
}
