'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Simple XOR-based decryption for client-side (basic obfuscation)
function simpleDecrypt(encryptedBase64: string, key: string): string {
  const encrypted = atob(encryptedBase64);
  const keyBytes = new TextEncoder().encode(key);
  let result = '';
  
  for (let i = 0; i < encrypted.length; i++) {
    result += String.fromCharCode(
      encrypted.charCodeAt(i) ^ keyBytes[i % keyBytes.length]
    );
  }
  
  return result;
}

interface UserData {
  hash: string;
  name: string;
  urls: string[];
}

export default function HashPage() {
  const params = useParams();
  const [error, setError] = useState<string | null>(null);
  const hash = params?.hash as string;

  useEffect(() => {
    async function redirect() {
      try {
        // Fetch encrypted data
        const response = await fetch('/data.enc');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        
        const encryptedData = await response.text();
        
        // Decrypt data (using a hardcoded key for client-side - embedded during build)
        // In production, this would be replaced during the build process
        const decryptedData = simpleDecrypt(
          encryptedData,
          process.env.NEXT_PUBLIC_CLIENT_KEY || 'default-client-key'
        );
        
        const users: UserData[] = JSON.parse(decryptedData);
        
        // Find user by hash
        const user = users.find((u) => u.hash === hash);
        
        if (!user) {
          setError('User not found');
          return;
        }
        
        if (user.urls.length === 0) {
          setError('No URLs configured for this user');
          return;
        }
        
        // Select random URL
        const randomUrl = user.urls[Math.floor(Math.random() * user.urls.length)];
        
        // Redirect
        window.location.href = randomUrl;
      } catch (err) {
        console.error('Redirect error:', err);
        setError('Failed to process redirect');
      }
    }

    if (hash) {
      redirect();
    }
  }, [hash]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-700">Redirecting...</p>
        </div>
      </div>
    </div>
  );
}
