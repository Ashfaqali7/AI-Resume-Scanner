"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Folder,
  FileText,
  Brain,
  CheckCircle,
  Sheet,
  Phone,
  User,
  Mail,
  XCircle,
  Trophy,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Progress } from "@/components/ui/progress"; // Assuming you have a Progress component

interface ScanResult {
  name: string;
  contact: string;
  status: string;
  score: number;
  reason: string;
}

export default function ResumeScanner() {
  const [jobDescription, setJobDescription] = useState("");
  const [folderName, setFolderName] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); // New state for progress
  const [currentStep, setCurrentStep] = useState(0); // New state for current step

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || !folderName.trim()) {
      setError("Please fill in both job description and folder name.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentStep(0);
    setProgress(0);

    const payload = { job_description: jobDescription, folder_name: folderName };

    try {
      // Simulate API calls with progressive updates
      // Step 1: Search Folder
      setCurrentStep(0);
      setProgress(15);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 2: Extract Text
      setCurrentStep(1);
      setProgress(40);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 3: AI Analysis
      setCurrentStep(2);
      setProgress(65);
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // Step 4 & 5: Score & Status + Save to Sheets
      setCurrentStep(3);
      setProgress(90);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 6: Send Email
      setCurrentStep(4);
      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      setResult(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setProgress(0);
      setCurrentStep(-1);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      icon: <Folder className="h-8 w-8 text-blue-400" />,
      title: "Search Folder",
      desc: "Find resumes inside Google Drive folder.",
    },
    {
      icon: <FileText className="h-8 w-8 text-green-400" />,
      title: "Extract Text",
      desc: "Parse resumes into clean text.",
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      title: "AI Analysis",
      desc: "Match resumes with job description.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-yellow-400" />,
      title: "Score & Status",
      desc: "AI suggests shortlist/reject.",
    },
    {
      icon: <Sheet className="h-8 w-8 text-teal-400" />,
      title: "Save to Sheets",
      desc: "Store results in Google Sheets.",
    },
    {
      icon: <Mail className="h-8 w-8 text-cyan-400" />,
      title: "Send Email",
      desc: "Automatic send email to candidate",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-8">
        {/* Title */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Resume Scanner
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Scan resumes from Google Drive, analyze with AI, and log results in
            Google Sheets — all in one click.
          </p>
        </motion.div>

        {/* Main content - Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">
                  Start Scanning
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Provide folder name and job description to begin.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-2 relative">
                    <Label className="text-gray-500" htmlFor="folderName">Google Drive Folder Name</Label>
                    <Input
                      id="folderName"
                      placeholder="e.g. resumes_batch_2025"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      disabled={isLoading}
                      className="pl-10 bg-gray-700/70 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-blue-500 rounded-xl"
                    />
                    <Folder className="absolute left-3 top-[30px] text-gray-400 pointer-events-none" />
                  </div>
                  <div className="space-y-2 relative">
                    <Label className="text-gray-500" htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste job description..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      disabled={isLoading}
                      className="min-h-[180px] bg-gray-700/70 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-blue-500 rounded-xl"
                    />
                  </div>
                </CardContent>
                <div className="p-6 pt-0 flex justify-center">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      "Start Scan"
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>

          {/* Right: Progress & How it Works */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-200">
                  Scanning in Progress...
                </h2>
                {/* <Progress value={progress} className="h-2" /> */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
                        currentStep === i
                          ? "bg-blue-500/30 ring-2 ring-blue-500/70"
                          : "bg-gray-800/50"
                      }`}
                    >
                      <span
                        className={`transition-colors ${
                          currentStep >= i
                            ? "text-blue-400"
                            : "text-gray-500"
                        }`}
                      >
                        {step.icon}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          currentStep >= i ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {!isLoading && (
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.15 },
                  },
                }}
              >
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                      whileHover={{ scale: 1.05, y: -6 }}
                      className="relative bg-gray-800/60 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-700">
                          {step.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-100">{step.title}</h3>
                        <p className="text-sm text-gray-400">{step.desc}</p>
                      </div>
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                        {i + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gray-800/70 backdrop-blur-xl border-gray-700 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">
                  Candidate Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI extracted and analyzed details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-200">
                <div className="flex items-center space-x-3">
                  <User className="text-blue-400" />
                  <span className="font-medium">Name:</span> {result.name}
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-cyan-400" />
                  <span className="font-medium">Email:</span>{" "}
                  <a href={`mailto:${result.contact}`} className="text-cyan-300 hover:underline">
                    {result.contact}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium">Status:</span>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    result.status === "shortlisted"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {result.status === "shortlisted" ? (
                      <Trophy className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <span>{result.status}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="text-purple-400" />
                  <span className="font-medium">Score:</span>
                  <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {result.score}%
                  </span>
                </div>
                <div>
                  <span className="font-medium">Reason:</span>{" "}
                  <p className="text-gray-400 mt-1">{result.reason}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}