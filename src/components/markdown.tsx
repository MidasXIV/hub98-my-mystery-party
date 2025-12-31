import React from "react";
import styles from "./markdown.module.css";

export default function Markdown({ html }: { html: string }) {
  return <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: html }} />;
}
