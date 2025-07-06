'use client';

import { useSession } from '@/lib/auth-client';
import { LoginForm } from '@/components/auth/login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

 

  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}