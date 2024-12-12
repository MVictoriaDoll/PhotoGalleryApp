import Link from 'next/link';
import React from "react";

type Album = {
  id: string;
  name: string;
};

type NavLinksProps = {
  albums: Album[];
};

export default function NavLinks({ albums }: NavLinksProps) { 
  return (
    <>
      {albums.map((album) => {
        console.log('Albums:', albums); // Ahora este console.log se ejecutará correctamente
        return (
          <Link
            key={album.id}
            href={`/album/${album.id}`}
            className='photos' 
          >
            {album.name}
          </Link>
        );
      })}
    </>
  );
}
