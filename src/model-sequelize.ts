import {Model, ModelAttributes, ModelOptions, ModelStatic, Sequelize} from "sequelize";
import {ModelTable} from "./interfaces/model-table";
import {ConnectionSequelize} from "./connection/connection-sequelize";
import {CreateModelError} from "./errors/create-model.error";

const modelConnection: ConnectionSequelize = new ConnectionSequelize();

export class ModelSequelize implements ModelTable {
    private connection: Sequelize = modelConnection.getSequelize();
    modelName!: string;
    private model!: ModelStatic<Model>;

    constructor(modelName: string, private readonly attributes: ModelAttributes, private readonly options?: ModelOptions) {
        this.modelName = modelName;
        this.attributes = attributes;
        this.options = options;
        this.buildModel();
    }

    buildModel(): void {
        this.model = this.connection.define(this.modelName, this.attributes, this.options);
    }

    getModel(): ModelStatic<Model> {
        return this.model;
    }

    createTableModel(): Promise<string> {
        return new Promise((resolve, reject) => {
            const tableName: string = this.options?.tableName || this.getModel()?.tableName;
            this.getModel().sync().then(value => {
                resolve(`Table ${tableName} created`);
            }).catch(err => reject(new CreateModelError(`Unable to create ${tableName} table` + err)))
        })
    }
}