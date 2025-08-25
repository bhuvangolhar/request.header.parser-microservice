import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CodeExamples() {
  const { toast } = useToast();

  const copyCode = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: `${language} code copied to clipboard`,
    });
  };

  const jsCode = `fetch('${window.location.origin}/api/whoami')
  .then(response => response.json())
  .then(data => {
    console.log('IP:', data.ipaddress);
    console.log('Browser:', data.parsed.browser.name);
    console.log('OS:', data.parsed.os.name);
  })
  .catch(error => console.error('Error:', error));`;

  const curlCode = `curl -X GET \\
  '${window.location.origin}/api/whoami' \\
  -H 'Accept: application/json' \\
  -H 'User-Agent: MyApp/1.0'`;

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <i className="fab fa-js-square text-yellow-500"></i>
              <span>JavaScript / Fetch</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyCode(jsCode, "JavaScript")}
              data-testid="button-copy-js"
            >
              <Copy size={16} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{jsCode}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <i className="fas fa-terminal text-green-500"></i>
              <span>cURL</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyCode(curlCode, "cURL")}
              data-testid="button-copy-curl"
            >
              <Copy size={16} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{curlCode}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
