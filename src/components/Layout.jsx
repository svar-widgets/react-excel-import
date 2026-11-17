import { useEffect, useRef } from 'react';
import { useWizardContext } from '../context.jsx';
import ImportHeader from './ImportHeader.jsx';
import StageUpload from './stages/StageUpload.jsx';
import StageProcessing from './stages/StageProcessing.jsx';
import StageMapping from './stages/StageMapping.jsx';
import StageComplete from './stages/StageComplete.jsx';
import { popupContainer } from '@svar-ui/react-core';

import './Layout.css';

function Layout() {
  const ctx = useWizardContext();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = popupContainer(containerRef.current);
    return () => cleanup?.destroy?.() ?? cleanup?.();
  }, []);

  return (
    <div ref={containerRef} className="wx-excel-import wx-aabR0Ado">
      <ImportHeader />

      <div className="wx-content wx-aabR0Ado">
        {ctx.stage === 'upload' ? (
          <StageUpload />
        ) : ctx.stage === 'processing' ? (
          <StageProcessing />
        ) : ctx.stage === 'mapping' ? (
          <StageMapping />
        ) : ctx.stage === 'complete' ? (
          <StageComplete />
        ) : null}
      </div>
    </div>
  );
}

export default Layout;
