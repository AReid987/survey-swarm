import * as React from "react"
import { Monitor, Pause, Play, Square, RefreshCw, Maximize2, Minimize2, Camera, Download, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { StatusIndicator } from "./status-indicator"
import { cn } from "@/lib/utils"

interface BrowserSession {
  id: string
  url: string
  title: string
  status: 'active' | 'paused' | 'loading' | 'error'
  screenshot?: string
  agentName: string
  platform?: string
  lastActivity: Date
}

interface BrowserViewerProps {
  session: BrowserSession | null
  onControl?: (action: string, params?: any) => void
  fullscreen?: boolean
  showControls?: boolean
  className?: string
}

const BrowserViewer = React.forwardRef<HTMLDivElement, BrowserViewerProps>(
  ({ session, onControl, fullscreen = false, showControls = true, className, ...props }, ref) => {
    const [isFullscreen, setIsFullscreen] = React.useState(fullscreen)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleControl = (action: string, params?: any) => {
      setIsLoading(true)
      onControl?.(action, params)
      setTimeout(() => setIsLoading(false), 1000)
    }

    const toggleFullscreen = () => {
      setIsFullscreen(!isFullscreen)
      handleControl('toggleFullscreen')
    }

    if (!session) {
      return (
        <Card ref={ref} className={cn("h-full min-h-[400px]", className)} {...props}>
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Monitor className="w-16 h-16 text-gray-500 mx-auto" />
              <div>
                <p className="text-gray-400">No active browser session</p>
                <p className="text-sm text-gray-500 mt-1">Select an agent to view its browser session</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card ref={ref} className={cn("h-full flex flex-col", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg border",
                session.status === 'active' ? "border-neon-green/30 bg-neon-green/10" :
                session.status === 'paused' ? "border-neon-yellow/30 bg-neon-yellow/10" :
                session.status === 'loading' ? "border-neon-blue/30 bg-neon-blue/10" :
                "border-red-600/30 bg-red-600/10"
              )}>
                <Monitor className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-white truncate">
                  {session.title || 'Untitled Page'}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <StatusIndicator status={session.status === 'active' ? 'online' : session.status === 'paused' ? 'idle' : 'connecting'} size="sm" />
                  <Badge variant="outline" size="sm" className="text-xs">
                    {session.agentName}
                  </Badge>
                  {session.platform && (
                    <Badge variant="secondary" size="sm" className="text-xs">
                      {session.platform}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {showControls && (
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleControl('refresh')}
                  disabled={isLoading}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleControl('screenshot')}
                  className="h-8 w-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="h-8 w-8 p-0"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 relative">
          {/* Browser toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700/50 bg-dark-800/50">
            <div className="flex items-center gap-2 flex-1">
              <Button
                size="sm"
                variant={session.status === 'active' ? 'default' : 'ghost'}
                onClick={() => handleControl('play')}
                disabled={session.status === 'active'}
                className="h-7 px-2"
              >
                <Play className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant={session.status === 'paused' ? 'warning' : 'ghost'}
                onClick={() => handleControl('pause')}
                disabled={session.status !== 'active'}
                className="h-7 px-2"
              >
                <Pause className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleControl('stop')}
                className="h-7 px-2"
              >
                <Square className="w-3 h-3" />
              </Button>
            </div>

            {/* URL bar */}
            <div className="flex-1 max-w-md">
              <div className="bg-dark-700/50 border border-gray-700/50 rounded px-3 py-1 text-xs text-gray-400 truncate">
                {session.url}
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleControl('download')}
              className="h-7 px-2"
            >
              <Download className="w-3 h-3" />
            </Button>
          </div>

          {/* Browser content area */}
          <div className="flex-1 relative bg-dark-900">
            {session.screenshot ? (
              <div className="w-full h-full relative">
                <img
                  src={session.screenshot}
                  alt="Browser screenshot"
                  className="w-full h-full object-contain"
                />
                {session.status === 'loading' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="loading-spinner w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Loading...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Monitor className="w-16 h-16 text-gray-500 mx-auto" />
                  <div>
                    <p className="text-gray-400">Live browser view</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {session.status === 'active' ? 'Session is active' :
                       session.status === 'paused' ? 'Session is paused' :
                       session.status === 'loading' ? 'Loading page...' : 'Session error'}
                    </p>
                  </div>
                  {session.status === 'paused' && (
                    <Button size="sm" onClick={() => handleControl('resume')}>
                      Resume Session
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Cyberpunk scan line effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50 animate-scan" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
BrowserViewer.displayName = "BrowserViewer"

export { BrowserViewer }