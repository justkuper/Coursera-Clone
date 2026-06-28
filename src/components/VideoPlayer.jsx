import { useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react'

export default function VideoPlayer({ url, onProgress, onEnded, title }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const playerRef = useRef(null)
  const wrapperRef = useRef(null)

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`
  }

  const handleProgress = (state) => {
    if (!seeking) { setPlayed(state.played); onProgress?.(state) }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) wrapperRef.current?.requestFullscreen()
    else document.exitFullscreen()
  }

  const videoUrl = url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

  return (
    <div ref={wrapperRef} className="relative bg-black rounded-xl overflow-hidden group">
      <div className="aspect-video">
        <ReactPlayer ref={playerRef} url={videoUrl} width="100%" height="100%"
          playing={playing} muted={muted} volume={volume}
          onProgress={handleProgress} onDuration={setDuration}
          onEnded={() => { setPlaying(false); onEnded?.() }}
          config={{ youtube: { playerVars: { modestbranding: 1, rel: 0 } } }}
        />
      </div>

      <div className="absolute inset-0 cursor-pointer" onClick={() => setPlaying(!playing)}>
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-600/90 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <input type="range" min={0} max={0.999999} step="any" value={played}
          onChange={(e) => { setPlayed(parseFloat(e.target.value)); setSeeking(true) }}
          onMouseUp={(e) => { setSeeking(false); playerRef.current?.seekTo(parseFloat(e.target.value)) }}
          className="w-full h-1 mb-3 cursor-pointer accent-blue-500"
        />
        <div className="flex items-center gap-3">
          <button onClick={() => setPlaying(!playing)} className="text-white hover:text-blue-400">
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={() => playerRef.current?.seekTo(Math.max(0, played - 10/duration))} className="text-white hover:text-blue-400">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={() => setMuted(!muted)} className="text-white hover:text-blue-400">
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
            onChange={(e) => { setVolume(parseFloat(e.target.value)); setMuted(false) }}
            className="w-16 h-1 accent-blue-500 cursor-pointer"
          />
          <span className="text-white text-xs font-mono ml-1">
            {fmt(played * duration)} / {fmt(duration)}
          </span>
          <div className="flex-1" />
          <button onClick={toggleFullscreen} className="text-white hover:text-blue-400">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
