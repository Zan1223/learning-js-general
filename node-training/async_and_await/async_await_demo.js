async function readFiles(){
        console.log(1)
};

async function processData(){
        console.log(2)
}

async function saveToDB(){
        setTimeout(()=>{
            console.log('3')
        },2000)
}

async function readFileAndProcessData(){
        console.log(5);
        const saveToDB_3 = await saveToDB();
        const processData_2 = await processData();
        const readFiles_1 = await readFiles();
        console.log(4);
};

readFileAndProcessData();
