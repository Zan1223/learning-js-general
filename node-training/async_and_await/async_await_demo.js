async function readFiles(){};

async function processData(){}

async function saveToDB(){}

async function readFileAndProcessData(){
    try {
        const readFiles = await readFiles();
        const processData = await processData();
        const saveToDB = await saveToDB();
    } catch (error) {
        console.log(error);
    }
};

readFileAndProcessData();
