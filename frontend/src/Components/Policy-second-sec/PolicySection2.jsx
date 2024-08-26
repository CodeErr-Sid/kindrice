import React from 'react'
import './PolicySection.css'

export default function PolicySection2() {
  return (
    <section className="return-policy-section2">
        <div className="return-policy-section2-container">
            <div className="policy-info">
                <h2 className="policy-title">
                Return and Refund Policy
                </h2>
                <p className="policy-description">
                At Kind Rice, we are committed to ensuring your satisfaction with our products. If you are not entirely satisfied with your purchase, we are here to help. Please read our return and refund policy carefully to understand your rights and options.
                </p>
            </div>
            <div className="details">
                <ol>
                    <li className='tit'>1.Returns</li>
                    <ul>
                    <p>Eligibility:</p>
                    <li>
                    To be eligible for a return, your item must be unused, unopened, and in the same condition that you received it.
                   </li>
                  <li>The item must be in its original packaging.</li>
                    </ul>
                    <ul>
                    <p>Process:</p>
                    <li>
                  To initiate a return, please contact our customer service team at [Insert Contact Information] within 14 days of receiving your order. 
                   </li>
                  <li>Once your return request is approved, we will provide you with a return address and instructions.</li>
                    </ul>
                    <ul>
                    <p>Shipping:</p>
                    <li>
                    You will be responsible for paying for your own shipping costs for returning your item.
                   </li>
                  <li>Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund</li>
                    </ul>

                    <li className='tit'>2. Refund</li>
                    <ul>
                    <p>Inspection:</p>
                    <li>
                    Once we receive your returned item, we will inspect it and notify you of the status of your refund. 
                   </li>
                  <li>If your return is approved, we will initiate a refund to your original method of payment.</li>
                    </ul>
                    <ul>
                    <p>Processing Time: </p>
                    <li>
                    Refunds are typically processed within [Insert Time Frame] days of receiving the returned item. 
                   </li>
                  <li>The time it takes for the refund to appear in your account may vary depending on your card issuer’s policies..</li>
                    </ul>
                    <ul>
                    <p>Non-Refundable Items:</p>
                    <li>
                    Certain items are non-refundable, including perishable goods and any item not in its original condition or damaged for reasons not due to our error.
                   </li>
                    </ul>
               

                    <li className='tit'>3. Exchanges</li>
                    <ul>
                    <p>Eligibility:</p>
                    <li>
                    We only replace items if they are defective or damaged. If you need to exchange an item for the same product, please contact us at [Insert Contact Information]. 
                   </li>
                    </ul>
                    <ul>
                    <p>Process:</p>
                    <li>
                    Follow the return process outlined above to send your defective or damaged item back to us.
                   </li>
                  <li> Once received and inspected, we will send you a replacement item.</li>
                    </ul>
                </ol>
            </div>
        </div>
    </section>
  )
}
