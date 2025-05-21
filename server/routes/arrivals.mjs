import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

/**
 * GET station by Name
 * @param {*} request
 * @param {*} response
 * @param {Object}
 */
router.post("/", async( req, res) => {
    try {
        const { stopIds } = req.body;
        console.log(`Arrivals `, Date.now());

        if (!stopIds) {
          return res.status(400).json({ error: "Invalid stop IDs" });
        }

        if (!Array.isArray(stopIds)) {
            stopIds = [stopIds];
        }
    
        const arrivalPromises = stopIds.map(async (stopId) => {
            const url = `${process.env.TRAIN_ARRIVALS}?key=${process.env.CTA_TRAIN_API_KEY}&mapid=${stopId}&outputType=json`;
            const response = await fetch(url);
            return response.json();
        });

        const arrivalsData = await Promise.all(arrivalPromises);

        const allArrivals = arrivalsData.flatMap((data) => data.ctatt?.eta || []);
        res.status(200).json({ arrivals: allArrivals });
    } catch (error) {
        console.error("Error fetching CTA arrivals: ", error);
        res.status(500).json({ error: "Internal Server Error "});
    }
});

router.post("/:_id", async(req, res) => {
    try {

        console.log(req.body)
        const { stopId } = req.body;
        // if (!stopId) {
        //     return res.status(400).json({ error: "Invalid stop IDs" });
        // }

        console.log('Arrivals by Id', Date.now());
        const url = `${process.env.TRAIN_ARRIVALS}?key=${process.env.CTA_TRAIN_API_KEY}&mapid=${stopId}&outputType=json`;
        
        const response = await fetch(url)
        .then(res => res.json())
        .catch((error) => console.error(error));
 
        const allArrivals = response.ctatt?.eta || [];

        res.status(200).json({ arrivals: allArrivals });
    } catch (e) {
        console.error("Error fetching CTA arrival: ", e);
        res.status(500).json({ error: "Internal Server Error "});
    }
});

export default router;