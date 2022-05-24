import Layout from "../components/Layout";
import ReviewCarousel from "../components/ReviewCarousel";

export default function review() {
  return (
    <Layout title="Avis des clients" subtitle="Ce qu'ils disent">
      <ReviewCarousel/>
    </Layout>
  )
}
