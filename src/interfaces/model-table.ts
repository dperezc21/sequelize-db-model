import {ModelCtor} from "sequelize";

export interface ModelTable {
    getModel(): ModelCtor<any>;
    createTableModel(): Promise<string>;
    modelName: string;
}