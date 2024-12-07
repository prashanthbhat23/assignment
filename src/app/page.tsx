import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div>
        <Link href="/users">
          <button
            className="mr-5 px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            Go to Users
          </button>
        </Link>

        <Link href="/invoice">
          <button
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Go to Invoice
          </button>
        </Link>
      </div>
    </div>
  );
}
