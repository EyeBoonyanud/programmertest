const express = require("express");
const oracledb = require("oracledb");
const { Client } = require("pg");

const app = express();
const port = 3000;
oracledb.initOracleClient({
  tnsAdmin: "D:\\app\\Administrator\\product\\11.2.0\\client_1\\network\\admin",
  
});
const DBfpc_fpc_pctt = {
  user: "fpc",
  password: "fpc",
  connectString: "PCTTLIV",
};



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

// const client = new Client(pgConfig);
// client.connect();

app.get("/checkconnect", async (req, res) => {
  try {
    const oracleConnection = await oracledb.getConnection(DBfpc_fpc_pctt);
    if (oracleConnection) {
      res.send("เชื่อมต่อสำเร็จ Oracle");
    } else {
      res.send("การเชื่อมต่อไม่สำเร็จ");
    }
    await oracleConnection.close();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ:", error);
    res.send("การเชื่อมต่อไม่สำเร็จ");
  }
});
// Login 
app.get("/getLogin", async (req, res) => { 
  try {
    const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
    const strUsername = req.query.value;
    const strPassword = req.query.password; // แก้ตรงนี้ให้ถูกต้อง

    const result = await connection.execute(`
      SELECT * FROM TRAIN_PROGRAMMER_PERSON WHERE F_ID_CODE = '${strUsername}' AND F_NAME = '${strPassword}'`);

    connection.release();

    const rows = result.rows;
    res.json(rows);
  } catch (error) {
    console.error("Error fetching Material_Trace:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// ดึงตารางหน้า programmer 
app.get("/getDataPro", async (req, res) => { 
    try {
      const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
      const strVendorLot = req.query.VendorLot
        ? req.query.VendorLot.trim().toUpperCase()
        : "";
      const result = await connection.execute(`
      SELECT * FROM TRAIN_PROGRAMMER_PERSON `);
  
      connection.release();
  
      const rows = result.rows;
      res.json(rows);
    } catch (error) {
      console.error("Error fetching Material_Trace:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
// ดึงตารางหน้า deptment
  app.get("/getDataDept", async (req, res) => { 
    try {
      const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
      const strVendorLot = req.query.VendorLot
        ? req.query.VendorLot.trim().toUpperCase()
        : "";
      const result = await connection.execute(`
      SELECT * FROM TRAIN_PROGRAMMER_DEPT `);
  
      connection.release();
  
      const rows = result.rows;
      res.json(rows);
    } catch (error) {
      console.error("Error fetching Material_Trace:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
 // หน้า search
 app.get("/getSearch", async (req, res) => { 
  try {
    const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
    const strSearch = req.query.value;
    const strName = req.query.fname;


    const result = await connection.execute(
      `
      SELECT * FROM TRAIN_PROGRAMMER_PERSON
      WHERE (F_ID_CODE = :Search OR :Search IS NULL)
      AND (F_NAME = :Name OR :Name IS NULL)`,
      {
        Search: strSearch,
        Name: strName,
      }
    );
    //console.log(result)
    connection.release();

    const rows = result.rows;
    res.json(rows);
  } catch (error) {
    console.error("Error fetching Material_Trace:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

  // หน้าInsert DataProgreammer
  app.put("/insertData", async (req, res) => {
    try {
      const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
      
      const strID = req.query.id;
      const strName = req.query.fname;
      const strLast = req.query.last;
      const strAge = req.query.age;
      const strBirth = req.query.birth;
      const strDept = req.query.dept;
      const strStatus = req.query.status;
      const strTel = req.query.telephone;



      console.log(strID, " ", strName, " ", strAge, " ", strLast, " ", strDept, " ", strStatus, " ", strTel);
      
      // ทำการสร้างคิวรี่ Insert ที่ใช้เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
      const insertQuery = `
      INSERT INTO TRAIN_PROGRAMMER_PERSON (F_ID_CODE, F_NAME, F_LASTNAME, F_AGE,  F_DEPT,F_BIRTHDAY, F_STATUS, F_TEL)
      VALUES (:ID, :Name, :Last, :Age ,:Dept,TO_DATE(:Birth, 'YYYY-MM-DD'),:Status, :Tel)
      `;
      
      const data = {
        ID: strID,
        Name: strName,
        Last: strLast,
        Age: strAge,
        Birth: strBirth,
        Dept: strDept,
        Status: strStatus,
        Tel: strTel,
      };
      
  const option = {
    autoCommit:true
  }
      // ทำการ Execute คิวรี่ Insert
      const result = await connection.execute(insertQuery, data,option);
    console.log('Data inserted successfully')
     
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
