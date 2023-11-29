const express = require("express");
const oracledb = require("oracledb");
const nodemailer = require(
  'nodemailer'
  );

const app = express();
const fs = require('fs');
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
// check เชื่อมต่อ database
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
    const strUsername = req.query.username;
    const strPassword = req.query.password;

    const result = await connection.execute(
      `SELECT * FROM TRAIN_PROGRAMMER_PERSON WHERE F_ID_CODE = :username AND F_NAME = :password`,
      { username: strUsername, password: strPassword }
    );

    const rows = result.rows;

    // ตรวจสอบว่ามีข้อมูลที่ถูกต้องหรือไม่
    if (rows && rows.length > 0) {
      res.json(rows);
    } else {
      console.error("Login failed");
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error fetching Material_Trace:", error);
    res.status(500).json({ error: "An error occurred" });
  } finally {
    // await connection.close();
  }
});



// หน้า search ทั้งหมด
app.get("/getSearch", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
    const strSearch = req.query.value;
    const strName = req.query.fname;
    const strStatus = req.query.status;
    const secondRoundSearchValue = req.query.searchValue; //ตัวแปร id ครั้งที่ 2 ที่ถูกค้นหา
    const strDept = req.query.dept;
    console.log("-----------")
    console.log(strSearch);
    console.log(strName);
    console.log(strStatus);
    console.log(secondRoundSearchValue);
    console.log(strDept);
    // ตรวจสอบว่าเป็นครั้งแรกหรือไม่
    if (!secondRoundSearchValue) {
      const result = await connection.execute(
        `
        SELECT 
        TP.F_ID_CODE,
        TP.F_NAME,
        TP.F_LASTNAME,
        TP.F_AGE,
        TP.F_BIRTHDAY,
        TP.F_DEPT,
        TP.F_STATUS,
        TP.F_TEL,
        TD.DEPT_NAME
      FROM 
        TRAIN_PROGRAMMER_PERSON TP
      LEFT JOIN 
        TRAIN_PROGRAMMER_DEPT TD ON TP.F_DEPT = TD.DEPT_ID
      WHERE 
        (TP.F_ID_CODE = :Search OR :Search IS NULL)
        AND (TP.F_NAME = :Name OR :Name IS NULL)
        AND (TP.F_STATUS = :Status OR :Status IS NULL)
        AND (TP.F_DEPT = :Dept OR :Dept IS NULL)
      
      `,
        {
          Search: strSearch || null,
          Name: strName || null,
          Status: strStatus || null,
          Dept: strDept || null, 
        }
      );

      connection.release();

      const rows = result.rows;
      res.json(rows);
    } else {
      console.log("nnnnnn")
      // กรณีค้นหาครั้งที่ 2
      if(strName!=""){
        console.log("xxxxxxxxx")
        const result = await connection.execute(
          `
          SELECT 
          TP.F_ID_CODE,
          TP.F_NAME,
          TP.F_LASTNAME,
          TP.F_AGE,
          TP.F_BIRTHDAY,
          TP.F_DEPT,
          TP.F_STATUS,
          TP.F_TEL,
          TD.DEPT_NAME
        FROM 
          TRAIN_PROGRAMMER_PERSON TP
        LEFT JOIN 
          TRAIN_PROGRAMMER_DEPT TD ON TP.F_DEPT = TD.DEPT_ID
          WHERE (F_ID_CODE = :SearchValue )
          AND (TP.F_NAME = :Name )
          `,
          
          {
            SearchValue: secondRoundSearchValue,
             Name: strName ,
           
          }
        );
        
      connection.release();

      const rows = result.rows;
      res.json(rows);
      }
      else if (strStatus!=""){
        console.log("hereee")
        const result = await connection.execute(
          `
          SELECT 
          TP.F_ID_CODE,
          TP.F_NAME,
          TP.F_LASTNAME,
          TP.F_AGE,
          TP.F_BIRTHDAY,
          TP.F_DEPT,
          TP.F_STATUS,
          TP.F_TEL,
          TD.DEPT_NAME
        FROM 
          TRAIN_PROGRAMMER_PERSON TP
        LEFT JOIN 
          TRAIN_PROGRAMMER_DEPT TD ON TP.F_DEPT = TD.DEPT_ID
          WHERE (F_ID_CODE = :SearchValue )
          AND (TP.F_STATUS = :Status )
        `,
          {
            SearchValue: secondRoundSearchValue || null,
         
           Status: strStatus || null,
        
          }
        );
        
      connection.release();

      const rows = result.rows;
      res.json(rows);
      }
       else if (strDept!=""){
        const result = await connection.execute(
          `
          SELECT 
          TP.F_ID_CODE,
          TP.F_NAME,
          TP.F_LASTNAME,
          TP.F_AGE,
          TP.F_BIRTHDAY,
          TP.F_DEPT,
          TP.F_STATUS,
          TP.F_TEL,
          TD.DEPT_NAME
        FROM 
          TRAIN_PROGRAMMER_PERSON TP
        LEFT JOIN 
          TRAIN_PROGRAMMER_DEPT TD ON TP.F_DEPT = TD.DEPT_ID
          WHERE (F_ID_CODE = :SearchValue )
          AND (TP.F_DEPT = :Dept )
        `,
          {
            SearchValue: secondRoundSearchValue ,
         
            Dept: strDept , 
        
          }
        );
        
      connection.release();

      const rows = result.rows;
      res.json(rows);
      }

      
      else{
        const result = await connection.execute(
          `
          SELECT 
          TP.F_ID_CODE,
          TP.F_NAME,
          TP.F_LASTNAME,
          TP.F_AGE,
          TP.F_BIRTHDAY,
          TP.F_DEPT,
          TP.F_STATUS,
          TP.F_TEL,
          TD.DEPT_NAME
        FROM 
          TRAIN_PROGRAMMER_PERSON TP
        LEFT JOIN 
          TRAIN_PROGRAMMER_DEPT TD ON TP.F_DEPT = TD.DEPT_ID
        WHERE 
          (TP.F_ID_CODE = :Search OR :Search IS NULL)
          AND (TP.F_NAME = :Name OR :Name IS NULL)
          AND (TP.F_STATUS = :Status OR :Status IS NULL)
          AND (TP.F_DEPT = :Dept OR :Dept IS NULL)
        
        `,
          {
            Search: secondRoundSearchValue || null,
            Name: strName || null,
            Status: strStatus || null,
            Dept: strDept || null, 
          }
        );
  
        connection.release();
  
        const rows = result.rows;
        res.json(rows);
      }
 
    }
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
      SELECT 
  F_ID_CODE,
  F_NAME,
  F_LASTNAME,
  F_AGE,
  F_BIRTHDAY,
  F_DEPT,
  F_STATUS,
  F_TEL,
  DEPT_NAME
FROM 
  TRAIN_PROGRAMMER_PERSON 
LEFT JOIN 
  TRAIN_PROGRAMMER_DEPT  ON F_DEPT = DEPT_ID
`);
  
      connection.release();
  
      const rows = result.rows;
      res.json(rows);
    } catch (error) {
      console.error("Error fetching Material_Trace:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

// หน้าInsert DataProgreammer
  app.post("/insertData", async (req, res) => {
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
      INSERT INTO TRAIN_PROGRAMMER_PERSON (F_ID_CODE, F_NAME, F_LASTNAME, F_AGE,  F_DEPT,F_BIRTHDAY, F_STATUS,F_CREATE_DATE,F_MODIFY_DATE, F_TEL)
      VALUES (:ID, :Name, :Last, :Age ,:Dept,TO_DATE(:Birth, 'YYYY-MM-DD'),:Status,SYSDATE,SYSDATE ,:Tel)
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
      const response = await connection.execute(insertQuery, data,option);
    
      if (response.rowsAffected === 1) {
        console.log('Data inserted successfully');
        res.status(200).json({ success: true, message: "Data inserted successfully" });
      } else {
        console.log('Data insertion failed');
        res.status(500).json({ success: false, error: "Data insertion failed" });
      }
    console.log('Data inserted successfully')
     
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
 //Delete Programmer
 app.post("/deleteData", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
    const strID = req.query.id; // Get the ID to be deleted

    // Create a delete query
    const deleteQuery = `
      DELETE FROM TRAIN_PROGRAMMER_PERSON
      WHERE F_ID_CODE = :ID
    `;

    const data = { ID: strID };

    const option = {
      autoCommit: true
    };

    // Execute the delete query
    const response = await connection.execute(deleteQuery, data, option);

    if (response.rowsAffected === 1) {
      console.log('Data deleted successfully');
      res.status(200).json({ success: true, message: "Data deleted successfully" });
    } else {
      console.log('Data deletion failed');
      res.status(500).json({ success: false, error: "Data deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// หน้า Update Pro
app.post("/updateData", async (req, res) => {
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
    
    // Create an update query
    const updateQuery = `
      UPDATE TRAIN_PROGRAMMER_PERSON
      SET
        F_NAME = :Name,
        F_LASTNAME = :Last,
        F_AGE = :Age,
        F_DEPT = :Dept,
        F_BIRTHDAY = TO_DATE(:Birth, 'YYYY-MM-DD'),
        F_STATUS = :Status,
        F_TEL = :Tel
      WHERE F_ID_CODE = :ID
    `;

    const data = {
      ID: strID,
      Name: strName,
      Last: strLast ,
      Age: strAge,
      Dept: strDept ,
      Birth: strBirth ,
      Status: strStatus,
      Tel: strTel
    };

    const option = {
      autoCommit: true
    };

    // Execute the update query
    const response = await connection.execute(updateQuery, data, option);

    if (response.rowsAffected === 1) {
      console.log('Data updated successfully');
      res.status(200).json({ success: true, message: "Data updated successfully" });
    } else {
      console.log('Data update failed');
      res.status(500).json({ success: false, error: "Data update failed" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
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
// หน้า insert Dept
  app.post("/insertDataDept", async (req, res) => {
    try {
      const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
      
      const strID = req.query.id;
      const strDept = req.query.dept;
      const strStatus = req.query.status;
    


      console.log(strID, "", strDept, " ", strStatus, " ");
      
      // ทำการสร้างคิวรี่ Insert ที่ใช้เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
      const insertQuery = `
      INSERT INTO TRAIN_PROGRAMMER_DEPT(DEPT_ID, DEPT_NAME, DEPT_STATUS)
      VALUES (:ID,:Dept,:Status)
      `;
      
      const data = {
        ID: strID,
        Dept: strDept,
        Status: strStatus,
      };
      
  const option = {
    autoCommit:true
  }
      // ทำการ Execute คิวรี่ Insert
      const response = await connection.execute(insertQuery, data,option);
      if (response.rowsAffected === 1) {
        console.log('Data inserted successfully');
        res.status(200).json({ success: true, message: "Data inserted successfully" });
      } else {
        console.log('Data insertion failed');
        res.status(500).json({ success: false, error: "Data insertion failed" });
      }
     
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
 // หน้า delete Dept
  app.post("/deleteDataDept", async (req, res) => {
    try {
      const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
      const strID = req.query.id; // Get the ID to be deleted
  
      // Create a delete query
      const deleteQuery = `
        DELETE FROM TRAIN_PROGRAMMER_DEPT
        WHERE DEPT_ID = :ID
      `;
  
      const data = { ID: strID };
  
      const option = {
        autoCommit: true
      };
  
      // Execute the delete query
      const response = await connection.execute(deleteQuery, data, option);
  
      if (response.rowsAffected === 1) {
        console.log('Data deleted successfully');
        res.status(200).json({ success: true, message: "Data deleted successfully" });
      } else {
        console.log('Data deletion failed');
        res.status(500).json({ success: false, error: "Data deletion failed" });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
// หน้า update  Dept
app.post("/updateDataDept", async (req, res) => {
  try {const startTime = Date.now();
    const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
      
    const strID = req.query.id;
    const strDept = req.query.dept;
    const strStatus = req.query.status;

    // สร้างคิวรี่ Update เพื่ออัปเดตข้อมูล
    const updateQuery = `
      UPDATE TRAIN_PROGRAMMER_DEPT
      SET DEPT_NAME = :Dept, DEPT_STATUS = :Status
      WHERE DEPT_ID = :ID
    `;

    const data = {
      ID: strID,
      Dept: strDept,
      Status: strStatus,
    };

    const option = {
      autoCommit: true
    };

    const response = await connection.execute(updateQuery, data, option);
    const endTime = Date.now();
    if (response.rowsAffected === 1) {
      console.log('Data updated successfully');
      res.status(200).json({ success: true, message: "Data updated successfully" });
    } else {
      console.log('Data update failed');
      res.status(500).json({ success: false, error: "Data update failed" });
    }
   
    const elapsedTime = endTime - startTime;
    console.log(`Elapsed time: ${elapsedTime} milliseconds`);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Example endpoint for getting department data
app.get("/getDepartments", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
    const result = await connection.execute(`
      SELECT DEPT_ID, DEPT_NAME FROM TRAIN_PROGRAMMER_DEPT
    `);
    connection.release();

    const rows = result.rows;
    res.json(rows);
  } catch (error) {
    console.error("Error fetching department data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

  
app.use(express.json());
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'paiboon.wongthongdee@gmail.com',
    pass: 'gnrh cfpo xzop dsyg',
  },
});
 
app.post('/sendEmail', async (req, res) => {

 
  try {
    const pdfAttachment = fs.readFileSync('D:/API Outsystem/Test React Native/src/assets/Testpdf.pdf');
    const mailOptions = {
      from: 'paiboon.wongthongdee@gmail.com',
      to: req.body.toEmail,
      subject: req.body.subject,
      text: req.body.emailMessage,
      attachments: [
        {
          filename: 'TestPdf.pdf', 
          content: pdfAttachment,
        },
      ],
    };
 
    console.log("Email Sended")
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending email' });
  }
});
 
app.get("/getSendEmail", async (req, res) => {
  try {
    const strIDMail = req.query.InputEMAIL;
    
    const connection = await oracledb.getConnection(DBfpc_fpc_pctt);
    const result = await connection.execute(
      `
      SELECT  F_EMAIL
      FROM TRAIN_PROGRAMMER_PERSON
      WHERE F_ID_CODE = :id
      `,
      {
        id: strIDMail,
      }
    );
    connection.release();
    const rows = result.rows;
    // console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching Data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
