export class MySubscription
{
    subscriptionID : string;
    createdDateTime : Date;
    currentPeriodStartDate : Date;
    currentPeriodEndDate : Date;
    trialingUntilDate : Date;
    customerEmail : string;
    plan : string; // Sole Trader, Small Business , Large Business
    status : string; // Active, Out of Call , Canceled, Expired , ...


    back_button : boolean;
}