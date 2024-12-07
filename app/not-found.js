

import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Error404() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Page Not Found">
            <section className="error-section sec-pad-2 centred">
            <div className="auto-container">
                <div className="inner-box">
                    <figure className="error-image"><img src="assets/images/icons/error-1.png" alt="" /></figure>
                    <h2>Oops, page not <br />found!</h2>
                    <Link href="/" className="theme-btn btn-one"><span>Back To Home</span></Link>
                </div>
            </div>
        </section>


            </Layout>
        </>
    )
}
