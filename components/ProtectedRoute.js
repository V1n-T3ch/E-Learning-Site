import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login"); // Redirect to login page
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return session ? children : null;
};

export default ProtectedRoute;
