// components/JsonViewer.tsx
import { Button } from '@heroui/button';
import { Typography } from '../Typography';
import cn from '../../utils/cn';

interface JsonViewerProps {
  data: unknown;
  title?: string;
  collapsed?: boolean;
  showLineNumbers?: boolean;
  className?: string;
  onCopy?: () => void;
}

export const JsonViewer = ({
  data,
  title='1',
  showLineNumbers = true,
  className,
  onCopy
}: JsonViewerProps) => {

  const handleCopy = async () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      onCopy?.();
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formattedJson = JSON.stringify(data, null, 2);

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-gray-50", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
          <Typography type="body-s" className="font-medium text-gray-700">
            {title}
          </Typography>
          <div className="flex items-center gap-2">
             <Button
              size="sm"
              variant="light"
              onPress={handleCopy}
              className="min-w-8 h-8"
            >
              copyBt
            </Button>
          </div>
        </div>
      )}
      
       <pre className={cn(
          "p-4 text-sm font-mono overflow-auto max-h-96",
          showLineNumbers && "pl-12 relative"
        )}>
          {showLineNumbers ? (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-200/50 flex flex-col items-end pr-2 py-4 text-gray-500 text-xs select-none">
              {formattedJson.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          ) : null}
          <code className="text-gray-800 whitespace-pre-wrap break-words">
            {formattedJson}
          </code>
        </pre>
    </div>
  );
};