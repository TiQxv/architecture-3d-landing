import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import content from './content.js';
import { initializeDemo } from './demo.js';
import './style.css';
function App(){
  useEffect(() => { initializeDemo(); }, []);
  return <div dangerouslySetInnerHTML={{__html:content}} />;
}
createRoot(document.getElementById('root')).render(<App />);
