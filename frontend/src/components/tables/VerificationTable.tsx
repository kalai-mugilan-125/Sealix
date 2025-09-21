import { VerificationHistoryItem } from "@/types/document";
import Button from "@/components/ui/Button";

interface VerificationTableProps {
  history: VerificationHistoryItem[];
}

export default function VerificationTable({ history }: VerificationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verifier</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(item.timestamp).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.documentHash.substring(0, 10)}...</td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{item.result}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.verifier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}