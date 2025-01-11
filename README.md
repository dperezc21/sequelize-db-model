# **sequelize-db-model**

### npm package to create models with sequelize mysql

Is a package to simplify model creation in Sequelize, an ORM for Node.js.  
This package automates the Sequelize model creation process, allowing you to  easily create models.  

**before:**

```
// define model(s)
const UserModel = connectionDataBase.connection().define('User',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// execute sync method to create model in database
UserModel.sync()
          .then(value => resolve('user table created successfully!'))
           .catch(reason => reject('Unable to create user table'));
```


**after:**

```
const createModel = new CreateModels();

/**
 * use addModel method to add all models that need create
 */

// add user model
createModel.addModel('User',{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    
// add product
createModel.addModel('Product',{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }
    }); 
   
// do call createTables and create all models that defined previous
await CreateModels.createTables();

export const userModel = CreateModels.getModel('User'); 
export const userModel = CreateModels.getModel('Product');
```

##### **Contributions are welcome**. If you find a bug or have an improvement to suggest, open an issue or pull request.