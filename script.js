function fetchJSONData() {
    fetch("./data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // ส่วนรายละเอียดลูกค้า
            const quotation_info = document.getElementById('Quotation-info');
            const customer_info = data["Quotation"]["customer"];
            for (const info in customer_info) {
                quotation_info.innerHTML += `${customer_info[info]}<br>`;
            }

            //ส่วนข้อมูลเอกสาร วันที่ขเลขที่
            document.getElementById('doc-date').innerHTML = `<b>วันที่ออกเอกสาร</b> ${data["Quotation"]["Doc_Date"]}`;
            document.getElementById('doc-no').innerHTML = `<b>เลขที่เอกสาร</b> ${data["Quotation"]["Doc_No"]}`;

            //ส่วนข้อมูล payment
            document.getElementById('customer-gr').innerHTML = `<b>Customer Group</b> ${data["Quotation"]["payment"]["Customer_Group"]}`;
            document.getElementById('note').innerHTML = `<b>หมายเหตุ</b> ${data["Quotation"]["payment"]["Note"]}`;
            document.getElementById('bid-period').innerHTML = `<b>ระยะเวลาการเสนอราคา</b> ${data["Quotation"]["payment"]["Bid period"]} วัน นับจากวันที่ออกเอกสาร`;
            document.getElementById('payment-term').innerHTML = `<b>เงื่อนไขการชำระเงิน : </b> ${data["Quotation"]["payment"]["PaymentTerm"]}`;
            // ส่วน check box
            const payment_term = data["Quotation"]["payment"]["Term"];
            const checkboxes = document.querySelectorAll('input[name="payment"]'); // เลือก checkbox ทั้งหมดที่มีชื่อ "payment"

            checkboxes.forEach(checkbox => {
                if (checkbox.value === payment_term) {
                    checkbox.checked = true; // ตรวจสอบ (check) checkbox ที่มีค่าตรงกัน
            }});


            //ส่วนรายการสินค้า
            const order_list = document.getElementById("order-list");
            const orders = data["Orderlist"]["items"];

            let rows = "";
            orders.forEach(item => {
                rows += `<tr>
                        <td>${item.Order_No}</td>
                        <td>${item.Product_ID}</td>
                        <td>${item.Order}</td>
                        <td>${item.Vat_Item}</td>
                        <td>${item.Quantity}</td>
                        <td>${item.Unit}</td>
                        <td>${item.Unit_price}</td>
                        <td>${item.Unit_discount}</td>
                        <td>${item.Price_per_unit_after_disc}</td>
                        <td>${item.Total_price_before_disc}</td>
                        <td>${item.Total_discount}</td>
                        <td>${item.Total_price_after_disc}</td>
                        <td>${item.Vat}</td>
                        </tr>`;
                    });

            // เพิ่มแถวลงใน tbody
            order_list.innerHTML = rows;

            

            //ส่วนราคารวมสินค้า
            Object.entries(data["Total Price"]).forEach(([key, value], index) => {
                let cell = document.getElementById(`value${index+1}`)
                if (cell) {
                    cell.innerHTML = value;
                }
            });
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
        });
}

// เรียกใช้ฟังก์ชัน fetchJSONData
fetchJSONData();
