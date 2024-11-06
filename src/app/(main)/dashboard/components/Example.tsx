import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Copy } from "lucide-react";
import ReusableDialog from '@/components/shared/ReUsableDialog/ReusableDialog';

const ExampleComponent = () => {
  const [link] = useState("https://ui.shadcn.com/docs/installation");

  return (
    <div>
      <ReusableDialog
        trigger={<Button variant="outline">Share</Button>}
        title="Share Link"
        footerButtons={[
          <Button key="close" className='bg-red-500' variant="secondary">Close</Button>
        ]}
      >
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label htmlFor="link" className="sr-only">Link</label>
            <input id="link" type="text" value={link} readOnly className="input-class" />
          </div>
          <Button type="button" size="sm" className="px-3">
            <Copy />
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </ReusableDialog>
    </div>
  );
};

export default ExampleComponent;
