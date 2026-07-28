import { useContext, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import { useRef } from "react";
import { MyStore } from "../../Context/MyContext";
import { toast } from "react-toastify";


// REGEX
const reMinLen = /.{8,}/;
const reLower = /[a-z]/;
const reUpper = /[A-Z]/;
const reDigit = /[0-9]/;
const reSpecial = /[^A-Za-z0-9]/;


// For CHECKING PASSWORD STRENGTH
function getPasswordStrength(value) {
  let score = 0;
  if (reMinLen.test(value)) score++;
  if (reLower.test(value)) score++;
  if (reUpper.test(value)) score++;
  if (reDigit.test(value)) score++;
  if (reSpecial.test(value)) score++;

  if (score <= 1) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

const fieldWrapClass = "flex items-center gap-2.5 h-12 px-3.5 bg-neutral-50 border border-neutral-200 rounded-xl transition-colors focus-within:border-indigo-500 dark:bg-neutral-800/60 dark:border-neutral-700 dark:focus-within:border-indigo-400"
const inputTextClass = "flex-1 bg-transparent outline-none text-sm text-neutral-900 placeholder-neutral-400 dark:text-white dark:placeholder-neutral-500"

const SignUpForm = () => {
  let navigate = useNavigate()
  let { reset, register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })
  let { userData, setUserData, setProfile } = useContext(MyStore)


  // For CHECKING PASSWORD STRENGTH
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const confirm = useRef(null)



  const level = password.length > 0 ? getPasswordStrength(password) : null;

  const barColor = (index) => {
    if (!level) return "bg-neutral-200 dark:bg-neutral-700";
    if (level === "weak") return index === 0 ? "bg-red-500" : "bg-neutral-200 dark:bg-neutral-700";
    if (level === "medium") return index < 2 ? "bg-amber-500" : "bg-neutral-200 dark:bg-neutral-700";
    return "bg-emerald-500";
  };

  const labelColor = () => {
    if (level === "weak") return "text-red-500";
    if (level === "medium") return "text-amber-500";
    if (level === "strong") return "text-emerald-500";
    return "text-neutral-400";
  };

  const labelText = () => {
    if (level === "weak") return "Weak";
    if (level === "medium") return "Medium";
    if (level === "strong") return "Strong";
    return "";
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 sm:p-9 dark:border-neutral-800 dark:bg-neutral-900">
      <h1 className="mb-1 text-2xl font-medium text-neutral-900 dark:text-white">Create account</h1>
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">Join Marque and start shopping</p>

      <form
        onSubmit={handleSubmit((data) => {
          if (confirm.current.value !== password) {
            toast.error("Password Not Matched...!")
            return
          }
          let isResgistered = userData.find((val) => {
            return val.email === data.email
          })
          if (isResgistered) {
            toast.error('Email already registered')
            return
          }

          toast.success(`${data.name} Logged in..`)
          let newUserData = [...userData, data]
          setUserData(newUserData)
          localStorage.setItem('registeredUser', JSON.stringify(newUserData))
          setProfile(data)
          localStorage.setItem('userProfile', JSON.stringify(data))
          navigate('/home')
          reset()
          setPassword('')
        })}
        className="flex flex-col gap-3.5" >
        <div>
          <label htmlFor="signup-name" className="sr-only">Full name</label>
          <div className={fieldWrapClass}>
            <User size={16} className="shrink-0 text-neutral-400" />
            <input
              id="signup-name"
              {...register('name', { required: "Name is required" })}
              type="text"
              placeholder="Full name"
              className={inputTextClass}
            />
          </div>
          {errors.name && <p className="mt-1 text-[12px] text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="signup-email" className="sr-only">Email address</label>
          <div className={fieldWrapClass}>
            <Mail size={16} className="shrink-0 text-neutral-400" />
            <input
              id="signup-email"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email not valid"
                }
              })}
              type="email"
              placeholder="Email address"
              className={inputTextClass}
            />
          </div>
          {errors.email && <p className="mt-1 text-[12px] text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="signup-password" className="sr-only">Password</label>
          <div className={fieldWrapClass}>
            <Lock size={16} className="shrink-0 text-neutral-400" />
            <input
              id="signup-password"
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 chars required"
                }

              })}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 chars)"
              className={inputTextClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-[12px] text-red-500">{errors.password.message}</p>}
        </div>

        {level && (
          <div className="-mt-1 flex items-center gap-2.5">
            <div className="flex flex-1 gap-1.5">
              <span className={`h-1 flex-1 rounded-full ${barColor(0)}`} />
              <span className={`h-1 flex-1 rounded-full ${barColor(1)}`} />
              <span className={`h-1 flex-1 rounded-full ${barColor(2)}`} />
            </div>
            <span className={`min-w-11.5 text-right text-xs ${labelColor()}`}>
              {labelText()}
            </span>
          </div>
        )}

        <div>
          <label htmlFor="signup-confirm" className="sr-only">Confirm password</label>
          <div className={fieldWrapClass}>
            <Lock size={16} className="shrink-0 text-neutral-400" />
            <input
              id="signup-confirm"
              ref={confirm}
              type="password"
              placeholder="Confirm password"
              className={inputTextClass}
            />
          </div>
          {confirm.current?.value && confirm.current.value !== password && <p className="mt-1 text-[12px] text-red-500">Password not matched!!</p>}
        </div>

        <button
          className="mt-1.5 flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
        >
          Create Account
          <ArrowRight size={16} />
        </button>

        <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <NavLink to={'/'} className="font-medium text-indigo-600 dark:text-indigo-400">
            Sign in
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
