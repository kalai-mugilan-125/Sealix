import { X } from 'lucide-react';

const QRModal = ({ document, onClose }) => {
  // Generate a simple QR code placeholder
  // In a real app, you'd use a QR code library like qrcode or react-qr-code
  const qrData = `${document.id}:${document.title}:${document.issuer}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Document QR Code</h2>
          
          <div style={{ 
            marginBottom: '1rem',
            padding: '1rem',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <img 
              src={qrCodeUrl} 
              alt="Document QR Code"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <h4>Document Details:</h4>
            <p><strong>Title:</strong> {document.title}</p>
            <p><strong>ID:</strong> {document.id}</p>
            <p><strong>Issuer:</strong> {document.issuer}</p>
            <p><strong>Status:</strong> {document.status}</p>
          </div>
          
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Scan this QR code to verify the document authenticity
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRModal;