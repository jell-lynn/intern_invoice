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
            const quatation_info = document.getElementById('Quatation-info');
            const customer_info = data["Quotation"]["customer"];
            for (const info in customer_info) {
                quatation_info.innerHTML += `${customer_info[info]}<br>`;
            }
            
            //ส่วนข้อมูล payment
            document.getElementById('customer-gr').innerHTML = data["Quotation"]["payment"]["Customer_Group"];
            document.getElementById('note').innerHTML = data["Quotation"]["payment"]["Note"];
            document.getElementById('bid-period').innerHTML = data["Quotation"]["payment"]["Bid period"];
            document.getElementById('payment-term').innerHTML = data["Quotation"]["payment"]["PaymentTerm"];
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
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
        });
}

// เรียกใช้ฟังก์ชัน fetchJSONData
fetchJSONData();
