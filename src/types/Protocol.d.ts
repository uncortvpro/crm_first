declare interface Protocol {
    _id: {
        $oid: string;
    };
    auction_date: {
        $date: string;
    };
    id: string;
    confirm_date: string;
    dateModified: string;
    id_tender: string;
    title: string;
    value_amount: string;
    procuringEntity_id: string;
    procuringEntity_name: string;
    tenderID: string;
    tenderPeriod_endDate: string;
    dgfID: string;
    guarantee_amount: string;
    status: "" | "Прийняття заяв на участь" | "Очікується опублікування протоколу" | "Очікується підписання договору" | "Аукціон не відбувся" | "Очікується оплата" | "Аукціон завершено" | "Аукціон відмінено" | "Аукціон";
    StateText: string;
    id_member: string;
    code: string;
    short_name: string;
    promo_code: string;
    Short_mannager_name: string;
    statusTender: string;
    who_fixed: string;
    date_fixed: string;
    newstatus: string;
    newprotokol: any;
    link_prozorro: string;
    link_gc: string;
    protocol_enddate: string;
    contract_enddate: string;
    comment: string;
    stream: string;
    price: number;
    description: string;
    sign_enddate: {
        $date: string;
    };
}
