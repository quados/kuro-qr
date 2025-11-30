export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <main className="flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">QR Code Redirector</h1>
        <p className="text-lg text-gray-600 max-w-md mb-8">
          Scan a QR code to be redirected to a random URL from your personalized list.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">How it works</h2>
          <ol className="text-left text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="font-bold text-indigo-600 mr-2">1.</span>
              <span>Generate a QR code with your unique hash</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-indigo-600 mr-2">2.</span>
              <span>Scan the QR code with any device</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-indigo-600 mr-2">3.</span>
              <span>Get redirected to a random URL from your list</span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  )
}
