import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
      <Image src="/logo.png" alt="Logo" width={150} height={150} className="mb-6" />
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
        Welcome to the Sealix
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Securely issue, verify, and manage digital documents and credentials on the blockchain.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/auth/login" className="btn btn-primary text-lg">
          Login
        </Link>
        <Link href="/auth/register" className="btn btn-secondary text-lg">
          Register
        </Link>
      </div>
    </div>
  );
}
