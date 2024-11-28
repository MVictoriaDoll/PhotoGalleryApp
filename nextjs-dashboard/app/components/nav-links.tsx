
import Link from 'next/link';


type Album = {
  id: string;
  name: string;
};

type NavLinksProps = {

  albums: Album[];

}
 

export default function NavLinks({ albums }: NavLinksProps) { 
  return (
    <>
      {albums.map((album) => {
        return ( 
      <Link
      key={album.id}
      href={`/id/${album.id}`}
      className='photos'
      >
      {album.name}
      </Link>
     )
      })}
    </>
  );
}
