import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { MyStore } from "../../../Context/MyContext";
import { toast } from "react-toastify";
import Logo from "../../../components/Logo";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white py-3.5 pl-11 pr-4 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:border-indigo-400"

export default function SignInForm() {
  let { userData, setProfile } = useContext(MyStore)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const myRef = useRef({})


  function getCredentials(e) {
    if (e) {
      myRef.current[e.name] = e
    }
  }
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 dark:border-neutral-800 dark:bg-neutral-900">
        <Logo size="md" className="mb-8 justify-center lg:hidden" />

        <h2 className="mb-2 text-3xl font-medium text-neutral-900 dark:text-white">Sign in</h2>
        <p className="mb-8 text-[15px] text-neutral-500 dark:text-neutral-400">Enter your credentials to continue</p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            let user = userData.find((u) => {
              return (u.email === myRef.current.email.value)
            })
            let pass = userData.find((u) => {
              return u.password === myRef.current.password.value
            })

            if (user && pass) {
              setProfile(user)
              localStorage.setItem('userProfile', JSON.stringify(user))
              toast.success('Used logged in..')
              navigate('/home')
            } else if (!user) {
              toast.error('User not registerd')
              navigate('/sign-up')
            } else {
              toast.error('Invalid credentials')
            }


          }}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div>
            <label htmlFor="signin-email" className="sr-only">Email address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400" />
              <input
                id="signin-email"
                ref={getCredentials}
                type="email"
                required
                name="email"
                placeholder="Email address"
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signin-password" className="sr-only">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400" />
              <input
                id="signin-password"
                ref={getCredentials}
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4.5 w-4.5" />
                ) : (
                  <Eye className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* Sign in button */}
          <button
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-medium text-white transition-colors duration-150 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            Sign in
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </form>

        <p className="mt-6 text-center text-[15px] text-neutral-500 dark:text-neutral-400">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => {
              navigate('/sign-up')
            }}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
