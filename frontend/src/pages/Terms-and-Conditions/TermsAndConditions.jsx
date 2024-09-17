import React from 'react'
import SectionData from "./termsandconditions.json"
import Navbar from '../../Components/Navbar/Navbar'
import Footer2 from '../../Components/Footer2/Footer'

const TermsAndConditions = () => {
    return (
        <>
            <Navbar />
            <section>
                <section className="return-policy-section2">
                    <div className="return-policy-section2-container">
                        <div className="policy-info">
                            <h2 className="policy-title">
                                Terms & Conditions
                            </h2>
                            <p className='text-3xl'>Overview:</p>
                            <div className="policy-description text-left">
                                <p className='mt-2'>This website is operated by R.K. Brothers Agro Foods Private Limited. Throughout the site, the terms “we”, “us” and “our” refer to R.K. Brothers Agro Foods Private Limited. R.K. Brothers Agro Foods Private Limited offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>



                                <p className='mt-2'>By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.</p>



                                <p className='mt-2'>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.</p>



                                <p className='mt-2'>Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>

                            </div>
                        </div>
                        <div className="details t-c">
                            <ol style={{ padding: 0 }}>
                                {SectionData?.map((section, index) => (
                                    <li key={index} className='tit mb-4'>
                                        <h1 className='mb-14'>{section.title}</h1>
                                        <ul className='list-none' style={{ margin: 0 }}>
                                            {section.description.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>
            </section>
            <Footer2 />
        </>
    )
}

export default TermsAndConditions