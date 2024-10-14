



const generateProductDataHTML = (image, productName, quantity, price) => {
  const prouduct = `
    <tr>
                        <td align="left" class="esdev-adapt-off"
                          style="Margin:0;padding-right:20px;padding-left:20px;padding-top:10px;padding-bottom:10px">
                          <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                           <!-- product details individual -->
                            <tr> 
                              <!-- Image -->
                              <td valign="top" class="esdev-mso-td" style="padding:0;Margin:0">
                                <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                  <tr>
                                    <td align="center" class="es-m-p0r" style="padding:0;Margin:0;width:70px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0px"><img
                                              src="${image}"
                                              alt="" width="70" class="adapt-img"
                                              style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <!-- Name -->
                              <td valign="top" class="esdev-mso-td" style="padding:0;Margin:0">
                                <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                  <tr>
                                    <td align="center" style="padding:0;Margin:0;width:265px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px !important;letter-spacing:0;color:#333333;font-size:14px">
                                              <strong>${productName}</strong></p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <!-- Quantity -->
                              <td valign="top" class="esdev-mso-td" style="padding:0;Margin:0">
                                <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:80px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                ${quantity}
                                              </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <!-- Price -->
                              <td valign="top" class="esdev-mso-td" style="padding:0;Margin:0">
                                <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:85px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                          <td align="right" style="padding:0;Margin:0">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                              ₹ ${price}
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
    `
  return prouduct
}



const generateHtml = (name, email, orderId, message, awb, orderDetails, paymentMethod, courierCompanyName, image, shippingAddress, shippingCharge, sub_total, totalAmount) => {

  console.log(
    "Email Data" + name, email, orderId, message, awb, orderDetails, paymentMethod, courierCompanyName, image, shippingAddress, shippingCharge, sub_total, totalAmount
  )

  const orderDetailsHtml = orderDetails.map((item, index) => {
    return generateProductDataHTML(image, item.name, item.quantity, item.price)
  })

  const trackingLink = `https://shiprocket.co/tracking/${awb}`


  const mailHTML = `
        <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Message</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
  <style type="text/css">
    .rollover:hover .rollover-first {
      max-height: 0px !important;
      display: none !important;
    }

    .rollover:hover .rollover-second {
      max-height: none !important;
      display: block !important;
    }

    .rollover span {
      font-size: 0px;
    }

    u+.body img~div div {
      display: none;
    }

    #outlook a {
      padding: 0;
    }

    span.MsoHyperlink,
    span.MsoHyperlinkFollowed {
      color: inherit;
      mso-style-priority: 99;
    }

    a.es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors],
    #MessageViewBody a {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    @media only screen and (max-width:600px) {
      .es-m-p0r {
        padding-right: 0px !important
      }

      .es-m-p20b {
        padding-bottom: 20px !important
      }

      .es-p-default {}

      *[class="gmail-fix"] {
        display: none !important
      }

      p,
      a {
        line-height: 150% !important
      }

      h1,
      h1 a {
        line-height: 120% !important
      }

      h2,
      h2 a {
        line-height: 120% !important
      }

      h3,
      h3 a {
        line-height: 120% !important
      }

      h4,
      h4 a {
        line-height: 120% !important
      }

      h5,
      h5 a {
        line-height: 120% !important
      }

      h6,
      h6 a {
        line-height: 120% !important
      }

      .es-header-body p {}

      .es-content-body p {}

      .es-footer-body p {}

      .es-infoblock p {}

      h1 {
        font-size: 36px !important;
        text-align: left
      }

      h2 {
        font-size: 26px !important;
        text-align: left
      }

      h3 {
        font-size: 20px !important;
        text-align: left
      }

      h4 {
        font-size: 24px !important;
        text-align: left
      }

      h5 {
        font-size: 20px !important;
        text-align: left
      }

      h6 {
        font-size: 16px !important;
        text-align: left
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 36px !important
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 26px !important
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 20px !important
      }

      .es-header-body h4 a,
      .es-content-body h4 a,
      .es-footer-body h4 a {
        font-size: 24px !important
      }

      .es-header-body h5 a,
      .es-content-body h5 a,
      .es-footer-body h5 a {
        font-size: 20px !important
      }

      .es-header-body h6 a,
      .es-content-body h6 a,
      .es-footer-body h6 a {
        font-size: 16px !important
      }

      .es-menu td a {
        font-size: 12px !important
      }

      .es-header-body p,
      .es-header-body a {
        font-size: 14px !important
      }

      .es-content-body p,
      .es-content-body a {
        font-size: 14px !important
      }

      .es-footer-body p,
      .es-footer-body a {
        font-size: 14px !important
      }

      .es-infoblock p,
      .es-infoblock a {
        font-size: 12px !important
      }

      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3,
      .es-m-txt-c h4,
      .es-m-txt-c h5,
      .es-m-txt-c h6 {
        text-align: center !important
      }

      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3,
      .es-m-txt-r h4,
      .es-m-txt-r h5,
      .es-m-txt-r h6 {
        text-align: right !important
      }

      .es-m-txt-j,
      .es-m-txt-j h1,
      .es-m-txt-j h2,
      .es-m-txt-j h3,
      .es-m-txt-j h4,
      .es-m-txt-j h5,
      .es-m-txt-j h6 {
        text-align: justify !important
      }

      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3,
      .es-m-txt-l h4,
      .es-m-txt-l h5,
      .es-m-txt-l h6 {
        text-align: left !important
      }

      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img {
        display: inline !important
      }

      .es-m-txt-r .rollover:hover .rollover-second,
      .es-m-txt-c .rollover:hover .rollover-second,
      .es-m-txt-l .rollover:hover .rollover-second {
        display: inline !important
      }

      .es-m-txt-r .rollover span,
      .es-m-txt-c .rollover span,
      .es-m-txt-l .rollover span {
        line-height: 0 !important;
        font-size: 0 !important;
        display: block
      }

      .es-spacer {
        display: inline-table
      }

      a.es-button,
      button.es-button {
        font-size: 20px !important;
        padding: 10px 20px 10px 20px !important;
        line-height: 120% !important
      }

      a.es-button,
      button.es-button,
      .es-button-border {
        display: inline-block !important
      }

      .es-m-fw,
      .es-m-fw.es-fw,
      .es-m-fw .es-button {
        display: block !important
      }

      .es-m-il,
      .es-m-il .es-button,
      .es-social,
      .es-social td,
      .es-menu {
        display: inline-block !important
      }

      .es-adaptive table,
      .es-left,
      .es-right {
        width: 100% !important
      }

      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
        width: 100% !important;
        max-width: 600px !important
      }

      .adapt-img {
        width: 100% !important;
        height: auto !important
      }

      .es-mobile-hidden,
      .es-hidden {
        display: none !important
      }

      .es-desk-hidden {
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important
      }

      tr.es-desk-hidden {
        display: table-row !important
      }

      table.es-desk-hidden {
        display: table !important
      }

      td.es-desk-menu-hidden {
        display: table-cell !important
      }

      .es-menu td {
        width: 1% !important
      }

      table.es-table-not-adapt,
      .esd-block-html table {
        width: auto !important
      }

      .h-auto {
        height: auto !important
      }

      .es-text-4403 .es-text-mobile-size-14,
      .es-text-4403 .es-text-mobile-size-14 * {
        font-size: 14px !important;
        line-height: 150% !important
      }
    }

    @media screen and (max-width:384px) {
      .mail-message-content {
        width: 414px !important
      }
    }
  </style>
</head>

<body class="body" style="width:100%;height:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
    <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
      <tr>
        <td valign="top" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body"
                  role="none"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-right:20px;padding-left:20px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center"
                                  style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><a
                                    target="_blank" href="https://www.kindrice.co"
                                    style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img
                                      src="https://epiedns.stripocdn.email/content/guids/CABINET_e86fbf4f801ed0ab4d3667822cfa7ae61a5c1bc8c51ed4c92406f837ec7275f6/images/faviconlogo.jpg"
                                      alt="Kindrice " width="165" title="Kindrice " class="adapt-img"
                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" class="es-text-4403" style="padding:0;Margin:0;padding-bottom:10px">
                                  <h1 class="es-m-txt-c es-text-mobile-size-14"
                                    style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:bold;line-height:14px;color:#333333;margin-left:120px">
                                    <br>
                                  </h1>
                                  <h1 class="es-m-txt-c es-text-mobile-size-14"
                                    style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:bold;line-height:14px;color:#333333;text-align:left;margin-left:40px">
                                    <br>
                                  </h1>
                                  <!-- customer name -->
                                  <h1 class="es-m-txt-c es-text-mobile-size-14"
                                    style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:bold;line-height:14px;color:#333333;text-align:left;margin-left:40px">
                                    Dear ${name},</h1>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    <br>
                                  </p>
                                  <h1 class="es-m-txt-c es-text-mobile-size-14"
                                    style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:bold;line-height:14px;color:#333333;text-align:left;margin-left:40px">
                                    ${message}  
                                  <h1>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    <br>
                                  </p>
                                  <h1 class="es-m-txt-c"
                                    style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:46px;color:#333333;text-align:center">
                                    <strong>Track your order</strong>
                                  </h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr class="es-visible-simple-html-only">
              <td align="center" class="es-stripe-html" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body"
                  role="none"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                    <td align="left" style="padding:20px;Margin:0">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center" style="padding:0;Margin:0">
                                  <!-- orderId -->
                                  <h2 class="es-m-txt-c"
                                    style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:26px;font-style:normal;font-weight:bold;line-height:31.2px;color:#333333">
                                    Order&nbsp;<a target="_blank" href=""
                                      style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:26px">
                                      <!-- order id -->
                                      #${orderId}
                                    </a>&nbsp;has
                                    been shipped!&nbsp;</h2>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-bottom:15px"><span
                                    class="es-button-border"
                                    style="border-style:solid;border-color:#5c68e2;background:#16a34a;border-width:2px;display:inline-block;border-radius:6px;width:auto">                                    
                                    <a href=${trackingLink} style="outline:none;border:none" target="_blank" class="es-button"
                                      style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#16a34a;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #16a34a;border-left-width:30px;border-right-width:30px">
                                      <!-- awb track link -->
                                      TRACK YOUR ORDER
                                    </a></span></td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:0;Margin:0;padding-bottom:20px">
                                  <!-- Delivery Date -->
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Expected delivery Under 10 Days</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- loop this tr -->
                  <!-- Object.(image,name,quantity,price) -->
                  ${orderDetailsHtml}
                  <!-- Order Summary -->
                    <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:10px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" class="es-m-p0r" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-width:2px 0;border-style:solid solid;border-color:#efefef #00000000"
                              role="presentation">
                              <tr>
                                <td align="right" style="padding:0;Margin:0;padding-top:10px;padding-bottom:20px">
                                  <p class="es-m-txt-r"
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Subtotal:&nbsp; <strong>₹${sub_total}</strong>(All tax incl.)<br>
                                    Shipping:&nbsp;<strong>₹${shippingCharge}</strong><br>
                                    Total:<strong>₹${totalAmount}</strong>&nbsp;
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Order Address Details -->
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:10px;padding-top:20px">
                      <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr>
                          <td align="center" class="es-m-p0r es-m-p20b" style="padding:0;Margin:0;width:280px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Customer: <strong>${email}</strong></p>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Order number:&nbsp;<strong>#${orderId}</strong>
                                  </p>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">                                  
                                    Payment method: <strong>${paymentMethod}</strong>
                                  </p>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Currency: <strong>INR</strong>
                                    </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                        <tr>
                          <td align="center" class="es-m-p0r" style="padding:0;Margin:0;width:280px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p class="es-m-txt-l"
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Shippinp Company Name: <strong>${courierCompanyName}</strong></p>
                                  <p class="es-m-txt-l"
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Shipping address:</p>
                                  <p class="es-m-txt-l"
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    <strong>${shippingAddress.name || name}<br>${shippingAddress.addressLine1}<br>${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pincode}</strong>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table><!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                  <!-- Phone Section -->
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-top:15px;padding-right:20px;padding-left:20px;padding-bottom:10px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                    Got a question?&nbsp;Email us at <a target="_blank" href=""
                                      style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px">hello@kindrice.co</a>&nbsp;or
                                    give us a call at&nbsp;
                                    <a target="_blank" href=""
                                      style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px">
                                       +91 99401 78297
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" align="center" class="es-footer" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table align="center" cellpadding="0" cellspacing="0" class="es-footer-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"
                  role="none">
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:20px;padding-top:20px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:600px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center"
                                  style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                                  <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>                                    
                                    <td align="center" class="social-links" valign="top" style="padding:0;Margin:0;padding-right:40px">
  <a href="https://www.facebook.com/share/Zxd1qe9YRgzQqA7e/?mibextid=LQQJ4d" target="_blank" style="display:block">
    <img 
      title="Facebook" 
      src="https://epiedns.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" 
      alt="Facebook" width="32" 
      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
  </a>
</td>
<td align="center" class="social-links" valign="top" style="padding:0;Margin:0;padding-right:40px">
  <a href="https://x.com/RiceKind83063" target="_blank" style="display:block">
    <img 
      title="X" 
      src="https://epiedns.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" 
      alt="X" width="32" 
      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
  </a>
</td>
<td align="center" class="social-links" valign="top" style="padding:0;Margin:0;padding-right:40px">
  <a href="https://www.instagram.com/kindrice.co?igsh=MXExa3JseWxvMDliaw%3D%3D&utm_source=qr" target="_blank" style="display:block">
    <img 
      title="Instagram" 
      src="https://epiedns.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" 
      alt="Instagram" width="32" 
      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
  </a>
</td>
<td align="center" class="social-links" valign="top" style="padding:0;Margin:0;padding-right:40px">
  <a href="https://www.linkedin.com/company/kind-rice/" target="_blank" style="display:block">
    <img 
      title="LinkedIn" 
      src="https://epiedns.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" 
      alt="LinkedIn" width="32" 
      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
  </a>
</td>
<td align="center" class="social-links" valign="top" style="padding:0;Margin:0">
  <a href="https://www.youtube.com/@kindrice" target="_blank" style="display:block">
    <img 
      title="YouTube" 
      src="https://epiedns.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" 
      alt="YouTube" width="32" 
      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
  </a>
</td>

                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:0;Margin:0;padding-bottom:35px">
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">
                                    © 2024 R.K. Brothers Agro Foods Pvt. Ltd All rights reserved.</p>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">
                                    66/2, New Ramnad Rd, Madurai, Meenakshi Nagar, Tamil Nadu, India-625001.</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:0;Margin:0">
                                  <table cellpadding="0" cellspacing="0" width="100%" class="es-menu"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr class="links">
                                      <td align="center" valign="top" width="33.33%"
                                        style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:5px">
                                        <a target="_blank" href="https://www.kindrice.co/"
                                          style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#999999;font-size:12px">Visit
                                          Us </a>
                                      </td>
                                      <td align="center" valign="top" width="33.33%"
                                        style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:5px;border-left:1px solid #cccccc">
                                        <a target="_blank" href="https://www.kindrice.co/privacy_policy.html"
                                          style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#999999;font-size:12px">Privacy
                                          Policy</a>
                                      </td>
                                      <td align="center" valign="top" width="33.33%"
                                        style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:5px;border-left:1px solid #cccccc">
                                        <a target="_blank" href="https://www.kindrice.co/terms-and-conditions"
                                          style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#999999;font-size:12px">Terms
                                          of Use</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>
    `

  return mailHTML;
}


export default generateHtml;



