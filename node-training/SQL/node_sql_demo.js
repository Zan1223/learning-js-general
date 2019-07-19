const {
    seq,
    Sequalize
} = require('./sequelize_init');

const {
    Op
} = Sequalize;

// define the structure of the table
const PostModel = seq.define('posts_table', {
    title: Sequalize.DataTypes.STRING(64),
    content: Sequalize.DataTypes.TEXT
});
// create the table
PostModel.sync();

// insert values to the table
const insertValue = async () => {

    await PostModel.create({
        title: 'Story',
        content: 'This is a sad story'
    });

}
insertValue().then((res) => {
    process.exit(0);
}).catch((e) => {
    console.log(e);
    process.exit(1);
})

// select the value from the table
const selectValue = async () => {

    const results = await PostModel.findAll({
        attributes: ['title'],
        where: {
            id: {
                [Op.eq]: 2
            }
        }
    });
    console.log(results);
}
selectValue().then((res) => {
    process.exit(0);
}).catch((e) => {
    console.log(e);
    process.exit(1);
})