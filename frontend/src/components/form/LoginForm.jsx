import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    if (blocked) return;
    setLoading(true);

    setTimeout(() => {
      const storedUser = useAuthStore.getState().user;

      if (
        storedUser &&
        data.email === storedUser.email &&
        data.password === storedUser.password
      ) {
        login(storedUser);
        setLoginError("");
        setLoginAttempts(0);
        navigate("/dashboard");
      } else {
        setLoginAttempts((prev) => prev + 1);
        if (loginAttempts + 1 >= 5) {
          setBlocked(true);
          setLoginError("Terlalu banyak percobaan. Coba lagi 1 menit.");
          setTimeout(() => {
            setBlocked(false);
            setLoginAttempts(0);
            setLoginError("");
          }, 60000);
        } else {
          setLoginError("Email atau password salah");
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email tidak valid",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Masukkan email"
                    type="email"
                    className="focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password wajib diisi" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password" // ID untuk label
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      className="focus:ring-2 focus:ring-indigo-500 pr-10 dark:bg-gray-700 dark:text-white"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loginError && (
            <p className="text-red-500 text-sm text-center">{loginError}</p>
          )}

          <Button
            type="submit"
            disabled={loading || blocked}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 font-medium"
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
