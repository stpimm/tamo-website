import Backdrop from '../decor/Backdrop'
import GridOverlay from '../decor/GridOverlay'

/**
 * Full-viewport snap section.
 * This version vertically centers ALL foreground content.
 */
export default function Section({ id, withGrid = false, colors, children }) {
  return (
    <section id={id} className="relative snap-start min-h-screen overflow-x-clip">
      {/* Background (one or the other) */}
      {!withGrid && <Backdrop className="fade-vertical opacity-80" colors={colors} />}
      {withGrid && <GridOverlay className="fade-vertical grid-fade" />}

      {/* Center content vertically (and keep stacking above bg) */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  )
}
