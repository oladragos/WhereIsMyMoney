import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Login.module.css";
import PageNavUpdated from "../components/PageNav/PageNavUpdated";

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
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
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <main className={styles.login}>
      <PageNavUpdated />
      <form ref={form} onSubmit={sendEmail} className={styles.form}>
        <label>Name</label>
        <input type="text" name="from_name" />
        <label>Email</label>
        <input type="email" name="from_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </main>
  );
}
