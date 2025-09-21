import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { verificationService } from '../../services/verificationService';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function VerifierDashboard() {
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    loadVerificationHistory();
  }, []);

  const loadVerificationHistory = async () => {
    try {
      const response = await verificationService.getVerificationHistory();
      setVerificationHistory(response.history || []);
    } catch (error) {
      console.error('Error loading verification history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDocument = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setVerifying(true);
    try {
      const response = await verificationService.verifyDocument(searchQuery);
      setVerificationResult(response);
    } catch (error) {
      console.error('Error verifying document:', error);
      setVerificationResult({
        success: false,
        message: 'Error verifying document'
      });
    } finally {
      setVerifying(false);
    }
  };

  // Sample verification history data
  const sampleHistory = [
    {
      id: 'VER001',
      documentId: 'DOC001',
      documentTitle: 'Computer Science Degree',
      issuer: 'Tech University',
      verificationDate: '2024-03-15',
      status: 'Valid',
      verifierName: 'ABC Company'
    },
    {
      id: 'VER002',
      documentId: 'DOC005',
      documentTitle: 'Professional Certificate',
      issuer: 'Training Institute',
      verificationDate: '2024-03-14',
      status: 'Invalid',
      verifierName: 'XYZ Corp'
    },
    {
      id: 'VER003',
      documentId: 'DOC003',
      documentTitle: 'Bachelor Degree',
      issuer: 'State University',
      verificationDate: '2024-03-13',
      status: 'Valid',
      verifierName: 'DEF Organization'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'valid':
        return <CheckCircle size={20} style={{ color: '#10b981' }} />;
      case 'invalid':
        return <XCircle size={20} style={{ color: '#ef4444' }} />;
      default:
        return <Clock size={20} style={{ color: '#f59e0b' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'valid':
        return '#10b981';
      case 'invalid':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  return (
    <>
      <Head>
        <title>Verifier Dashboard - Sealix</title>
      </Head>

      <Navbar userRole="verifier" />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Verifier Dashboard</h1>
          <p>Verify document authenticity and view verification history</p>
        </div>

        {/* Document Verification Section */}
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Verify Document</h2>
          <form onSubmit={handleVerifyDocument} style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="documentId">Document ID or QR Code Data:</label>
                <input
                  type="text"
                  id="documentId"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter document ID or scan QR code..."
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '4px',
                    marginTop: '0.5rem'
                  }}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={verifying}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Search size={20} />
                {verifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </form>

          {verificationResult && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              borderRadius: '4px',
              background: verificationResult.success ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${verificationResult.success ? '#10b981' : '#ef4444'}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {verificationResult.success ? 
                  <CheckCircle size={20} style={{ color: '#10b981' }} /> :
                  <XCircle size={20} style={{ color: '#ef4444' }} />
                }
                <strong style={{ color: verificationResult.success ? '#10b981' : '#ef4444' }}>
                  {verificationResult.success ? 'Document Valid' : 'Document Invalid'}
                </strong>
              </div>
              <p>{verificationResult.message}</p>
              {verificationResult.document && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                  <p><strong>Title:</strong> {verificationResult.document.title}</p>
                  <p><strong>Issuer:</strong> {verificationResult.document.issuer}</p>
                  <p><strong>Issue Date:</strong> {verificationResult.document.issueDate}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Search size={48} style={{ color: '#2563eb', marginBottom: '1rem' }} />
            <h2 style={{ color: '#2563eb' }}>{sampleHistory.length}</h2>
            <p>Total Verifications</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <CheckCircle size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
            <h2 style={{ color: '#10b981' }}>
              {sampleHistory.filter(v => v.status === 'Valid').length}
            </h2>
            <p>Valid Documents</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <XCircle size={48} style={{ color: '#ef4444', marginBottom: '1rem' }} />
            <h2 style={{ color: '#ef4444' }}>
              {sampleHistory.filter(v => v.status === 'Invalid').length}
            </h2>
            <p>Invalid Documents</p>
          </div>
        </div>

        {/* Verification History */}
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Verification History</h2>
          {loading ? (
            <p>Loading verification history...</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {sampleHistory.map(verification => (
                <div 
                  key={verification.id} 
                  style={{ 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '4px', 
                    padding: '1rem', 
                    marginBottom: '1rem' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4>{verification.documentTitle}</h4>
                      <p><strong>Document ID:</strong> {verification.documentId}</p>
                      <p><strong>Issuer:</strong> {verification.issuer}</p>
                      <p><strong>Verified by:</strong> {verification.verifierName}</p>
                      <p><strong>Date:</strong> {new Date(verification.verificationDate).toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getStatusIcon(verification.status)}
                      <span style={{ 
                        color: getStatusColor(verification.status),
                        fontWeight: 'bold'
                      }}>
                        {verification.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}