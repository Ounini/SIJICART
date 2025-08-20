const RollingBanner = ({ ads, timeLeft }) => {
  return (
    <div className="marquee-wrapper d-block d-lg-none">
      <div className="marquee-content text-center position-relative">
        <div className="position-relative">
          <img src={ads} alt="Ads" />
        </div>

        {timeLeft && (
          <div className="position-absolute countDown">
            <span>{timeLeft.days}d </span> <span>{timeLeft.hours}h</span>{" "}
            <span>{timeLeft.minutes}m</span> <span>{timeLeft.seconds}s</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RollingBanner;
