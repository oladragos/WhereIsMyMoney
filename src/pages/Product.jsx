import PageNav from "../components/PageNav/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div className="row me-0">
          <div className="col-12 col-lg-6 pe-0 mb-4">
            <img
              src="/src/assets/img-1.jpg"
              className="img-fluid"
              alt="growing savings"
            />
          </div>
          <div className="col-12 col-lg-6 pe-0">
            <h2 style={{ textAlign: "right" }}>
              About <br /> Where Is My Money?
            </h2>
            <p style={{ textIndent: "50px", textAlign: "justify" }}>
              In a world where everyone wants to be financially independent, the
              wish only is definitely not enough. The process itself requires
              education, discipline, perseverance and balance. It all starts
              with a simple concept that many times becomes very hard in
              practice: saving up.
            </p>
            <p style={{ textIndent: "50px", textAlign: "justify" }}>
              But how can you put some money aside if you don&apos;t keep track
              of your expenses? For this matter alone Where Is My Money was
              created. By adding your every day expenses you can better realize
              if all the things your money goes on, are actually worth it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
