"use client";

import React from "react";

const HomeView = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg border-0 p-5 text-center"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
        }}
      >
        <h1 className="fw-bold mb-2">Welcome to Agnos</h1>
        <p className="text-muted mb-4">Select your role to continue</p>

        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className="btn btn-primary btn-lg shadow-sm"
            onClick={() => {
              window.location.href = "/user";
            }}
          >
            <i className="bi bi-person-fill me-2"></i>
            User
          </button>

          <button
            type="button"
            className="btn btn-dark btn-lg shadow-sm"
            onClick={() => {
              window.location.href = "/staff";
            }}
          >
            <i className="bi bi-person-workspace me-2"></i>
            Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
