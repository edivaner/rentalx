

interface IDateProvider {

    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    compareInDays(start_date: Date, end_date: Date): number;
    dateNow(): Date;
}

export { IDateProvider }