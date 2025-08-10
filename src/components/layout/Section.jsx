import Backdrop from '../decor/Backdrop'
import GridOverlay from '../decor/GridOverlay'

/**
 * Full-viewport section with optional Backdrop (orbs) or Grid overlay.
 * - Keeps your original background behavior (so orbs render).
 * - Disables scroll-snap on mobile, enables on md+.
 * - Uses 100svh to avoid mobile browser UI jumping.
 */
export default function Section({ id, withGrid = false, colors, children }) {
  return (
    <section
      id={id}
      className="relative md:snap-start min-h-[100svh] overflow-x-clip"
    >
      {/* Background (one or the other) */}
      {!withGrid && <Backdrop className="fade-vertical opacity-80" colors={colors} />}
      {withGrid && <GridOverlay className="fade-vertical grid-fade" />}

      {/* Center content vertically (stack above bg) */}
      <div className="relative z-10 flex min-h-[100svh] items-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  )
}
