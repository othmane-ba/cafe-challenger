import Layout from "../components/Layout";
import MyButton from "../components/MyButton";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AboutIconBlock from "../utils/AboutIconBlock";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

export default function about() {
  return (
    <Layout title="A propos de nous" subtitle="Pourquoi nous choisir?">
      <section className="container-wrapper flex items-center md:flex-col h-full py-2">
          <div className="flex-1">
            <img className="" src="./images/about-img.png" alt="about-img" />
          </div>
          <div className="flex-1 space-y-5 text-left md:text-center py-4">
            {/* <h3 className="text-4xl font-semibold">Meilleur restaurant à Fès</h3> */}
            <p className="text-base text-gray-500">C’est en plein cœur de la ville de Fès, où se trouve le restaurant Challenger ; un endroit heureux où l’on peut non seulement déguster une cuisine authentique mais aussi rencontrer nos familles et se réunir pour célébrer nos événements les plus spéciaux …<br/>
              Challenger propose une cuisine gastronomique au plus près des gens : de ceux qui produisent et préparent les produits à ceux qui les dégustent ; tous nos plats sont faits maison, cuisinés sur place à la commande avec des produits frais par notre chef cuisinier…<br/>
              Challenger vous fait la promesse de vivre une nouvelle expérience culinaire originale dans un cadre élégant et conviviale !<br/>
              <b style={{color:'black'}}>En livraison, sur place ou à emporter en fonction de votre humeur et de vos envies …<br/></b>
              A très bientôt !<br/>
              L’équipe du restaurant challenger.</p>
            <div className="flex flex-wrap gap-4">
              <AboutIconBlock Icon={LocalDiningIcon} text="Sur Place"/>
              <AboutIconBlock Icon={DirectionsCarIcon} text="Emporté"/>
              <AboutIconBlock Icon={DeliveryDiningIcon} text="Livraison"/>
            </div>
            {/* <MyButton text="Learn More"/> */}
          </div>
      </section>
    </Layout>
  )
}
