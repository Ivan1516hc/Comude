export interface RequestsResponse {
    message: string;
    code: number;
    data: DataRequest;
    readRegulations: boolean;
    hasImportantArchievements: boolean;
}

export interface DataRequest {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface Datum {
    id: number;
    invoice: string | null;
    finished: Date | null;
    discipline_id: number;
    announcement_id: number;
    status_request_id: number;
    competition_id: number | null;
    bank_account_id: number | null;
    aplicant_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    competition: Competition | null;
    bank_account: BankAccount | null;
    status_request: Announcement;
    announcement: Announcement;
    discipline: Announcement;
    documents_count: number;
    modify_forms : DataModifyForms[] | null;
}

export interface BankAccount {
    account: string;
    key_account: string;
    titular_persona_name: string;
    bank: string;
    account_status_url: string;
}

export interface Announcement {
    id: number;
    name: string;
}

export interface Competition {
    id: number;
    name: string;
    countries_state_id: number | null;
    country_id: number;
    start_date: Date;
    ending_date: Date;
    classify: string | null;
    justification: string;
    requested_budget: number;
    approved_budget: number | null;
    competition_type_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    competition_type: Announcement;
    state: Announcement | null;
    country: Country | null;
}

export interface Country {
    id: number;
    common_spa: string;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface DataModifyForms {
    id: number;
    request_id: number;
    form_id: number;
    history_message_id: number;
    status: number;
    form: Forms | null;
    document_modify: DocumentModify[] | null;
    created_at: Date;
    updated_at: Date | null;
}

export interface Forms{
    id : number;
    name: string;
}

export interface DocumentModify{
    id: number;
    modify_form_id: number;
    document_id: number;
    created_at: Date;
    updated_at: Date | null;
    document_procedure: Forms[];
}