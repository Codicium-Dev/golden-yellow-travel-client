"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  return (
    <>
      <div className="pt-[140px] pb-[20px] bg-[#E2F3FF] open-sans">
        <div className="flex min-h-screen items-center justify-center">
          <SignUp
            fallbackRedirectUrl={`http://localhost:3000/${searchParams.get(
              "callbackUrl"
            )}`}
          />
        </div>
      </div>
    </>
  );
};
export default SignUpPage;
