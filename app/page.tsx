export default function Home() {
  return (
    <div className="container p-4 d-flex justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-center">
              <h2 className="mb-4 ">Patient Registration Form</h2>{" "}
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm border border-primary rounded"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Middle Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm border border-primary rounded"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm border border-primary rounded"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Date of birth</label>
                <input
                  type="date"
                  className="form-control form-control-smborder border-primary rounded"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select border border-primary"
                  id="gender"
                  name="gender"
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
                />
              </div>

              <div className="row mb-3.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
