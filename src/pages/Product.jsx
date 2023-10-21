import PageNav from "../components/PageNav/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div className="d-flex align-items-center row me-0">
          <div className="d-flex justify-content-end">
            <h2>About the app</h2>
          </div>

          <div className="col-12 col-lg-6 pe-0 mb-4 d-flex justify-content-center">
            <img
              src="img-1.jpg"
              className="img-fluid"
              alt="piggy-bank-picture"
            />
          </div>

          <div className="col-12 col-lg-6 pe-0">
            <p className={styles.description}>
              In a world where everyone wants to be financially independent, the
              wish only is definitely not enough. The process itself requires
              education, discipline, perseverance and balance. It all starts
              with a simple concept that many times becomes very hard in
              practice: saving up.
            </p>

            <p className={styles.description}>
              But how can you put some money aside if you don&apos;t keep track
              of your expenses? For this matter alone <em>WhereIsMyMoney</em>{" "}
              was created. By adding your every day expenses you can better
              realize if all the things your money goes on, are actually worth
              it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
