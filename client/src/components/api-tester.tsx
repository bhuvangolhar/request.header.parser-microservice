import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Trash2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomHeader {
  name: string;
  value: string;
}

interface ApiTesterProps {
  onTest: (customHeaders?: Record<string, string>) => void;
  isLoading: boolean;
}

export function ApiTester({ onTest, isLoading }: ApiTesterProps) {
  const [customHeaders, setCustomHeaders] = useState<CustomHeader[]>([]);
  const { toast } = useToast();

  const addHeader = () => {
    setCustomHeaders([...customHeaders, { name: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setCustomHeaders(customHeaders.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: keyof CustomHeader, value: string) => {
    const updated = [...customHeaders];
    updated[index][field] = value;
    setCustomHeaders(updated);
  };

  const copyUrl = () => {
    const url = `${window.location.origin}/api/whoami`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "API endpoint URL copied to clipboard",
    });
  };

  const handleTest = () => {
    const headers: Record<string, string> = {};
    customHeaders.forEach(header => {
      if (header.name && header.value) {
        headers[header.name] = header.value;
      }
    });
    onTest(headers);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Test API</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">GET</Badge>
            <span className="text-sm text-slate-500">/api/whoami</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="api-url" className="block text-sm font-medium text-slate-700 mb-2">
            Request URL
          </Label>
          <div className="relative">
            <Input
              id="api-url"
              value={`${window.location.origin}/api/whoami`}
              readOnly
              className="bg-slate-50"
              data-testid="input-api-url"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={copyUrl}
              data-testid="button-copy-url"
            >
              <Copy size={12} />
            </Button>
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-slate-700 mb-2">
            Custom Headers (Optional)
          </Label>
          <div className="space-y-2">
            {customHeaders.map((header, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder="Header Name"
                  value={header.name}
                  onChange={(e) => updateHeader(index, "name", e.target.value)}
                  className="flex-1"
                  data-testid={`input-header-name-${index}`}
                />
                <Input
                  placeholder="Header Value"
                  value={header.value}
                  onChange={(e) => updateHeader(index, "value", e.target.value)}
                  className="flex-1"
                  data-testid={`input-header-value-${index}`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 text-slate-400 hover:text-red-500"
                  onClick={() => removeHeader(index)}
                  data-testid={`button-remove-header-${index}`}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-blue-700 p-0 h-auto"
              onClick={addHeader}
              data-testid="button-add-header"
            >
              <Plus size={16} className="mr-1" />
              Add Header
            </Button>
          </div>
        </div>

        <Button
          onClick={handleTest}
          disabled={isLoading}
          className="w-full"
          data-testid="button-send-request"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Play size={16} className="mr-2" />
              Send Request
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
