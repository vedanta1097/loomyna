import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found shell">
      <span aria-hidden="true">✿</span>
      <p className="eyebrow">404 — wandered off the mat</p>
      <h1>We couldn&apos;t find that piece.</h1>
      <p>Let&apos;s take you back to something sunny.</p>
      <Link className="button button-primary" href="/#shop">Shop all pieces</Link>
    </section>
  );
}
