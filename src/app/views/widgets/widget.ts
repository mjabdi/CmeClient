import { WeekDay } from "../createwidget/weekday";

export class Widget  
{
    id : string;
    email : string;
    widgetName : string;
    connectedTo : string;
    status : string;
    talkToUsText : string;
    colorWidget : string;
    colorText : string;
    isAnimated : boolean;
    callsCount : number;
    domainUrl : string;

    statusChanging : boolean;
    isDeleting : boolean;
    weekDays : WeekDay[];

    authKey : string;
    extension : string;

    notificationEmail : string;
}