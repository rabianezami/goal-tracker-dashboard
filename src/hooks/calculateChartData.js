export default function calculateChartData(goals) {
    const today = new Date();

    if (!goals.length) return null;

    const earliestStart = new Date(
        Math.min(...goals.map(goal => new Date(goal.startDate)))
    );

    if (earliestStart > today) return "not-started";

    let allDates = [];
    let completedData = [];
    let uncompletedData = [];

    let current = new Date(earliestStart);

    while (current <= today) {
        allDates.push(new Date(current));
        completedData.push(0);
        uncompletedData.push(0);
        current.setDate(current.getDate() + 1);
    }

    goals.forEach((goal) => {
        const start = new Date(goal.startDate);

        allDates.forEach((date, index) => {
            if (date >= start && date <= today) {
                if (goal.progress >= goal.target) {
                    completedData[index] += 1;
                } else {
                    uncompletedData[index] += 1;
                }
            }
        });
    });

    const labels = allDates.map(date => date.getDate());

    return { labels, completedData, uncompletedData };
}