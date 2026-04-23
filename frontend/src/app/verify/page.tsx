"use client";
import { Suspense } from "react";
import VerifyOtp from "../components/VerifyOtp"; // adjust path if needed
import Loading from "../components/Loading";

export default function VerifyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyOtp />
    </Suspense>
  );
}
