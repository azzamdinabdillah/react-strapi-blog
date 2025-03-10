import { produce } from "immer";
import { FormEvent, useState } from "react";
import { httpRequest } from "../../../helpers/http-request";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToken } from "../../slices/authSlices";

export default function Login() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<{
    identifier: string;
    password: string;
  }>({
    identifier: "adin@gmail.com",
    password: "1234567",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await httpRequest({
        type: "post",
        url: "/auth/local",
        body: inputs,
      });
    },
    onSuccess: (data) => {
      dispatch(setToken(data.jwt));
      navigate("/dashboard");
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <div className="bg-[#F1F6FF] min-h-dvh dashboard-app xl:bg-white xl:min-h-[200px]">
      <div className="xl:grid grid-cols-2 items-center">
        <div className="hidden xl:block xl:h-[100dvh]">
          <img
            src="/dashboard/images/login-bg-desktop.png"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="top bg-[url(/dashboard/images/login-bg.png)] bg-center bg-no-repeat bg-cover h-[240px] relative xl:bg-none xl:h-fit">
          <div className="bg-white rounded-3xl py-8 px-5 w-[90%] mx-auto gap-8 flex flex-col absolute -bottom-[140%] left-1/2 -translate-x-1/2 md:max-w-[700px] xl:static xl:translate-0 xl:max-w-[400px] xl:p-0 xl:gap-12">
            <div className="title gap-2 flex flex-col">
              <h1 className="text-2xl text-[#2E3139] font-bold xl:text-[32px]">
                Welcome Back
              </h1>
              <h2 className="text-[#425583] font-normal text-sm">
                Sign in to your account
              </h2>
            </div>

            <form className="gap-8 flex flex-col" onSubmit={handleSubmit}>
              <div className="gap-4 flex flex-col">
                <p
                  className={`flex gap-1 text-red-d9 text-xs font-normal ${
                    Array.isArray(mutation.error)
                      ? "flex-col"
                      : "flex-row items-center"
                  } ${!mutation.isError ? "hidden" : ""}`}
                >
                  {Array.isArray(mutation.error) ? (
                    mutation.error.map((error) => (
                      <div className="flex gap-1">
                        <img src="/dashboard/icons/error-login.svg" alt="" />
                        {error.message}
                      </div>
                    ))
                  ) : (
                    <>
                      <img src="/dashboard/icons/error-login.svg" alt="" />
                      {String(mutation.error)}
                    </>
                  )}
                </p>
                <div className="gap-1.5 flex flex-col">
                  <label
                    htmlFor=""
                    className="text-xs text-[#2E3139] font-normal"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      value={inputs.identifier}
                      placeholder="Enter your email"
                      onChange={(e) =>
                        setInputs(
                          produce((draft) => {
                            draft.identifier = e.target.value;
                          })
                        )
                      }
                      type="email"
                      className="rounded-full w-full before:content-[] h-12 flex justify-center items-center border border-[#D3E0FE] focus:border-[#4045EF] outline-none placeholder:text-sm placeholder:font-normal placeholder:text-[#899CC9] text-[#2E3139] text-sm font-normal px-4 pl-[42px]"
                    />
                    <img
                      src="/dashboard/icons/email-login.svg"
                      alt=""
                      className="bg-contain bg-no-repeat bg-center block w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4"
                    />
                  </div>
                </div>

                <div className="gap-1.5 flex flex-col">
                  <label
                    htmlFor=""
                    className="text-xs text-[#2E3139] font-normal"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      value={inputs.password}
                      onChange={(e) =>
                        setInputs(
                          produce((draft) => {
                            draft.password = e.target.value;
                          })
                        )
                      }
                      placeholder="Enter your password"
                      type="password"
                      className="rounded-full w-full before:content-[] h-12 flex justify-center items-center border border-[#D3E0FE] focus:border-[#4045EF] outline-none placeholder:text-sm placeholder:font-normal placeholder:text-[#899CC9] text-[#2E3139] text-sm font-normal px-4 pl-[42px]"
                    />
                    <img
                      src="/dashboard/icons/lock-login.svg"
                      alt=""
                      className="bg-contain bg-no-repeat bg-center block w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4"
                    />
                  </div>
                </div>

                {/* <div className="flex justify-between items-center">
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="checkbox"
                      className="border border-[#4045EF] rounded-sm w-[18px] h-[18px] appearance-none"
                    />
                    <p className="text-sm font-normal text-black-2e">
                      Remember Me
                    </p>
                  </div>
                  <p className="text-sm font-medium text-primary-1">
                    Forgot Password
                  </p>
                </div> */}
              </div>

              <div className="">
                <button
                  className="w-full rounded-full py-[15.5px] px-10 text-white text-sm font-normal bg-primary-1 hover:opacity-75 cursor-pointer disabled:opacity-75"
                  disabled={mutation.isPending ? true : false}
                >
                  {mutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      Loading
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx={12}
                          cy={12}
                          r={10}
                          stroke="currentColor"
                          strokeWidth={4}
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>

              <div>
                <p className="font-normal text-sm text-blue-42 text-center">
                  Don’t have an account?{" "}
                  <Link
                    to={"/register"}
                    className="text-primary-1 font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
