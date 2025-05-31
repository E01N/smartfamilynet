import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ParentDashboard = ({ token }) => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    axios
      .get('http://localhost:5000/api/children', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setChildren(res.data);
      })
      .catch((err) => {
        console.error('Error fetching children:', err);
        setError('Failed to load children. Please check your token.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const loadSummary = (childId) => {
    axios
      .get(`http://localhost:5000/api/children/${childId}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSelectedChild(childId);
        setSummary(res.data);
      })
      .catch((err) => console.error('Error fetching summary:', err));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-box">
        <h2>Parent Dashboard</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>Loading children...</p>}
        {!loading && token && children.length === 0 && (
          <p>No children found for this account.</p>
        )}

        <h3>Your Children:</h3>
        <ul className="children-list">
          {selectedChild ? (
            <li>
              <button
                className="back-button-icon"
                onClick={() => {
                  setSelectedChild(null);
                  setSummary(null);
                }}
                title="Back to children"
              >
                <ArrowBackIcon />
              </button>
              <span className="child-name">
                {summary?.child || 'Child'}
              </span>
            </li>
          ) : (
            children.map((child) => (
              <li key={child._id}>
                <button onClick={() => loadSummary(child._id)}>
                  {child.name}
                </button>
              </li>
            ))
          )}
        </ul>

        {summary && (
          <div className="summary">
            <div className="summary-section">
              <h4>Summary for <span className="child-name">{summary.child}</span></h4>

              <p className="summary-item"><strong>Total Logs:</strong> {summary.summary.totalLogs}</p>
              <p className="summary-item">
                <strong>Last Activity:</strong>{' '}
                {new Date(summary.summary.lastActivity).toLocaleString()}
              </p>

              <div className="summary-row">
                <div className="summary-column">
                  <h5>Blocked Sites:</h5>
                  <ul>
                    {summary.summary.blockedSites.map(domain => (
                      <li key={domain}>{domain}</li>
                    ))}
                  </ul>
                </div>
                <div className="summary-column">
                  <h5>Accessed Sites:</h5>
                  <ul>
                    {summary.summary.accessedSites.map(domain => (
                      <li key={domain}>{domain}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>


            <div className="activity-section">
              <h4 className="activity-header">Recent Activity:</h4>
              <ul className="activity-list">
                {summary.recentActivity.map((entry, index) => (
                  <li key={index}>
                    [{new Date(entry.time).toLocaleTimeString()}] {entry.event} – <em>{entry.domain}</em>
                  </li>
                ))}
              </ul>
          </div>

          </div>
        )}

        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ParentDashboard;
