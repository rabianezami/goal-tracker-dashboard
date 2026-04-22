export default function calculateChartData(goals) {
  const today = new Date();
  if (!goals.length) return null;

  const earliestStart = new Date(
    Math.min(...goals.map((goal) => new Date(goal.startDate)))
  );

  if (earliestStart > today) return "not-started";

  let allDates = [];
  let progressData = [];
  let current = new Date(earliestStart);

  // ساختن لیست روزها از تاریخ شروع تا امروز
  while (current <= today) {
    allDates.push(new Date(current));
    progressData.push(0);
    current.setDate(current.getDate() + 1);
  }

  // محاسبه پیشرفت واقعی برای تک تک روزها
  allDates.forEach((date, index) => {
    let totalProgressInDay = 0;
    let totalTargetInDay = 0;

    goals.forEach((goal) => {
      const start = new Date(goal.startDate);
      if (date >= start) {
        const target = Number(goal.target || 0);
        totalTargetInDay += target;

        // فیلتر کردن لاگ‌هایی که قبل یا در این تاریخ ثبت شده‌اند
        const logsBeforeOrOnThisDate = (goal.logs || []).filter((log) => {
          const logDate = new Date(log.date);
          return logDate <= date;
        });

        // محاسبه مقدار تجمعی پیشرفت تا این روز
        const accumulatedProgress = logsBeforeOrOnThisDate.reduce(
          (sum, log) => sum + Number(log.amount || 0),
          0
        );

        totalProgressInDay += accumulatedProgress;
      }
    });

    // تبدیل به فیصد برای ساخت فراز و فرود در چارت
    if (totalTargetInDay > 0) {
      const percentage = Math.round((totalProgressInDay / totalTargetInDay) * 100);
      progressData[index] = Math.min(100, percentage);
    }
  });

  const labels = allDates.map((date) => date.getDate());
  
  return { labels, progressData };
}
