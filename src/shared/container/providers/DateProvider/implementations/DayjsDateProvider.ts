import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);



class DayjsProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        return dayjs(end_date).diff(start_date, "hour");
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

}

export { DayjsProvider }