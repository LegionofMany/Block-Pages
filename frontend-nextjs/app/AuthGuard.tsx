'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = useMemo(() => ['/login', '/register', '/forgot-password'], []);

  useEffect(() => {
    if (!auth?.loading && !auth?.user && !publicPaths.includes(pathname)) {
      router.push('/login');
    }
  }, [auth, router, pathname, publicPaths]);

  if ((auth?.loading || !auth?.user) && !publicPaths.includes(pathname)) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return <>{children}</>;
};

export default AuthGuard;
