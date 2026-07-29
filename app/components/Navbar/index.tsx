"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

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
            <div className="d-flex align-items-center justify-content-center gap-2">
              <i className="bi bi-house-fill"></i>
              <span>Home</span>
            </div>
          </span>
        </a>
        {pathname === "/user" && (
          <a
            className="navbar-brand d-flex align-items-center gap-3 m-0"
            href="/user"
          >
            <span
              className="fw-semibold text-dark"
              style={{ letterSpacing: "0.01em" }}
            >
              <div className="d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-person-fill"></i>
                <span>User</span>
              </div>
            </span>
          </a>
        )}

        {pathname === "/staff" && (
          <a
            className="navbar-brand d-flex align-items-center gap-3 m-0"
            href="/staff"
          >
            <span
              className="fw-semibold text-dark"
              style={{ letterSpacing: "0.01em" }}
            >
              <div className="d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-person-workspace"></i>
                <span>Staff</span>
              </div>
            </span>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
