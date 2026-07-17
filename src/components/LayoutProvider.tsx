"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./CustomCursor";
import BackgroundMesh from "./BackgroundMesh";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Cinematic Loading screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Interactive global components */}
      <CustomCursor />
      <BackgroundMesh />

      {!loading && (
        <SmoothScroll>
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
