import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import login_img from "../../assets/imgs/login_img.png";
import login_gif from "../../assets/videos/login_gif.mp4";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputFields";
import { loginApi } from "../../services/loginApi";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    setError("");
    const errs: { email?: string; password?: string } = {};
    if (!email.includes("@")) errs.email = "Invalid email address.";
    if (password.length < 6)
      errs.password = "The password must be at least 6 characters.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const result = await loginApi(email, password);
    if ("error" in result) {
      setError(result.error);
    } else {
      login(result.data.access_token);

      setTimeout(() => {
        navigate("/admin");
      }, 0);
    }
  };

  return (
    <div className="relative w-full min-h-[100vh] min-w-[375px] p-4 flex items-center justify-center  overflow-auto">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={login_gif} type="video/mp4" />
      </video>
      <div className="relative z-10 h-[55%] xl:h-auto w-full xl:w-[60%] bg-white flex gap-2 items-center rounded-2xl p-4  text-[14px] sm:text-[16px]  max-w-[1000px] min-h-[400px]">
        <div className="w-[40%] hidden sm:block xl:w-[50%]">
          <img src={login_img} alt="login illustration" />
        </div>
        <div className="w-full sm:w-[60%] xl:w-[40%] flex flex-col gap-10">
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <h2 className="font-bold text-[35px] sm:text-[40px]">
              Admin Login
            </h2>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              error={fieldErrors.email}
              placeholder="example@email.com"
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              error={fieldErrors.password}
              placeholder="Your password"
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            {error && (
              <p className="text-red-500 text-center font-bold">{error}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-[#FD7A7E] py-2 rounded-2xl hover:opacity-90 transition"
            >
              <span className="font-bold text-white text-[16px] sm:text-[20px]">
                Login
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
