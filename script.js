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
            const invoice_info = document.getElementById('invoice-info');
            const customer_info = data["invoice"]["customer"];
            for (const info in customer_info) {
                invoice_info.innerHTML += `${customer_info[info]}<br>`;
            }

            //ส่วนข้อมูลเอกสาร วันที่-เลขที่
            document.getElementById('doc-date').innerHTML = `<b>วันที่ออกเอกสาร</b> ${data["invoice"]["Doc_Date"]}`;
            document.getElementById('doc-no').innerHTML = `<b>เลขที่เอกสาร</b> ${data["invoice"]["Doc_No"]}`;

            //ส่วนข้อมูล payment
            document.getElementById('customer-gr').innerHTML = `<b>Customer Group</b> ${data["invoice"]["payment"]["Customer_Group"]}`;
            document.getElementById('note').innerHTML = `<b>หมายเหตุ</b> ${data["invoice"]["payment"]["Note"]}`;
            document.getElementById('bid-period').innerHTML = `<b>ระยะเวลาการเสนอราคา</b> ${data["invoice"]["payment"]["Bid period"]} วัน นับจากวันที่ออกเอกสาร`;
            document.getElementById('payment-term').innerHTML = `<b>เงื่อนไขการชำระเงิน : </b> ${data["invoice"]["payment"]["PaymentTerm"]}`;
            // ส่วน check box
            const payment_term = data["invoice"]["payment"]["Term"];
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
                rows += `<tr style="color: blue;">
                        <td class="text-center">${item.Order_No}</td>
                        <td>${item.Product_ID}</td>
                        <td>${item.Order}</td>
                        <td class="text-center" style="width: 6%">${item.Vat_Item}</td>
                        <td class="text-center">${item.Quantity}</td>
                        <td class="text-center">${item.Unit}</td>
                        <td class="text-center">${item.Unit_price}</td>
                        <td class="text-end">${item.Unit_discount}</td>
                        <td class="text-end">${item.Price_per_unit_after_disc}</td>
                        <td class="text-end">${item.Total_price_before_disc}</td>
                        <td class="text-end">${item.Total_discount}</td>
                        <td class="text-end">${item.Total_price_after_disc}</td>
                        <td class="text-end">${item.Vat}</td>
                        </tr>`;
                    });

            // เพิ่มแถวลงใน tbody
            rows += `<td colspan="13" style="text-align: center;"> หมายเหตุ : ราคาต่อหน่วยมีขั้นต่ำต่อสถานที่ส่งตามจำนวนหน่วยที่ระบุ</td>`;
            order_list.innerHTML = rows;

            // ส่วนรวมรายการ
            const total_items = data["Orderlist"]["Total_items"];
            const total_items_row = `
                    <td colspan="2"><b>รวมรายการ</b></td>
                    <td colspan="7"></td>
                    <td class="text-end">${total_items.Total_price_before_disc}</td>
                    <td class="text-end">${total_items.Total_discount}</td>
                    <td class="text-end">${total_items.Total_price_after_disc}</td>
                    <td class="text-end">${total_items.Vat}</td>
            `;
            // เพิ่มแถวลงใน tfoot
            document.getElementById("total-items").innerHTML = total_items_row;

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
