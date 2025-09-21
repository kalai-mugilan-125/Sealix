import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import DocumentCard from '../../components/DocumentCard';
import { documentService } from '../../services/documentService';
import { User, FileText, Shield } from 'lucide-react';

export default function UserDashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserDocuments();
  }, []);

  const loadUserDocuments = async () => {
    try {
      const response = await documentService.getUserDocuments();
      setDocuments(response.documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for demonstration
  const sampleDocuments = [
    {
      id: 'DOC003',
      title: 'Bachelor of Science',
      type: 'Academic Degree',
      issuer: 'State University',
      issueDate: '2023-05-20',
      status: 'Verified'
    },
    {
      id: 'DOC004',
      title: 'Driving License',
      type: 'Government ID',
      issuer: 'DMV Authority',
      issueDate: '2023-08-15',
      status: 'Verified'
    },
    {
      id: 'DOC005',
      title: 'Professional Certification',
      type: 'Training Certificate',
      issuer: 'Tech Institute',
      issueDate: '2024-01-10',
      status: 'Pending'
    }
  ];

  return (
    <>
      <Head>
        <title>User Dashboard - Sealix</title>
      </Head>

      <Navbar userRole="user" />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Documents</h1>
          <p>View and manage your verified documents</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <FileText size={48} style={{ color: '#2563eb', marginBottom: '1rem' }} />
            <h2 style={{ color: '#2563eb' }}>{sampleDocuments.length}</h2>
            <p>Total Documents</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Shield size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
            <h2 style={{ color: '#10b981' }}>
              {sampleDocuments.filter(d => d.status === 'Verified').length}
            </h2>
            <p>Verified</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <User size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
            <h2 style={{ color: '#f59e0b' }}>
              {sampleDocuments.filter(d => d.status === 'Pending').length}
            </h2>
            <p>Pending</p>
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Profile Information</h2>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Member Since:</strong> January 2023</p>
          </div>
        </div>

        <div>
          <h2>My Documents</h2>
          {loading ? (
            <p>Loading documents...</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {sampleDocuments.map(document => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          )}
        </div>
    </div>
</>
  );}