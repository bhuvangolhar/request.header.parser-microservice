import { useState } from "react";
import { ApiTester } from "@/components/api-tester";
import { ResponseDisplay } from "@/components/response-display";
import { DocumentationTabs } from "@/components/documentation-tabs";
import { CodeExamples } from "@/components/code-examples";
import { FeaturesGrid } from "@/components/features-grid";
import { Github, Globe, Dock, Languages } from "lucide-react";
import type { HeaderParseResponse } from "@shared/schema";

export default function Home() {
  const [response, setResponse] = useState<HeaderParseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const handleApiTest = async (customHeaders: Record<string, string> = {}) => {
    setIsLoading(true);
    setError(null);
    const startTime = performance.now();
    
    try {
      const headers: HeadersInit = {
        'Accept': 'application/json',
        ...customHeaders
      };

      const response = await fetch('/api/whoami', { headers });
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-code text-white text-sm"></i>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Header Parser API</h1>
                <p className="text-sm text-slate-500">Request Header Analysis Microservice</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Service Online</span>
              </div>
              <button className="text-slate-600 hover:text-slate-900" data-testid="github-link">
                <Github size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Parse HTTP Request Headers</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Extract client information including IP address, user agent details, and language preferences from HTTP request headers
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
              <Globe className="text-accent" size={16} />
              <span>IP Detection</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
              <Dock className="text-accent" size={16} />
              <span>User Agent Parsing</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
              <Languages className="text-accent" size={16} />
              <span>Language Detection</span>
            </div>
          </div>
        </div>

        {/* API Testing Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ApiTester onTest={handleApiTest} isLoading={isLoading} />
          <ResponseDisplay 
            response={response} 
            error={error}
            isLoading={isLoading}
            responseTime={responseTime}
          />
        </div>

        {/* Documentation */}
        <DocumentationTabs />

        {/* Code Examples */}
        <CodeExamples />

        {/* Features Grid */}
        <FeaturesGrid />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-code text-white text-sm"></i>
              </div>
              <span className="text-slate-600">Header Parser API</span>
            </div>
            <div className="flex space-x-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-700" data-testid="link-documentation">Documentation</a>
              <a href="#" className="hover:text-slate-700" data-testid="link-privacy">Privacy Policy</a>
              <a href="#" className="hover:text-slate-700" data-testid="link-terms">Terms of Service</a>
              <a href="#" className="hover:text-slate-700" data-testid="link-support">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
