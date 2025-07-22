import Image from "next/image";

export function LeaderboardCard() {
  const leaderboardData = [
    {
      rank: 1,
      name: "Cimong",
      points: 400,
      avatar: "/images/cimong.png",
    },
    {
      rank: 2,
      name: "Cimong",
      points: 400,
      avatar: "/images/cimong.png",
    },
    {
      rank: 3,
      name: "Cimong",
      points: 400,
      avatar: "/images/cimong.png",
    },
  ];

  return (
    <div className="relative bg-dashboardBlue rounded-3xl text-dashboardTextPrimary shadow-card overflow-hidden mx-4">
      <div className="absolute top-16 left-0 w-full h-full bg-dashboardHeaderBg rounded-t-3xl z-0"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 ">
        <Image
          src="/images/medal.png"
          alt="Leader Icon"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>

      <div className="relative z-10 space-y-2 px-6 pb-6 pt-20">
        {leaderboardData.map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between rounded-lg py-3 px-4 bg-white/10"
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-xl font-bold ${
                  item.rank === 1
                    ? "text-[#FFB02E]"
                    : item.rank === 2
                    ? "text-[#A5A5A5]"
                    : item.rank === 3
                    ? "text-[#6D4534]"
                    : "text-gray-700"
                }`}
              >
                {item.rank}
              </span>

              <Image
                src={item.avatar || "/placeholder.svg"}
                alt={item.name}
                width={45}
                height={45}
                className="rounded-full"
              />

              <span
                className={`text-xl font-semibold ${
                  item.rank === 1
                    ? "text-[#FFB02E]"
                    : item.rank === 2
                    ? "text-[#A5A5A5]"
                    : item.rank === 3
                    ? "text-[#6D4534]"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </span>
            </div>

            <span
              className={`text-xl font-bold ${
                item.rank === 1
                  ? "text-[#FFB02E]"
                  : item.rank === 2
                  ? "text-[#A5A5A5]"
                  : item.rank === 3
                  ? "text-[#6D4534]"
                  : "text-white"
              }`}
            >
              {item.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
