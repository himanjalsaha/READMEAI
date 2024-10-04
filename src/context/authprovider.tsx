'use client';

import { SessionProvider } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const publicRoutes = ['/sign-in', '/']; // Add your public routes here

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session && !publicRoutes.includes(pathname)) {
      router.push('/sign-in');
    }
  }, [session, status, pathname, router]);

  // Always render children, but redirect if necessary
  return <>{children}</>;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>{children}</AuthGuard>
    </SessionProvider>
  );
}