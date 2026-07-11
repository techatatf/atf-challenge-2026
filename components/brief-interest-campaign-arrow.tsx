type BriefInterestCampaignArrowProps = {
  className?: string;
};

export function BriefInterestCampaignArrow({
  className,
}: BriefInterestCampaignArrowProps) {
  return (
    <svg
      data-campaign-arrow="true"
      aria-hidden="true"
      viewBox="0 0 320 420"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <path
        d="M 24 100 H 274 L 78 296 H 274"
        fill="none"
        stroke="currentColor"
        strokeWidth="54"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
