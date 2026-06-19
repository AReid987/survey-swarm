import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, ArrowLeft, ArrowRight, Maximize2, Minimize2, Camera, Eye, EyeOff, ExternalLink, Globe } from 'lucide-react';
import { BrowserViewerProps } from '@/types';
import StatusIndicator from './StatusIndicator';
import { Card } from './Container';
import '../styles/cyberpunk-styles.css';

const BrowserViewer: React.FC<BrowserViewerProps> = ({
  session,
  onControl,
  fullscreen = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [isStreaming, setIsStreaming] = useState(session?.isStreaming || false);
  const [urlInput, setUrlInput] = useState(session?.url || '');
  const [showControls, setShowControls] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (session) {
      setIsStreaming(session.isStreaming);
      setUrlInput(session.url);
    }
  }, [session]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControlsTimeout.current = setTimeout(() => {
        if (isFullscreen) {
          setShowControls(false);
        }
      }, 3000);
    };

    const element = viewerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        if (hideControlsTimeout.current) {
          clearTimeout(hideControlsTimeout.current);
        }
      };
    }
  }, [isFullscreen]);

  const handleControl = (action: string) => {
    onControl?.(action as any);
  };

  const handleNavigate = () => {
    if (urlInput && urlInput !== session?.url) {
      onControl?.({ type: 'navigate', url: urlInput } as any);
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleToggleStream = () => {
    const newStreamingState = !isStreaming;
    setIsStreaming(newStreamingState);
    handleControl('toggle_stream');
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  if (!session) {
    return (
      <Card className="browser-viewer h-96 flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No browser session selected</p>
          <p className="text-sm text-gray-500 mt-2">
            Select an agent to view its browser session
          </p>
        </div>
      </Card>
    );
  }

  const controlsOpacity = isFullscreen && !showControls ? 'opacity-0' : 'opacity-100';
  const viewerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-dark-primary'
    : 'browser-viewer h-96';

  return (
    <div ref={viewerRef} className={viewerClasses}>
      {/* Browser Header */}
      <div className={`
        browser-header transition-opacity duration-300
        ${controlsOpacity}
      `}>
        <div className="flex items-center justify-between">
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleControl('back')}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleControl('forward')}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Go Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleControl('refresh')}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* URL Input */}
            <div className="flex items-center gap-2 ml-4">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                className="input-dark text-sm min-w-0 flex-1"
                placeholder="Enter URL..."
              />
              <button
                onClick={handleNavigate}
                className="btn-primary text-sm px-3 py-1"
              >
                Go
              </button>
            </div>
          </div>

          {/* Status and Controls */}
          <div className="flex items-center gap-3">
            <StatusIndicator
              status={isStreaming ? 'active' : 'idle'}
              size="sm"
              showLabel
            />
            <button
              onClick={handleToggleStream}
              className={`p-2 rounded-lg transition-colors ${
                isStreaming
                  ? 'text-neon-blue hover:bg-neon-blue/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              title={isStreaming ? 'Stop Streaming' : 'Start Streaming'}
            >
              {isStreaming ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleControl('screenshot')}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Take Screenshot"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleFullscreen}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Session Info */}
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Session ID: {session.id}
            </span>
            {session.platform && (
              <span className="px-2 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue">
                {session.platform}
              </span>
            )}
          </div>
          <div className="text-gray-500">
            Last updated: {formatTimestamp(session.lastUpdated)}
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="browser-content">
        {session.screenshot ? (
          <div className="relative w-full h-full">
            <img
              src={session.screenshot}
              alt="Browser screenshot"
              className="w-full h-full object-contain bg-black"
            />
            {isStreaming && (
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-400 font-medium">LIVE</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              {isStreaming ? (
                <>
                  <div className="loading-spinner w-8 h-8 mx-auto mb-4" />
                  <p className="text-gray-400">Connecting to browser session...</p>
                </>
              ) : (
                <>
                  <EyeOff className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Streaming is paused</p>
                  <button
                    onClick={handleToggleStream}
                    className="btn-primary mt-4"
                  >
                    Start Streaming
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Survey Progress Bar */}
      {session.surveyProgress && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="glass-morphism-heavy rounded-lg p-3 border border-gray-700">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white font-medium">Survey Progress</span>
              <span className="text-neon-blue">
                Step {session.surveyProgress.currentStep} of {session.surveyProgress.totalSteps}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-neon-blue h-2 rounded-full transition-all duration-500"
                style={{ width: `${session.surveyProgress.completionPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{session.surveyProgress.completionPercentage.toFixed(0)}% complete</span>
              <span>~{Math.ceil(session.surveyProgress.estimatedTimeRemaining / 60)} min remaining</span>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Exit Hint */}
      {isFullscreen && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="glass-morphism-heavy rounded-full px-4 py-2 border border-gray-700">
            <p className="text-xs text-gray-400">
              Press ESC or click the minimize button to exit fullscreen
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowserViewer;