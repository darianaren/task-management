import React from "react";

import styles from "./styles.module.css";

import NavBar from "@/components/NavBar/NavBar";

export default function Home() {
  return (
    <section className={styles["home-container"]}>
      <NavBar />
      <article className={styles["new-task-container"]}>New Task</article>
      <section className={styles["metrics-container"]}>Metrics</section>
      <main className={styles["list-container"]}>
        <section>Filtros</section>
        <ul>
          <li>Lista de tareas</li>
        </ul>
      </main>
    </section>
  );
}
