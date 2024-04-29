"use client";

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <>
      <div className="pt-[40px] pb-[20px] bg-[#E2F3FF] open-sans">
        <div className="flex min-h-screen items-center justify-center">
          <SignIn />
        </div>
      </div>
    </>
  );
};
export default SignInPage;
