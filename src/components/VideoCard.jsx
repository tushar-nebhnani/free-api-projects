const AVATAR_COLORS = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"];

function formatDuration(iso) {
  if (!iso) return "";
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!match) return "";
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const pad = (n) => String(n).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}

function formatViews(count) {
  const n = Number(count);
  if (!n && n !== 0) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

function formatTimeAgo(dateString) {
  if (!dateString) return "";
  const published = new Date(dateString);
  if (Number.isNaN(published.getTime())) return "";

  const seconds = Math.floor((Date.now() - published.getTime()) / 1000);
  const units = [
    { label: "year", secs: 31536000 },
    { label: "month", secs: 2592000 },
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(seconds / unit.secs);
    if (value >= 1) return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

function VideoCard({ video }) {
  const item = video.items || video;
  const snippet = item.snippet || {};
  const statistics = item.statistics || {};
  const contentDetails = item.contentDetails || {};

  const videoId = item.id;
  const channelId = snippet.channelId;

  const title = snippet.title || video.title || "Untitled Video";
  const channelName = snippet.channelTitle || video.channelName || "Unknown Channel";
  const views = formatViews(statistics.viewCount) || "views unavailable";
  const timeAgo = formatTimeAgo(snippet.publishedAt) || video.timeAgo || "";
  const duration = formatDuration(contentDetails.duration);

  let thumbnail = "https://via.placeholder.com/640x360?text=No+Thumbnail";
  if (snippet.thumbnails) {
    thumbnail =
      snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || thumbnail;
  } else if (video.thumbnail) {
    thumbnail = video.thumbnail;
  }

  const initial = channelName.charAt(0).toUpperCase();
  const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

  const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
  const channelUrl = channelId ? `https://www.youtube.com/channel/${channelId}` : null;

  return (
    <div className="flex flex-col gap-3 group">
      <a
        href={videoUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 block"
        aria-disabled={!videoUrl}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {duration && (
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {duration}
          </span>
        )}
      </a>

      <div className="flex gap-3 pr-6">
        <a
          href={channelUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 rounded-full text-white flex items-center justify-center shrink-0 ${randomColor} text-sm font-bold`}
          aria-disabled={!channelUrl}
        >
          {initial}
        </a>

        <div className="flex flex-col overflow-hidden">
          <a
            href={videoUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-gray-900 line-clamp-2 leading-tight hover:text-blue-600 transition-colors"
          >
            {title}
          </a>
          <a
            href={channelUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 mt-1 hover:text-gray-900 transition-colors w-fit"
          >
            {channelName}
          </a>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>{views}</span>
            {timeAgo && (
              <>
                <span className="text-[10px]">•</span>
                <span>{timeAgo}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
