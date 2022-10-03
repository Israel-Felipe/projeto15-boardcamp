/* 
app.get("/customers", (req, res) => {
    connection.query("SELECT * FROM customers").then((customers) => {
      res.send(customers.rows);
    });
  });
  
  app.post("/customers", (req, res) => {
    const { name, phone, cpf, birthday } = req.body;
    connection
      .query(
        `INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ('${name}','${phone}',${cpf},${birthday})`
      )
      .then(() => {
        res.sendStatus(201);
      });
  });
  
  app.put("/customers/:id", (req, res) => {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    connection
      .query(
        `UPDATE customers SET name='${name}' and phone='${phone}' and cpf='${cpf}' and birthday='${birthday}' WHERE id='${id}';`
      )
      .then(() => {
        res.sendStatus(200);
      });
  }); */
