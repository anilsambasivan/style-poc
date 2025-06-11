import React from 'react';
import { useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-lg px-6">
        <div className="bg-muted/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you were looking for: 
          <span className="font-mono bg-muted px-2 py-0.5 rounded text-sm ml-1">
            {location.pathname}
          </span>
        </p>
        <Button asChild>
          <a href="/">Return to Templates</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
