import styles from './ImageCard.module.scss'

const ImageCard = () => {
  return (
    <div className={styles['image-card']}>
      <img
        className={styles['image']}
        src=''
        alt=''
      />
    </div>
  )
}

export default ImageCard
