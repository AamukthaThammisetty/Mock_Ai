import { Button } from "../components/ui/button";
import Image from "next/image";
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import FeatureSection from "../components/FeatureSection";

export default function Home() {
  return (
      <Layout>
    <div>
      <Hero/>
      <FeatureSection/>
      <Footer/>
    </div>
      </Layout>
  );
}
