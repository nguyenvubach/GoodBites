import express from 'express';
import SearchHistory from '../models/SearchHistory.js';
import {verifyTokenAndAuthorization} from '../middlewares/verifyToken.js'
import {VertexAI} from '@google-cloud/vertexai'

const router = express.Router();

router.post('/', verifyTokenAndAuthorization, async (req, res) =>{
    const prompt = req.body.prompt;
    const projectId ='goodbites';

    try {
        const vertexAI = new VertexAI({
            project:projectId,
            location:'us-centrali',
        })
        const generativeModel = vertexAI.getGenerativeModel({
            model: 'gemini-2.0-flash-001',
        });
        const resp = await generativeModel.generateContent(prompt);
        const contentRespone = await resp.response
        res.status(200).send(contentRespone)
    } catch (error) {
        console.log(error)
        res.status(200).send(error)
    }
})

//FETCH SEARCH HISTORY

router.get('/:id', verifyTokenAndAuthorization, async(req, res)=> {
try {
    //Get email from the authenticated user
    const fetchedUserSearchHistory = await SearchHistory.findOne({
        email:req.user.email,
    });
    
    if (!fetchedUserSearchHistory) {
        return res.status(404).send('No search history found')
    }
    res.status(200).send(fetchedUserSearchHistory)
} catch (error) {
    console.log(error);
    res.status(500).send('Internal server error')
}
});

//UPDATE SEARCH HisToRY
router.patch('/', verifyTokenAndAuthorization, async(req, res)=> {
    try {
        // Get email from authenticated user
        const userEmail = req.user.email

        const newSearchTerm = req.body.searchHistory;
        if (!newSearchTerm || typeof newSearchTerm !== 'string') {
            return res.status(400).send('Valid searchHistory string is required')
        }

        //Update with upsert option (creates if it doesn't exist)
        const updatedUserSearchHistory = await SearchHistory.findOneAndUpdate(
            {email: userEmail},
            {
                $push :{
                    searchHistory:{
                        query: newSearchTerm,
                        timestamp: new Date(),
                    }
                }
            },
            {
                upsert: true, //creates if the array/document doesn't exist
                new: true, // return the updated document
                setDefaultsOnInsert: true
            }
        )
        res.status(200).send(updatedUserSearchHistory)
    } catch (error) {
        console.log('Error updating search history',error);
        res.status(500).send({error: 'Internal server error'})
    }
})

export default router;