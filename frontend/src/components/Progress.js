import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Progress = () => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    axios.get('https://dsabackend.vercel.app/api/headings/with-progress', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setHeadings(res.data))
    .catch(err => console.error(err));
  }, []);

  const allSubheadings = headings.flatMap(heading => heading.subheadings);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const stats = difficulties.map(level => {
    const filtered = allSubheadings.filter(sub => sub.level === level);
    const total = filtered.length;
    const completed = filtered.filter(sub => sub.status === 'Completed').length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { level, total, completed, percentage };
  });

  return (
    <div className="container my-5">
      <h2 className='topics text-center pt-4 mt-5'>Progress Reports</h2>
      <div className="row mt-4">
        {stats.map(({ level, total, completed, percentage }) => (
          <div key={level} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>{level}</h5>
                <p>
                  Completed: {completed} / {total} ({percentage}%)
                </p>
                <div className="progress">
                  <div
                    className={`progress-bar ${
                      percentage === 100
                        ? 'bg-success'
                        : percentage > 50
                        ? 'bg-info'
                        : 'bg-warning'
                    }`}
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
