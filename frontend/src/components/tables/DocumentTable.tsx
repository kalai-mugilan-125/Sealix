import { Document, DocumentStatus } from "@/types/document";
import { formatDate } from "@/lib/helpers";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface DocumentTableProps {
  documents: Document[];
  onView?: (id: string) => void;
  onRevoke?: (id: string) => void;
}

export default function DocumentTable({ documents, onRevoke }: DocumentTableProps) {
  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "valid":
        return "text-green-600";
      case "revoked":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="px-6 py-4 whitespace-nowrap">{doc.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doc.recipientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(doc.issuedAt)}</td>
              <td className={`px-6 py-4 whitespace-nowrap capitalize ${getStatusColor(doc.status)}`}>{doc.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Link href={`/issuer/documents/${doc.id}`} passHref>
                  <Button variant="outline" size="sm">View</Button>
                </Link>
                {doc.status !== "revoked" && (
                  <Button onClick={() => onRevoke?.(doc.id)} variant="destructive" size="sm">
                    Revoke
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
