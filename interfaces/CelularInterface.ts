import { DefaultInterfaceResponse } from "./DefaultInterface";

export interface CelularDAO{
    id: number;
    marca: string;
    modelo: string;
    activo: number;
    created_at: Date;
    updated_at: Date;
}

export interface CelularServiceDetail extends DefaultInterfaceResponse<CelularDAO> {}
export interface CelularServiceList extends DefaultInterfaceResponse<CelularDAO[]> {}

export interface CelularDTO {
    marca: string;
    modelo: string;
}