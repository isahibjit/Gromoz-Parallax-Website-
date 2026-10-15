import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container interior">
      <span className="eyebrow">Page not found</span>
      <h1>
        A clearer route
        <br />
        starts here.
      </h1>
      <p>
        This page may have moved. Explore the product or return to the homepage.
      </p>
      <Link className="button" href="/">
        Back to home
      </Link>
    </section>
  );
}
