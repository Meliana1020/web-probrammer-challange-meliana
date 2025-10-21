import useAuthStore from "../store/useAuthStore";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Selamat Datang, {user?.email || "User"} 🎉
      </h1>
      <Button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Logout
      </Button>
    </div>
  );
}
