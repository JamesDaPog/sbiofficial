/**
 * A static map of a chapter's town: a 3x3 block of OpenStreetMap tiles centred
 * on the chapter's coordinates, desaturated and washed in SBI navy, with a pin.
 * No map library is loaded, so it costs nine small images per card.
 */

const ZOOM = 13
const TILE = 256

function tileCoords(lat, lng, zoom) {
  const n = 2 ** zoom
  const x = ((lng + 180) / 360) * n
  const rad = (lat * Math.PI) / 180
  const y = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n
  return { x, y }
}

export default function TownTile({ lat, lng, label, className = '' }) {
  const { x, y } = tileCoords(lat, lng, ZOOM)
  const tx = Math.floor(x)
  const ty = Math.floor(y)
  /* Pixel offset of the point inside the 3x3 block, whose top-left tile is (tx-1, ty-1). */
  const px = (x - (tx - 1)) * TILE
  const py = (y - (ty - 1)) * TILE

  const tiles = []
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      tiles.push({ key: `${dx}${dy}`, src: `https://tile.openstreetmap.org/${ZOOM}/${tx + dx}/${ty + dy}.png`, left: (dx + 1) * TILE, top: (dy + 1) * TILE })
    }
  }

  return (
    <div className={`relative overflow-hidden bg-navy-100 ${className}`} role="img" aria-label={`Map of ${label}`}>
      <div
        className="absolute left-1/2 top-1/2 h-[768px] w-[768px] grayscale-[85%] contrast-[0.95]"
        style={{ transform: `translate(${-px}px, ${-py}px)` }}
      >
        {tiles.map((tile) => (
          <img
            key={tile.key}
            src={tile.src}
            alt=""
            width={TILE}
            height={TILE}
            loading="lazy"
            decoding="async"
            className="absolute max-w-none"
            style={{ left: tile.left, top: tile.top }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-navy-700/35 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,31,58,0.35)_100%)]" />
      <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-gold-400/25" />
      <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gold-500 shadow-[0_0_0_4px_rgba(59,141,204,0.35)]" />
      <span className="absolute bottom-1 right-1.5 text-[9px] text-white/80">© OpenStreetMap</span>
    </div>
  )
}
