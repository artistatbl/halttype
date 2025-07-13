'use client';

import { useSession } from '@/lib/auth-client';
import { LoginForm } from '@/components/auth/login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}