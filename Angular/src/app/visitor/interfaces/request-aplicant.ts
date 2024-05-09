export interface RequestsResponse {
    message: string;
    code: number;
    data: DataRequest;
    hasBankAccount: boolean;
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
    aplicant_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    competition: Competition | null;
    status_request: Announcement;
    announcement: Announcement;
    discipline: Announcement;
    documents_count: number;
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