import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { timestampToDateString } from "@/lib/functions";
import { KogaLessReportData } from "@/types/report";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const KogaNullReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { kogaNullReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (
      kogaNullReportData.item &&
      kogaNullReportData.item.length !== 0 &&
      user
    ) {
      const printDiv = document.getElementById("koga_null_report_pdf");

      if (printDiv) {
        const newWindow = window.open("", "", `width=1500`);
        newWindow?.document.write(`
          <html>
            <head>
              <title>Print</title>
              ${pdfStyle}
            </head>
            <body>
              ${printDiv.innerHTML}
            </body>
          </html>
        `);
        newWindow?.document.close();
        newWindow?.focus();
        newWindow?.print();
        newWindow?.close();
      }
    }
  }, [kogaNullReportData, user]);

  return (
    kogaNullReportData.info &&
    kogaNullReportData.item.length != 0 &&
    user && (
      <div id="koga_null_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی کۆگا - تەواوبوو </p>
        <h1>{info?.name}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی دانەی ماوە :
              {formatMoney(
                kogaNullReportData.info.total_item_quantity -
                  kogaNullReportData.info.total_sell_quantity
              )}
            </p>
            <p>
              کۆی نرخی کڕاو :
              {formatMoney(kogaNullReportData.info.total_purchase_price)}
            </p>
            <p>
              کۆی نرخی فرۆشراو :
              {formatMoney(kogaNullReportData.info.total_sell_price)}
            </p>
            <p>کۆی تێچوو :{formatMoney(kogaNullReportData.info.total_cost)}</p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی کاڵا :{" "}
              {formatMoney(kogaNullReportData.info.total_count)}
            </p>
            <p>
              کۆی دانەی کڕاو :
              {formatMoney(kogaNullReportData.info.total_item_quantity)}
            </p>
            <p>
              کۆی دانەی فرۆشراو :
              {formatMoney(kogaNullReportData.info.total_sell_quantity)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>تێچوو</th>
              <th>دانەی ماوە</th>
              <th>دانەی فرۆشراو</th>
              <th>نرخی فرۆشتن</th>
              <th>دانەی کڕاو</th>
              <th>نرخی کڕین</th>
              <th>جۆری کاڵا</th>
              <th>بارکۆد</th>
              <th>ناو</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {kogaNullReportData?.item.map((val: KogaLessReportData) => (
              <tr key={val.id}>
                <td>{formatMoney(val.item_sell_price * val.quantity)}</td>

                <td>{formatMoney(val.quantity - val.item_sell_price)}</td>

                <td>{formatMoney(val.sell_quantity)}</td>

                <td>{formatMoney(val.item_sell_price)}</td>

                <td>{formatMoney(val.quantity)}</td>

                <td>{formatMoney(val.item_purchase_price)}</td>
                <td>{val.type_name}</td>

                <td>{val.barcode}</td>

                <td>{val.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="info_black">
          <div className="infoLeft">
            <p>بەرواری چاپ : {timestampToDateString(Date.now())}</p>
          </div>
          <div className="infoRight">
            <p>{user.username} چاپکراوە لەلایەن :</p>
          </div>
        </div>
      </div>
    )
  );
};

export default KogaNullReportPdf;
