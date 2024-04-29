"use client";

import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <>
      <div className="pt-[140px] pb-[20px] bg-[#E2F3FF] open-sans">
        <div className="flex min-h-screen items-center justify-center">
          <SignUp />
        </div>
      </div>
    </>
  );
};
export default SignUpPage;
