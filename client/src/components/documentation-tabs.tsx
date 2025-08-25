import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DocumentationTabs() {
  const [activeTab, setActiveTab] = useState("api");

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`border-b-2 pb-2 px-1 text-sm font-medium ${
                activeTab === "api"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              onClick={() => setActiveTab("api")}
              data-testid="tab-api-reference"
            >
              API Reference
            </button>
            <button
              className={`border-b-2 pb-2 px-1 text-sm font-medium ${
                activeTab === "examples"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              onClick={() => setActiveTab("examples")}
              data-testid="tab-examples"
            >
              Examples
            </button>
            <button
              className={`border-b-2 pb-2 px-1 text-sm font-medium ${
                activeTab === "errors"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              onClick={() => setActiveTab("errors")}
              data-testid="tab-error-codes"
            >
              Error Codes
            </button>
          </nav>
        </div>

        {activeTab === "api" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-4">GET /api/whoami</h4>
              <p className="text-slate-600 mb-4">
                Returns parsed information about the requesting client including IP address, user agent details, and language preferences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-md font-medium text-slate-900 mb-3">Request Headers</h5>
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-lg p-3 border">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-sm text-slate-800">User-Agent</span>
                      <Badge variant="secondary" className="text-xs">optional</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Browser and device identification string</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-sm text-slate-800">Accept-Language</span>
                      <Badge variant="secondary" className="text-xs">optional</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Preferred languages for response</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-sm text-slate-800">X-Forwarded-For</span>
                      <Badge variant="secondary" className="text-xs">optional</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Original client IP (proxy support)</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-md font-medium text-slate-900 mb-3">Response Fields</h5>
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-lg p-3 border">
                    <span className="font-mono text-sm text-slate-800">ipaddress</span>
                    <p className="text-sm text-slate-600 mt-1">Client's IP address</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border">
                    <span className="font-mono text-sm text-slate-800">language</span>
                    <p className="text-sm text-slate-600 mt-1">Raw Accept-Language header</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border">
                    <span className="font-mono text-sm text-slate-800">software</span>
                    <p className="text-sm text-slate-600 mt-1">Raw User-Agent string</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border">
                    <span className="font-mono text-sm text-slate-800">parsed</span>
                    <p className="text-sm text-slate-600 mt-1">Structured parsing results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-slate-900">Usage Examples</h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-md font-medium text-slate-900 mb-2">Basic Request</h5>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
                    <code>{`curl -X GET 'https://your-domain.com/api/whoami' \\
  -H 'Accept: application/json'`}</code>
                  </pre>
                </div>
              </div>
              <div>
                <h5 className="text-md font-medium text-slate-900 mb-2">With Custom Headers</h5>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
                    <code>{`curl -X GET 'https://your-domain.com/api/whoami' \\
  -H 'Accept: application/json' \\
  -H 'User-Agent: MyApp/1.0' \\
  -H 'Accept-Language: es-ES,es;q=0.9,en;q=0.8'`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "errors" && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-slate-900">Error Codes</h4>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="destructive">500</Badge>
                  <span className="font-medium text-slate-900">Internal Server Error</span>
                </div>
                <p className="text-sm text-slate-600">Failed to parse request headers or process the request</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">404</Badge>
                  <span className="font-medium text-slate-900">Not Found</span>
                </div>
                <p className="text-sm text-slate-600">The requested endpoint does not exist</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">405</Badge>
                  <span className="font-medium text-slate-900">Method Not Allowed</span>
                </div>
                <p className="text-sm text-slate-600">Only GET requests are supported for this endpoint</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
