import {Sequelize} from 'sequelize';
import {ConnectionRepository} from "../interfaces/ConnectionRepository";
import {ConnectionSequelize} from "./connection-sequelize";

class ConnectionDataBase extends ConnectionSequelize implements ConnectionRepository {
    private static connection: ConnectionDataBase;
    constructor() {
        super();
        if(!ConnectionDataBase.connection) ConnectionDataBase.connection = this;
        return ConnectionDataBase.connection;
    }

    connect(): void {
        ConnectionDataBase.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connection to the database: ', error);
            this.disconnect();
        });
    }

    connection(): Sequelize {
        return ConnectionDataBase.sequelize;
    }

    disconnect(): void {
        ConnectionDataBase.sequelize.close().then(() => {
            console.log("connections to the data base closed");
        }).catch();
    }
}

export default new ConnectionDataBase();