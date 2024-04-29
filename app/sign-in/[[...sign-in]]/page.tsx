"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const SignInPage = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <div className="pt-[40px] pb-[20px] bg-[#E2F3FF] open-sans">
        <div className="flex min-h-screen items-center justify-center">
          <SignIn
            fallbackRedirectUrl={`http://localhost:3000/${searchParams.get(
              "callbackUrl"
            )}`}
          />
        </div>
      </div>
    </>
  );
};
export default SignInPage;
