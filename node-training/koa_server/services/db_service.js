const {
    Sequelize,
    sequelize
} = require('./db_config');

const {
    DataTypes,
    Op
} = Sequelize;
// create the table if not existing yet
const Model = sequelize.define('post', {
    'title': DataTypes.STRING(128),
    'content': DataTypes.TEXT,
});
// function to retrieve the data from the table
const getData = async () => {
   const data = await Model.findAll({
        attributes: ['id', 'title', 'content'],
    });
    return data.map(r=>r.dataValues);
}
// function to get the data to the table by ID
const getDataById = async (id) => {
    const data = await Model.findAll({
         attributes: ['id', 'title', 'content'],
         where: {
            id: {
                [Op.eq]: id
            }
         }
     });
     return data.map(r=>r.dataValues);
 }

// function to post the data to the table
const postData = async (dataInserted) => {
    const data = await Model.create(
        dataInserted
    )
    return data;
 }


Model.sync();

module.exports = {
    Model,
    getData,
    postData,
    getDataById,
};