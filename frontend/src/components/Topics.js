import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

const Topics = () => {
  const [headings, setHeadings] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get("https://dsabackend.vercel.app/api/headings/with-progress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      })
      .then((res) => setHeadings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCheckboxChange = (headingId, subheadingId, checked) => {
    setHeadings((prevHeadings) =>
      prevHeadings.map((heading) => {
        if (heading._id === headingId) {
          return {
            ...heading,
            subheadings: heading.subheadings.map((sub) => {
              if (sub._id === subheadingId) {
                return {
                  ...sub,
                  status: checked ? "Completed" : "Pending",
                };
              }
              return sub;
            }),
          };
        }
        return heading;
      })
    );

    axios
      .patch(
        `https://dsabackend.vercel.app/api/headings/user-progress/${subheadingId}`,
        {
          status: checked ? "Completed" : "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container my-4">
        <h2 className="text-center topics pt-4 mt-5">Topics</h2>
        <p className="text-center explore mb-4">Explore various topics and track your progress!</p>
      <div className="accordion " id="headingsAccordion">
        {headings.map((heading, index) => (
          <div className="accordion-item mt-4" key={heading._id}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button d-flex justify-content-between align-items-center w-100 ${
                  openIndex === index ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`collapse${index}`}
                style={{ backgroundColor: "#6385d9" }}
              >
                <span className="accordion-heading-text">{heading.title}</span>

                {heading.subheadings.every(
                  (sub) => sub.status === "Completed"
                ) ? (
                  <span className="badge bg-success ms-2">Completed</span>
                ) : (
                  <span className="badge bg-warning text-dark ms-2">
                    Pending
                  </span>
                )}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${
                openIndex === index ? "show" : ""
              }`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#headingsAccordion"
            >
              <div className="accordion-body">
                <div className="row">
                  {heading.subheadings.map((sub) => (
                    <div key={sub._id} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title">{sub.topicName}</h5>
                            <input
                              type="checkbox"
                              checked={sub.status === "Completed"}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  heading._id,
                                  sub._id,
                                  e.target.checked
                                )
                              }
                              aria-label={`Mark ${sub.topicName} as completed`}
                            />
                          </div>
                          <p className="card-text">
                            <strong>Level:</strong>{" "}
                            <span style={{ color: "#c676bc" }}>{sub.level}</span>
                            <br />
                            <strong>Status:</strong>{" "}
                            <span
                              className={
                                sub.status === "Completed"
                                  ? "text-success"
                                  : "text-warning"
                              }
                            >
                              {sub.status}
                            </span>
                          </p>
                          <div className="d-flex flex-column">
                            <a
                              href={sub.leetcodeLink}
                              className="btn btn-primary btn-sm mb-2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              LeetCode
                            </a>
                            <a
                              href={sub.youtubeLink}
                              className="btn btn-danger btn-sm mb-2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              YouTube
                            </a>
                            <a
                              href={sub.articleLink}
                              className="btn btn-success btn-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Article
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
