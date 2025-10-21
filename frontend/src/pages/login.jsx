import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import LoginForm from "@/components/form/LoginForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900 dark:text-white font-semibold">
            Masuk
          </CardTitle>
        </CardHeader>

        <CardContent className="py-4">
          <LoginForm />
        </CardContent>

        <CardFooter className="justify-center pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Belum punya akun?{" "}
           <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Daftar di sini
          </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
