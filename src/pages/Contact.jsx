import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav/PageNav";

export default function Contact() {
  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pzuyf7i",
        "template_5pq9ypc",
        form.current,
        "uZMKKtMEWbquPWuzV"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert(error.text);
        }
      );
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form ref={form} onSubmit={sendEmail} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="from_name"
            placeholder="Your name"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="from_email"
            placeholder="Your email address"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Insert your message here"
          />
        </div>

        <div className={styles.loginFooter} style={{ flexDirection: "column" }}>
          <input
            type="submit"
            value="Send"
            className={styles.btn}
            style={{ width: "120px" }}
          />
        </div>
      </form>
    </main>
  );
}
