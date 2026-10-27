import styles from "./index.module.css"
import { BookCreaturesFeed } from "@/03-widgets/book-creaures-feed";
import { CoordinatesFeed } from "@/03-widgets/coordinates-feed";
import { MagicCitiesFeed } from "@/03-widgets/magic-cities-feed";
import { RingsFeed } from "@/03-widgets/rings-feed";

type Props = {};

export const HomePage = (
  {}: Props
) => {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.content}>
        <BookCreaturesFeed/>
        <CoordinatesFeed/>
        <MagicCitiesFeed/>
        <RingsFeed/>
      </main>
    </div>
  )
}