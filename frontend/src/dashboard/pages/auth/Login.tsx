export default function Login() {
  return (
    <div className="bg-[#F1F6FF] min-h-screen dashboard-app">
      <div className="top bg-[url(/dashboard/images/login-bg.png)] bg-center bg-no-repeat bg-cover h-[240px] relative">
        <div className="bg-white rounded-3xl py-8 px-5 w-[90%] mx-auto gap-8 flex flex-col absolute -bottom-1/2 left-1/2 -translate-x-1/2">
          <div className="title gap-2 flex flex-col">
            <h1 className="text-2xl text-[#2E3139] font-bold">Welcome Back</h1>
            <h2 className="text-[#425583] font-normal text-sm">
              Sign in to your account
            </h2>
          </div>

          <div className="gap-8 flex flex-col">
            <div className="gap-4 flex flex-col">
              <div className="gap-1.5 flex flex-col">
                <label
                  htmlFor=""
                  className="text-xs text-[#2E3139] font-normal"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    placeholder="Enter your email"
                    type="text"
                    className="rounded-full w-full before:content-[] h-12 flex justify-center items-center border border-[#D3E0FE] placeholder:text-sm placeholder:font-normal placeholder:text-[#899CC9] text-[#2E3139] text-sm font-normal px-4 pl-[42px]"
                  />
                  <img
                    src="/dashboard/icons/email-login.svg"
                    alt=""
                    className="bg-contain bg-no-repeat bg-center block w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
