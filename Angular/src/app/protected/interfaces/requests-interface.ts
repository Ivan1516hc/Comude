export interface Response{
    message:string;
    code:number;
}

export interface Requests {
    current_page:   number;
    data:           RequestsResponse[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface RequestsResponse {
    id:            number;
    user_id:       number;
    procedure_id:  number;
    invoice?:      string;
    priority_id:   number;
    status:        number;
    created_at:    Date;
    updated_at:    Date;
    deleted_at:    null;
    priorities:     Priority;
    beneficiaries: Beneficiary[];
}

export interface Priority {
    name:   string;
}

export interface Beneficiary {
    id:               number;
    curp:             string;
    nombre:           string;
    apaterno:         string;
    amaterno:         string;
    escolaridad:      number;
    fechanacimiento:  Date;
    calle:            string;
    numext:           number;
    numint:           number | null;
    primercruce:      string;
    segundocruce:     string | null;
    vivienda:         number;
    municipio:        string;
    codigopostal:     number;
    colonia:          string;
    lenguamaterna:    number;
    serviciosmedicos: number;
    sexo:             number;
    celular:          string;
    edad:             number;
    hermanos_en_CDI:  number | null;
    edades_hermanos:  number | null;
    nombres_hermanos: number | null;
    tipo_sangre:      string;
    enfermedad:       string;
    enfermedad_otro:  string | null;
    idcapturista:     number | null;
    status:           number;
    created_at:       Date;
    updated_at:       Date;
    pivot:            Pivot;
}

export interface Pivot {
    request_id:     number;
    beneficiary_id: number;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}