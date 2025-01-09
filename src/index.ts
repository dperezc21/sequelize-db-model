import {ModelTable} from "./interfaces/model-table";
import {ModelAttributes, ModelOptions} from "sequelize";
import {ModelSequelize} from "./model-sequelize";
import {CreateModelError} from "./errors/create-model.error";

export class CreateModels {
    private static listModel: ModelTable[] = [];

    addModel(modelName: string, attributes: ModelAttributes, options?: ModelOptions) {
        CreateModels.listModel.push(new ModelSequelize(modelName, attributes, options));
    }

    static async createTables() {
        try {
            await Promise.all(CreateModels.listModel.map(value => value.createTableModel().catch()));
        } catch (err) {
            throw new CreateModelError(err);
        }
    }
}

/*const queryInterface = connectionDataBase.connection().getQueryInterface();
export interface AlterTable {
    queryInterface: QueryInterface;
    addColumn?(table: TableName,
               key: string,
               attribute: ModelAttributeColumnOptions | DataType,
               options?: QueryInterfaceOptions): void;
}*/

/*
export class AddColumnTables implements AlterTable {
    queryInterface: QueryInterface = connectionDataBase.connection().getQueryInterface();
    addColumn(table: TableName,
              key: string,
              attribute: ModelAttributeColumnOptions | DataType,
              options?: QueryInterfaceOptions) {

        this.queryInterface.addColumn(table, key, attribute, options);
    }
}*/