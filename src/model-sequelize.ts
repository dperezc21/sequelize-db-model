import {Model, ModelAttributes, ModelOptions, ModelStatic, Sequelize} from "sequelize";
import {ModelTable} from "./interfaces/model-table";
import {ConnectionSequelize} from "./connection/connection-sequelize";

export class ModelSequelize extends ConnectionSequelize implements ModelTable {
    private connection: Sequelize = ModelSequelize.sequelize;
    private readonly modelName!: string;
    private model!: ModelStatic<Model>;

    constructor(modelName: string, private readonly attributes: ModelAttributes, private readonly options?: ModelOptions) {
        super();
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
            const tableName: string = this.options.tableName ?? this.getModel()?.tableName
            this.getModel().sync().then(value => {
                resolve(`Table ${tableName} created`);
            }).catch(err => reject(`Unable to create ${tableName} table`))
        })
    }
}