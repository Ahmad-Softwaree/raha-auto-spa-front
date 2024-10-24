import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { BillProfitReportData } from "@/types/report";
import { formatDateToDDMMYY, timestampToDateString } from "@/lib/functions";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const BillProfitReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { billProfitReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (
      billProfitReportData.sell &&
      billProfitReportData.sell.length !== 0 &&
      user
    ) {
      const printDiv = document.getElementById("bill_profit_report_pdf");

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
  }, [billProfitReportData, user]);

  return (
    billProfitReportData.info &&
    billProfitReportData.sell.length != 0 &&
    user && (
      <div id="bill_profit_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی قازانج - پسوڵە</p>
        <h1>{info?.name}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی داشکاندنی پسوڵەکان‌ :
              {formatMoney(billProfitReportData.info.total_sell_discount)}
            </p>
            <p>
              کۆی دوای داشکاندن :
              {formatMoney(
                billProfitReportData.info.total_sell_price -
                  billProfitReportData.info.total_sell_discount
              )}
            </p>
            <p>
              کۆی قازانج :{formatMoney(billProfitReportData.info.total_profit)}
            </p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی پسوڵە :{" "}
              {formatMoney(billProfitReportData.info.sell_count)}
            </p>
            <p>
              کۆی گشتی نرخی پسوڵەکان :
              {formatMoney(billProfitReportData.info.total_sell_price)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>کۆی قازانجی پسوڵە</th>
              <th>کۆی تێچووی پسوڵە</th>
              <th>نرخ دوای داشکاندن</th>
              <th>داشکاندن</th>
              <th>کۆی گشتی</th>
              <th>بەروار</th>
              <th>ژ.وەصڵ</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {billProfitReportData?.sell.map((val: BillProfitReportData) => (
              <tr key={val.id}>
                <td>
                  {formatMoney(
                    val.total_sell_price -
                      val.discount -
                      val.total_purchase_price
                  )}
                </td>

                <td>{formatMoney(val.total_purchase_price)}</td>
                <td>{formatMoney(val.total_sell_price - val.discount)}</td>
                <td>{formatMoney(val.discount)}</td>
                <td>{formatMoney(val.total_sell_price)}</td>
                {val.created_at && (
                  <td>{formatDateToDDMMYY(val.created_at.toString())}</td>
                )}
                <td>{val.id}</td>
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

export default BillProfitReportPdf;
