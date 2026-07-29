"use client";

import { useEffect, useRef, useState } from "react";

const CHANNEL_NAME = "patient-updates";

const UserView = () => {
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

  const publishUpdate = (data: typeof formData, type: string) => {
    const payload = JSON.stringify({
      type,
      data,
      timestamp: Date.now(),
    });

    localStorage.setItem(CHANNEL_NAME, payload);

    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage(payload);
      channel.close();
    }
  };

  const handleCancel = () => {
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
    publishUpdate(emptyData, "patient-cancelled");
  };

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const nextData = {
        ...prevData,
        [name]: value,
      };

      publishUpdate(nextData, "patient-filling");

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        publishUpdate(nextData, "patient-inactive");
      }, 1500);

      return nextData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    console.log("Sent form data", formData);
  };

  return (
    <div className="container p-4 d-flex justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-center">
              <h2 className="mb-4 ">Patient Registration Form</h2>{" "}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm border border-primary rounded"
                    value={formData.firstName}
                    onChange={handleChange}
                    name="firstName"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm border border-primary rounded"
                    value={formData.middleName}
                    onChange={handleChange}
                    name="middleName"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm border border-primary rounded"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
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
                    name="dateOfBirth"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select border border-primary"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    className="form-control border-primary rounded"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control border-primary rounded"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Address</label>
                  <input
                    className="form-control border-primary rounded"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Preferred Language</label>
                  <input
                    className="form-control border-primary rounded"
                    type="text"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
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
                  Cancel
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
