import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light border-bottom py-2">
      <div className="container d-flex justify-content-start align-items-center gap-6">
        <a
          className="navbar-brand d-flex align-items-center gap-3 m-0"
          href="/"
        >
          <Image
            src="/image/agons-icon.png"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-circle"
          />
        </a>

        <a
          className="navbar-brand d-flex align-items-center gap-3 m-0"
          href="/"
        >
          <span
            className="fw-semibold text-dark"
            style={{ letterSpacing: "0.01em" }}
          >
            Home
          </span>
        </a>

        <a
          className="navbar-brand d-flex align-items-center gap-3 m-0"
          href="/staff"
        >
          <span
            className="fw-semibold text-dark"
            style={{ letterSpacing: "0.01em" }}
          >
            Staff
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
