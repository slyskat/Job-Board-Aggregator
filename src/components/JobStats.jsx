import { TrendingUp, MapPin, DollarSign, Clock } from "lucide-react";

function JobStats({ jobs }) {
  // console.log(jobs);
  const totalJobs = jobs.length;
  console.log(totalJobs);
  const remoteJobs = jobs.filter((job) => job.isRemote).length;
  console.log(remoteJobs);

  const remotePercentage =
    totalJobs > 0 ? Math.round((remoteJobs / totalJobs) * 100) : 0;
  console.log(remotePercentage);

  const avgSalary =
    jobs.reduce((acc, job) => {
      return acc + (job.minSalary + job.maxSalary) / 2;
    }, 0) /
    jobs.filter((job) => {
      return (
        typeof job.minSalary === "number" && typeof job.maxSalary === "number"
      );
    }).length;

  const recentJobs = jobs.filter((job) => {
    const posted = new Date(job.datePosted);
    const now = new Date();
    const timeDifference = Math.abs(now.getTime() - posted.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference <= 7;
  }).length;

  const stats = [
    {
      icon: TrendingUp,
      label: "Total Jobs",
      value: totalJobs.toLocaleString(),
      subtitle: "Available positions",
    },
    {
      icon: MapPin,
      label: "Remote Jobs",
      value: `${remotePercentage}%`,
      subtitle: `${remoteJobs} remote positions`,
    },
    {
      icon: DollarSign,
      label: "Avg. Salary",
      value: isNaN(avgSalary)
        ? "N/A"
        : `$${Math.round(avgSalary).toLocaleString()}`,
      subtitle: "Full-time positions",
    },
    {
      icon: Clock,
      label: "This Week",
      value: recentJobs.toString(),
      subtitle: "New postings",
    },
  ];

  return (
    <div>
      {stats.map((stat) => {
        return (
          <div key={stat.label}>
            <div>
              <div>
                <stat.icon></stat.icon>
              </div>
              <div>
                <p>{stat.label}</p>
                <p>{stat.value}</p>
                <p>{stat.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobStats;
