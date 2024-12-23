import {ModelTable} from "./interfaces/model-table";
import {ModelAttributes, ModelOptions} from "sequelize";
import {ModelSequelize} from "./model-sequelize";

export class CreateModels {
    private static listModel: ModelTable[] = [];

    addModel(modelName: string, attributes: ModelAttributes, options?: ModelOptions) {
        CreateModels.listModel.push(new ModelSequelize(modelName, attributes, options));
    }

    async createTables() {
        try {
            await Promise.all(CreateModels.listModel.map(value => value.createTableModel()));
        } catch (err) {
            throw new Error(err);
        }
    }

    getListModels(): ModelTable[] {
        return CreateModels.listModel;
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