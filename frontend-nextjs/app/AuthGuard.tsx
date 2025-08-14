'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log("AuthGuard: auth", auth);

  const publicPaths = useMemo(() => ['/login', '/register', '/forgot-password'], []);

  useEffect(() => {
    if (!auth?.loading) {
      const isPublic = publicPaths.includes(pathname);
      if (auth?.user && isPublic) {
        router.push('/');
      }
      if (!auth?.user && !isPublic) {
        router.push('/login');
      }
    }
  }, [auth?.loading, auth?.user, pathname, publicPaths, router]);

  if (auth?.loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return <>{children}</>;
};

export default AuthGuard;
