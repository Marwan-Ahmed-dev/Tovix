type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  separator?: string;
};

/**
 * Infinite horizontal ticker. Duplicated track + CSS translate = seamless loop.
 */
export function Marquee({
  items,
  className = "",
  reverse = false,
  separator = "◆",
}: MarqueeProps) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex shrink-0 items-center">
          <span className="hud-sm whitespace-nowrap px-6 text-[var(--muted)] md:px-9">
            {item}
          </span>
          <span className="text-[10px] text-[var(--red)]">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="marquee-track"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row}
        {row}
      </div>
    </div>
  );
}

export default Marquee;
