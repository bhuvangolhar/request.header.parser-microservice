import { Network, Search, Globe } from "lucide-react";

export function FeaturesGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Network className="text-blue-600" size={32} />
        </div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">IP Detection</h4>
        <p className="text-slate-600">
          Accurate IP address detection with support for proxy headers like X-Forwarded-For and X-Real-IP
        </p>
      </div>
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-green-600" size={32} />
        </div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">User Agent Parsing</h4>
        <p className="text-slate-600">
          Comprehensive parsing of User-Agent strings to identify browser, operating system, and device information
        </p>
      </div>
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="text-purple-600" size={32} />
        </div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">Language Detection</h4>
        <p className="text-slate-600">
          Parse Accept-Language headers to determine user's preferred languages with quality scores
        </p>
      </div>
    </div>
  );
}
