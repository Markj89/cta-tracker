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
        console.log(`Arrivals`, Date.now());

        const { stopIds } = req.body;
    
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

// router.get("/:_id", async (requests, response) => {
//     let options = {
//         method: 'GET',
//         url: , // API Endpoint
//         headers: {
//             'cache-control': 'no-cache',
//             Connection: 'keep-alive',
//             'Accept-Encoding': 'gzip, deflate',
//             Host: 'lapi.transitchicago.com',
//             'Cache-Control': 'no-cache',
//             Accept: '*/*'
//         }
//     };
// });

export default router;