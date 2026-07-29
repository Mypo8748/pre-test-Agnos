"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/app/lib/socket-client";

const UserView = () => {
  const socket = getSocket();
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    preferredLanguage: "",
    nationality: "",
    emergencyContact: "",
    religion: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const publishUpdate = (data: typeof formData, type: string) => {
    const payload = JSON.stringify({
      type,
      data,
      timestamp: Date.now(),
    });

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("patient-update", payload);
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "phoneNumber":
      case "email":
      case "address":
      case "gender":
        if (!value.trim()) {
          return `${name} is required`;
        }
        break;
      default:
        break;
    }

    if (
      name === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      return "Please enter a valid email";
    }

    if (
      name === "phoneNumber" &&
      value &&
      !/^[0-9]{9,15}$/.test(value.replace(/\D/g, ""))
    ) {
      return "Please enter a valid phone number";
    }

    return "";
  };

  const clearIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      const value = formData[key];
      if (
        [
          "firstName",
          "lastName",
          "phoneNumber",
          "email",
          "address",
          "gender",
        ].includes(key)
      ) {
        const message = validateField(key, value);
        if (message) {
          nextErrors[key] = message;
        }
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCancel = () => {
    clearIdleTimer();

    const emptyData = {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      preferredLanguage: "",
      nationality: "",
      emergencyContact: "",
      religion: "",
    };

    setFormData(emptyData);
    setErrors({});
    publishUpdate(emptyData, "patient-cancelled");
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      clearIdleTimer();
    };
  }, [socket]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 15) {
        return;
      }

      setFormData((prevData) => {
        const nextData = {
          ...prevData,
          [name]: numericValue,
        };

        if (errors[name]) {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        publishUpdate(nextData, "patient-filling");

        clearIdleTimer();

        idleTimerRef.current = setTimeout(() => {
          publishUpdate(nextData, "patient-inactive");
        }, 1500);

        return nextData;
      });
      return;
    }

    setFormData((prevData) => {
      const nextData = {
        ...prevData,
        [name]: value,
      };

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }

      publishUpdate(nextData, "patient-filling");

      clearIdleTimer();

      idleTimerRef.current = setTimeout(() => {
        publishUpdate(nextData, "patient-inactive");
      }, 1500);

      return nextData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    clearIdleTimer();
    publishUpdate(formData, "patient-submitted");
    const emptyData = {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      preferredLanguage: "",
      nationality: "",
      emergencyContact: "",
      religion: "",
    };
    setFormData(emptyData);
    setErrors({});
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div className="container p-4 d-flex justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-center">
              <h2 className="mb-4 ">Registration Form</h2>{" "}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm border rounded ${errors.firstName ? "border-danger" : "border-primary"}`}
                    value={formData.firstName}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="firstName"
                  />
                  {errors.firstName && (
                    <div className="text-danger small mt-1">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm border border-primary rounded"
                    value={formData.middleName}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="middleName"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm border rounded ${errors.lastName ? "border-danger" : "border-primary"}`}
                    value={formData.lastName}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="lastName"
                  />
                  {errors.lastName && (
                    <div className="text-danger small mt-1">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Date of birth</label>
                  <input
                    type="date"
                    className="form-control form-control-smborder border-primary rounded"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="dateOfBirth"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select border ${errors.gender ? "border-danger" : "border-primary"}`}
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control rounded ${
                      errors.phoneNumber ? "border-danger" : "border-primary"
                    }`}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="phoneNumber"
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger small mt-1">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control rounded ${errors.email ? "border-danger" : "border-primary"}`}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="email"
                  />
                  {errors.email && (
                    <div className="text-danger small mt-1">{errors.email}</div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control rounded ${errors.address ? "border-danger" : "border-primary"}`}
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="address"
                  />
                  {errors.address && (
                    <div className="text-danger small mt-1">
                      {errors.address}
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Preferred Language</label>
                  <input
                    className="form-control border-primary rounded"
                    type="text"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="preferredLanguage"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Nationality</label>
                  <input
                    className="form-control border-primary rounded"
                    type="text"
                    value={formData.nationality}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="nationality"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Emergency Contact</label>
                  <input
                    className="form-control border-primary rounded"
                    type="text"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="emergencyContact"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Religion</label>
                  <input
                    className="form-control border-primary rounded"
                    type="text"
                    value={formData.religion}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="religion"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary mt-3 me-2 "
                  onClick={handleCancel}
                >
                  Clear
                </button>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
