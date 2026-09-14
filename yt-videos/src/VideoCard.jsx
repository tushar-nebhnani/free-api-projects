const AVATAR_COLORS = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"];

function VideoCard({ video }) {
  const title = video.items?.snippet?.title || video.snippet?.title || video.title || "Untitled Video";
  const channelName =
    video.items?.snippet?.channelTitle || video.snippet?.channelTitle || video.channelName || "Unknown Channel";
  const views = video.views ? `${(video.views / 1000).toFixed(1)}K views` : "12K views";
  const timeAgo = video.timeAgo || "2 days ago";

  let thumbnail = "https://via.placeholder.com/640x360?text=No+Thumbnail";
  if (video.snippet?.thumbnails) {
    thumbnail =
      video.snippet.thumbnails.maxres?.url ||
      video.snippet.thumbnails.high?.url ||
      video.snippet.thumbnails.medium?.url;
  } else if (video.thumbnail) {
    thumbnail = video.thumbnail;
  }

  const initial = channelName.charAt(0).toUpperCase();
  const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">10:24</span>
      </div>

      <div className="flex gap-3 pr-6">
        <div className={`w-9 h-9 rounded-full text-white flex items-center justify-center shrink-0 ${randomColor} text-sm font-bold`}>
          {initial}
        </div>

        <div className="flex flex-col overflow-hidden">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 hover:text-gray-900 transition-colors">{channelName}</p>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>{views}</span>
            <span className="text-[10px]">•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
