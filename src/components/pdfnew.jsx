import React, { useState } from 'react';

const MyComponent = () => {


  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const rollNoResponse = await axios.get(
          "http://localhost:3000/getDetails"
        );
        const dataRollResponse = rollNoResponse.data;
        setDataRoll(dataRollResponse);
        setData(dataRollResponse);
        console.log("Roll Server list:", dataRollResponse);

      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  // สร้าง state สำหรับข้อมูลในตารางแรก
  const [table1Data, setTable1Data] = useState([/* ข้อมูลในตารางแรก */]);

  // สร้าง state สำหรับข้อมูลในตารางที่สอง
  const [table2Data, setTable2Data] = useState([/* ข้อมูลในตารางที่สอง */]);

  // ฟังก์ชันสำหรับการตัดข้อมูล
  const cutData = () => {
    // ตัดข้อมูลจากตารางแรก
    const slicedData = table1Data.slice(0, 27);

    // นำข้อมูลที่เหลือไปใส่ในตารางที่สอง
    setTable2Data(table1Data.slice(27));

    // ตั้งค่าข้อมูลในตารางแรกให้เป็นข้อมูลที่ถูกตัด
    setTable1Data(slicedData);
  };

  return (
    <div>
      {/* แสดงข้อมูลในตารางแรก */}
      <h2>Table 1</h2>
      <ul>
        {table1Data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* แสดงข้อมูลในตารางที่สอง */}
      <h2>Table 2</h2>
      <ul>
        {table2Data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* ปุ่มสำหรับการตัดข้อมูล */}
      <button onClick={cutData}>Cut Data</button>
    </div>
  );
};

export default MyComponent;
