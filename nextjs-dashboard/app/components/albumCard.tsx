import Link from 'next/link';
import styles from './albumCard.module.scss';

interface AlbumCardProps {
  id: string
  title: string; 
  description: string; 
  imageUrl: string;
}

export default function AlbumCard({ id, title, description, imageUrl }: AlbumCardProps) {
  return (
    <Link href={`/id/${id}`}>
  
    <div className={styles.albumCard}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>

  </Link>
  );
}
