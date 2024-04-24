import moment from "moment";

export const datetime = (value : any) => {
    return moment(value).format('YYYY-MM-DD');
}