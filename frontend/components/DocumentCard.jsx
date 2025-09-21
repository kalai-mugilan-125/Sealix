import { useState } from 'react';
import { FileText, Calendar, User, Shield } from 'lucide-react';
import QRModal from './QRModal';

const DocumentCard = ({ 
  document = {
    id: 'DOC001',
    title: 'Academic Certificate',
    type: 'Certificate',
    issuer: 'University of Technology',
    issueDate: '2024-01-15',
    status: 'Verified'
  }
}) => {
  const [showQR, setShowQR] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <>
      <div className="document-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} />
              {document.title}
            </h3>
            
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} />
              <strong>Issuer:</strong> {document.issuer}
            </p>
            
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} />
              <strong>Issue Date:</strong> {new Date(document.issueDate).toLocaleDateString()}
            </p>
            
            <p><strong>Type:</strong> {document.type}</p>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              <Shield size={16} />
              <span 
                style={{ 
                  color: getStatusColor(document.status),
                  fontWeight: 'bold'
                }}
              >
                {document.status}
              </span>
            </div>
          </div>
          
          <button 
            className="btn btn-secondary"
            onClick={() => setShowQR(true)}
            style={{ marginLeft: '1rem' }}
          >
            Show QR
          </button>
        </div>
      </div>

      {showQR && (
        <QRModal 
          document={document}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  );
};

export default DocumentCard;