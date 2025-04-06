import Link from "next/link";
import { Button } from "./ui/button";

// Enhanced Hero Section for Clinic with AI Pneumonia Detection
const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white text-center p-8">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to Our Clinic</h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto">Utilizing advanced AI technology to detect pneumonia early and accurately, ensuring the best care for our patients.</p>
      <div className="mb-8">
        <h2 className="text-4xl text-blue-400 mb-3">Our Services</h2>
        <ul className="list-none space-y-2">
          <li className="text-lg">🔍 AI-Powered Pneumonia Detection</li>
          <li className="text-lg">🩺 Comprehensive Health Check-ups</li>
          <li className="text-lg">💊 Personalized Treatment Plans</li>
        </ul>
      </div>
      <div className="flex space-x-4">
        <Button variant="link">Learn More</Button>
        <Link href="/appointment"><Button variant="default">Schedule an Appointment</Button></Link>
      </div>
    </div>
  );
};

export default HeroSection;
