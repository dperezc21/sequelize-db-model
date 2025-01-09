# sequelize-db-model

### npm package to create models with sequelize mysql  

##### is a package to simplify model creation in Sequelize, an ORM for Node.js.
##### This package automates the Sequelize model creation process, allowing you to
##### easily create and configure models, without the need to manually write all the code.  

```
    const createModel = new CreateModels();
    
    createModel.addModel('User',{
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        });
        
    await CreateModels.createTables();
```