export class DateCalculator {
    public static RoundToNearestHalfHour(time: Date) {
        const minutes = time.getMinutes();
        const roundedMinutes = Math.round(minutes / 30) * 30;
        time.setMinutes(roundedMinutes);
        time.setSeconds(0);
        return time;
    };

    public static AddDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    public static MinusDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    }

    public static AddMonths(date: Date, months: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getMonth() + months);
        return newDate;
    };

    public static MinusMonths(date: Date, months: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getMonth() - months);
        return newDate;
    }
}