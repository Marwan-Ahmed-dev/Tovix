/**
 * First-visit ignition veil. Visibility and timing are driven by the inline
 * boot script in the root layout (`html[data-boot="1"]`), so the sequence
 * starts before first paint and never flashes.
 */
export function Preloader() {
  return (
    <div className="boot-veil" aria-hidden>
      <span className="veil-charge" />
      <p className="veil-label">Tovix // Igniting</p>
      <span className="veil-pane veil-pane-l" />
      <span className="veil-pane veil-pane-r" />
    </div>
  );
}

export default Preloader;
