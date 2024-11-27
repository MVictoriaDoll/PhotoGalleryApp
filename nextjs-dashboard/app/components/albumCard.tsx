import styles from './albumCard.module.scss';

interface AlbumCardProps {
  title: string; 
  description: string; 
  imageUrl: string;
}

export default function AlbumCard({ title, description, imageUrl }: AlbumCardProps) {
  return (
    <div className={styles.albumCard}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
