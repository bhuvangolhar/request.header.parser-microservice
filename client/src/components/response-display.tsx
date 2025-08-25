import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { HeaderParseResponse } from "@shared/schema";

interface ResponseDisplayProps {
  response: HeaderParseResponse | null;
  error: string | null;
  isLoading: boolean;
  responseTime: number | null;
}

export function ResponseDisplay({ response, error, isLoading, responseTime }: ResponseDisplayProps) {
  const { toast } = useToast();

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      toast({
        title: "Response Copied",
        description: "JSON response copied to clipboard",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Response</CardTitle>
          <div className="flex items-center space-x-2">
            {error ? (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-600">Error</span>
              </>
            ) : response ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">200 OK</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                <span className="text-sm text-slate-600">Ready</span>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-slate-600">Processing request...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="text-red-500" size={16} />
              <span className="text-sm font-medium text-red-700">Error Response</span>
            </div>
            <pre className="text-sm text-red-800 whitespace-pre-wrap" data-testid="error-message">
              {error}
            </pre>
          </div>
        ) : response ? (
          <div className="bg-slate-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">JSON Response</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={copyResponse}
                data-testid="button-copy-response"
              >
                <Copy size={12} />
              </Button>
            </div>
            <pre className="text-sm text-slate-800 overflow-x-auto" data-testid="json-response">
              <code>{JSON.stringify(response, null, 2)}</code>
            </pre>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-lg p-8 border border-dashed border-slate-300 text-center">
            <p className="text-slate-500">Click "Send Request" to see the response</p>
          </div>
        )}

        {(response || error) && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                Response Time
              </div>
              <div className="text-lg font-semibold text-blue-900" data-testid="response-time">
                {responseTime ? `${responseTime}ms` : 'N/A'}
              </div>
            </div>
            <div className={`rounded-lg p-3 border ${error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${error ? 'text-red-600' : 'text-green-600'}`}>
                Status
              </div>
              <div className={`text-lg font-semibold ${error ? 'text-red-900' : 'text-green-900'}`} data-testid="response-status">
                {error ? 'Error' : 'Success'}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
