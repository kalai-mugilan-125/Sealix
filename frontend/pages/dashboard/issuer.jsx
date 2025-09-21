import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import DocumentCard from '../../components/DocumentCard';
import { documentService } from '../../services/documentService';
import { Plus, FileText } from 'lucide-react';

export default function IssuerDashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssuedDocuments();
  }, []);

  const loadIssuedDocuments = async () => {
    try {
      const response = await documentService.getIssuedDocuments();
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
      id: 'DOC001',
      title: 'Computer Science Degree',
      type: 'Academic Certificate',
      issuer: 'Tech University',
      issueDate: '2024-01-15',
      status: 'Verified',
      recipient: 'John Doe'
    },
    {
      id: 'DOC002',
      title: 'Professional Certificate',
      type: 'Training Certificate',
      issuer: 'Tech University',
      issueDate: '2024-02-10',
      status: 'Pending',
      recipient: 'Jane Smith'
    }
  ];

  return (
    <>
      <Head>
        <title>Issuer Dashboard - Sealix</title>
      </Head>

      <Navbar userRole="issuer" />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Issuer Dashboard</h1>
          <p>Manage and issue verified documents</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} />
            Issue New Document
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <FileText size={48} style={{ color: '#2563eb', marginBottom: '1rem' }} />
            <h2 style={{ color: '#2563eb' }}>{sampleDocuments.length}</h2>
            <p>Documents Issued</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <FileText size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
            <h2 style={{ color: '#10b981' }}>
              {sampleDocuments.filter(d => d.status === 'Verified').length}
            </h2>
            <p>Verified Documents</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <FileText size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
            <h2 style={{ color: '#f59e0b' }}>
              {sampleDocuments.filter(d => d.status === 'Pending').length}
            </h2>
            <p>Pending Verification</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Recent Documents</h2>
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
  );
}