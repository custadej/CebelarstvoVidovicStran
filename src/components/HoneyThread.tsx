export function HoneyThread() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
      <div className="wrap h-full">
        <div className="thread" data-thread="">
          <svg viewBox="0 0 20 1000" preserveAspectRatio="none">
            <path
              data-thread-path=""
              d="M10 0 C10 40 4 70 7 120 S15 200 12 270 S3 380 8 450 S16 560 11 640 S4 760 9 830 S14 940 10 1000"
              fill="none"
              stroke="#d4861b"
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M10 0 C10 40 4 70 7 120 S15 200 12 270 S3 380 8 450 S16 560 11 640 S4 760 9 830 S14 940 10 1000"
              fill="none"
              stroke="#f6d27a"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              transform="translate(-0.9 0)"
            />
          </svg>
          <span className="thread-drop" data-thread-drop="" />
        </div>
      </div>
    </div>
  );
}
