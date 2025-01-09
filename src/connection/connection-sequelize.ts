import {Dialect, Sequelize} from "sequelize";
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER_NAME} from "../config";

export class ConnectionSequelize {
    protected static sequelize: Sequelize;

    constructor() {}

    setSequelize(connection?: Sequelize) {
        ConnectionSequelize.sequelize = connection;
    }

    setConfiguration(dbName?: string,
                     dbUserName?: string,
                     dbPassword?: string,
                     dbHost?: string,
                     dbPort?: number,
                     dialect: Dialect = 'mysql'): void {

        if(!ConnectionSequelize.sequelize) return ;
        ConnectionSequelize.sequelize = new Sequelize(
            dbName || DB_NAME,
            dbUserName || DB_USER_NAME,
            dbPassword || DB_PASSWORD,
            {
                dialect,
                host: dbHost || DB_HOST,
                port: dbPort || DB_PORT
            });
    }

    getSequelize() {
        return ConnectionSequelize.sequelize;
    }
}