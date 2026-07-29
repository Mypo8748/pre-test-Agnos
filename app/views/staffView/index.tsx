"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/app/lib/socket-client";

type SubmissionRecord = Record<string, string> & {
  submittedAt?: string;
};

const formatPatientName = (data: Record<string, string>) => {
  const first = data.firstName?.trim() || "";
  const last = data.lastName?.trim() || "";
  return [first, last].filter(Boolean).join(" ") || "Unnamed patient";
};

const StaffView = () => {
  const socket = getSocket();
  const [latestData, setLatestData] = useState<Record<string, string> | null>(
    null,
  );
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [status, setStatus] = useState<
    "Filling" | "In-active" | "Submitted" | "Cancelled"
  >("In-active");
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionRecord | null>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleSocketMessage = (raw: unknown) => {
      if (typeof raw !== "string") {
        return;
      }

      try {
        const payload = JSON.parse(raw) as {
          type?: string;
          data?: Record<string, string>;
        };

        if (payload?.type === "patient-filling") {
          setLatestData(payload.data ?? null);
          setStatus("Filling");
        } else if (payload?.type === "patient-inactive") {
          setLatestData(payload.data ?? null);
          setStatus("In-active");
        } else if (payload?.type === "patient-submitted") {
          const submittedRecord: SubmissionRecord = {
            ...(payload.data ?? {}),
            submittedAt: new Date().toLocaleString("en-GB"),
          };

          setLatestData(null);
          setSubmissions((prev) => [submittedRecord, ...prev]);
          setStatus("Submitted");
        } else if (payload?.type === "patient-cancelled") {
          setLatestData(null);
          setStatus("Cancelled");
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    socket.on("patient-update", handleSocketMessage);

    return () => {
      socket.off("patient-update", handleSocketMessage);
    };
  }, [socket]);

  return (
    <div className="container py-4 py-md-5">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-3 p-md-4">
          <div className="border rounded-3 p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
              <div>
                <span className="fw-semibold">Current Status:</span>
                <span
                  className={`ms-2 badge ${status === "Submitted" ? "bg-primary" : status === "Filling" ? "bg-success" : status === "Cancelled" ? "bg-danger" : "bg-warning text-dark"}`}
                >
                  {status}
                </span>
              </div>
              <div className="text-muted small">
                {latestData
                  ? "Latest patient data is shown below."
                  : "Waiting for the first submission."}
              </div>
            </div>

            {latestData ? (
              <div className="mb-4">
                <div className="row g-3">
                  {Object.entries(latestData).map(([key, value]) => (
                    <div className="col-12 col-md-6" key={key}>
                      <div className="border rounded-3 p-3 h-100">
                        <small className="text-muted text-uppercase d-block mb-1">
                          {key}
                        </small>
                        <div className="fw-semibold text-break">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-muted mb-4">
                {status === "Submitted"
                  ? "No active patient data is displayed after submission."
                  : "No submission received yet."}
              </div>
            )}

            <div className="mt-3">
              <h6 className="fw-semibold mb-3">Submission History</h6>
              {submissions.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col" className="text-nowrap">
                          #
                        </th>
                        <th scope="col" className="text-nowrap">
                          Patient
                        </th>
                        <th scope="col" className="text-nowrap">
                          Phone
                        </th>
                        <th scope="col" className="text-nowrap">
                          Email
                        </th>
                        <th scope="col" className="text-nowrap">
                          Submitted
                        </th>
                        <th scope="col" className="text-nowrap">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission, index) => (
                        <tr key={`${submission.submittedAt}-${index}`}>
                          <td className="text-nowrap">{index + 1}</td>
                          <td className="text-nowrap fw-semibold">
                            {formatPatientName(submission)}
                          </td>
                          <td className="text-nowrap">
                            {submission.phoneNumber || "-"}
                          </td>
                          <td className="text-nowrap">
                            {submission.email || "-"}
                          </td>
                          <td className="text-nowrap small text-muted">
                            {submission.submittedAt || "-"}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-muted">No submissions yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedSubmission && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">Patient Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedSubmission(null)}
                />
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {Object.entries(selectedSubmission).map(([key, value]) => (
                    <div className="col-12 col-md-6" key={key}>
                      <div className="border rounded-3 p-3 h-100">
                        <small className="text-muted text-uppercase d-block mb-1">
                          {key}
                        </small>
                        <div className="fw-semibold text-break">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffView;
