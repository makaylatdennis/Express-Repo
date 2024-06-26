
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

const mockData = [
    { id: 1, name: 'mockData1' },
    { id: 2, name: 'mockData2' },
    { id: 3, name: 'mockData3' },
    { id: 4, name: 'mockData4' },
    { id: 5, name: 'mockData5' },
    { id: 6, name: 'mockData6' }
];


app.get('/', async (req, res) => {
    
    console.log('before');
    await delay(5000);
    

    console.log('Hey');
    res.send(mockData);
});

// delay function that returns a promise resolving after a specified number of milliseconds
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));




app.post('/mockData', (req, res) => {
    const { id, name } = req.body;
    
    if (!id ||!name) {
        return res.status(400).send('Must provide id and name');
    }
    

    console.log('post');
    const newMock = { id, name };

    mockData.push(newMock);
    res.status(201).send(newMock);
});


app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));


app.put('/mockData/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    if (!updatedData || !updatedData.name) {
        return res.status(400).send('Must provide valid data to update');
    }

    const itemIndex = mockData.findIndex(item => item.id === id);
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }

    mockData[itemIndex] = { id, ...updatedData };
    res.json(mockData[itemIndex]);
});

app.delete('/mockData/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = mockData.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }

    mockData.splice(itemIndex, 1);
    res.sendStatus(204);
});