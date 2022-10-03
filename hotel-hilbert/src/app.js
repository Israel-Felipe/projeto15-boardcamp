import express from "express";

import connection from "./database/database.js";

const app = express();
app.use(express.json());

app.get("/allocations", async (req, res) => {
  try {
    // busque o histórico de hospedagens, junto das informações do cliente e do quarto
    const allocations = await connection.query(`
      SELECT
        guests.*,
        allocations."startDate",
        allocations."endDate",
        rooms.name AS "roomName"
      FROM guests 
	    JOIN allocations 
	      ON guests.id = allocations."guestId"
	    JOIN rooms
	      ON allocations."roomId" = rooms.id;
    `);

    // depois de implementar, remova esta linha
    res.send(allocations.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(4100, () => {
  console.log("Server is listening on port 4100.");
});
