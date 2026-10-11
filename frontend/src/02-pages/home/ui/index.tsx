import styles from "./index.module.css"
import { BooksFeed } from "@/03-widgets/books-feed";
import { OrdersFeed } from "@/03-widgets/orders-feed";

type Props = {};

export const HomePage = (
  {}: Props
) => {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.content}>
        <BooksFeed/>
        <OrdersFeed/>
      </main>
    </div>
  )
}